import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CryptoApiService, HeaderDataService } from "@app/services";
import { TranslateService } from "@app/services/translate.service";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { MARKET_TRAND_CONST } from "./constants";

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

    item$ = this.cryptoApiService.getCryproById(this.id).pipe(
        map((res) => res.data),
        tap(({ coin }) =>
            this.headerDataService.updateData({
                name: coin.name,
                symbol: coin.symbol,
                change: coin.change,
                color: coin.color,
            })
        )
    );

    constructor(
        private cryptoApiService: CryptoApiService,
        private headerDataService: HeaderDataService,
        private translateService: TranslateService,
        private route: ActivatedRoute
    ) {
        this.cryptoApiService.getCryptoHistory().subscribe();
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
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

    generatePrice(name: string) {
        this.isGeneratingPriceSubject.next(true);
        setTimeout(() => this.isGeneratingPriceSubject.next(false), 3000);
    }

    // translate(text: string): Observable<string> {
    //     if (!text) return;

    //     return this.translateService.translate(text);
    // }
}
