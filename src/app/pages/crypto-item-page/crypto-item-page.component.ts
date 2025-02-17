import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HeaderDataService } from "@app/services";
import { TranslateService } from "@app/services/translate.service";
import { ITradingViewWidget } from "angular-tradingview-widget";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { MainApiService } from "../main-page/main-api.service";
import { MARKET_TRAND_CONST } from "./constants";
import { ICoin } from "./interfaces";

@Component({
    selector: "app-crypto-item-page",
    templateUrl: "./crypto-item-page.component.html",
    styleUrls: ["./crypto-item-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoItemPageComponent implements OnDestroy {
    readonly MARKET_TRAND_CONST = MARKET_TRAND_CONST;
    readonly id = this.route.snapshot.paramMap.get("id");

    isGeneratingPriceSubject = new BehaviorSubject(false);
    isGeneratingPrice$ = this.isGeneratingPriceSubject.asObservable();

    item$ = this.mainApiService.getCryproById(this.id).pipe(
        map((res) => res.data.coin),
        tap(({ name, symbol, change, color }) =>
            this.headerDataService.updateData({ name, symbol, change, color })
        )
    );

    constructor(
        private mainApiService: MainApiService,
        private headerDataService: HeaderDataService,
        private translateService: TranslateService,
        private route: ActivatedRoute
    ) {
        this.mainApiService.getCryptoHistory().subscribe();
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
    }

    getWidgetConfig(item: ICoin): ITradingViewWidget {
        // debugger;
        return {
            symbol: `BINANCE:${item.symbol}USD`,
            widgetType: "widget",
            locale: "ru",
            timezone: "UTC-3",
            // autosize: true,
        };
    }

    formatNumber(num: string): string {
        if (+num >= 1e12) {
            return (+num / 1e12).toFixed(2).replace(".", ",") + "трлд";
        }
        if (+num >= 1e9) {
            return (+num / 1e9).toFixed(2).replace(".", ",") + "млрд";
        }
        if (+num >= 1e6) {
            return (+num / 1e6).toFixed(2).replace(".", ",") + "млн";
        }

        return `${num}`;
    }

    roundNumber(num: number): string {
        return num.toFixed(3);
    }

    getDiffCurrPrice(highPrice: string, currPrice: string): string {
        const formula = +currPrice / (+highPrice / 100);
        return `(${-Math.round(100 - formula)}%)`;
    }

    getMarketTrand(lines: (string | null)[], window = 6) {
        const prices = lines.filter(Boolean).map(Number);

        if (prices.length < window) {
            return MARKET_TRAND_CONST.UNKNOWN;
        }

        const sma = [];
        for (let i = window - 1; i < prices.length; i++) {
            const sum = prices
                .slice(i - window + 1, i + 1)
                .reduce((a, b) => a + b, 0);
            sma.push(sum / window);
        }

        const lastSma = sma[sma.length - 1];
        const prevSma = sma[sma.length - 2];

        if (lastSma > prevSma) {
            return MARKET_TRAND_CONST.UP;
        } else if (lastSma < prevSma) {
            return MARKET_TRAND_CONST.DOWN;
        } else {
            return MARKET_TRAND_CONST.SIDEWAYS;
        }
    }

    generatePrice(name: string) {
        this.isGeneratingPriceSubject.next(true);
        setTimeout(() => this.isGeneratingPriceSubject.next(false), 3000);
    }

    // translate(text: string): Observable<string> {
    //     if (!text) return;

    //     return this.translateService.translate(text);
    // }
}
