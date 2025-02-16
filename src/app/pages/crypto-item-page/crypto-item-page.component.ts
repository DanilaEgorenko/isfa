import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    AfterViewChecked,
    ChangeDetectorRef,
    AfterViewInit,
    AfterContentInit,
} from "@angular/core";
import { MainApiService } from "../main-page/main-api.service";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { ITradingViewWidget } from "angular-tradingview-widget";
import { Observable, of } from "rxjs";
import { ICoin } from "./interfaces";

@Component({
    selector: "app-crypto-item-page",
    templateUrl: "./crypto-item-page.component.html",
    styleUrls: ["./crypto-item-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoItemPageComponent {
    readonly id = this.route.snapshot.paramMap.get("id");

    item$ = this.mainApiService
        .getCryproById(this.id)
        .pipe(map((res) => res.data.coin));

    constructor(
        private mainApiService: MainApiService,
        private route: ActivatedRoute
    ) {}

    getWidgetConfig(item: ICoin): ITradingViewWidget {
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
        return num.toFixed(2);
    }

    getDiffCurrPrice(highPrice: string, currPrice: string): string {
        const formula = +currPrice / (+highPrice / 100);
        return `(${-Math.round(100 - formula)}%)`;
    }
}
