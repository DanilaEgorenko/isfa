import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
    CryptoApiService,
    DestroyService,
    FavoriteService,
    HeaderDataService,
} from "@app/services";
import { TranslateService } from "@app/services/translate.service";
import { BehaviorSubject } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";
import { MARKET_TRAND_CONST } from "./constants";

@Component({
    selector: "app-crypto-item-page",
    templateUrl: "./crypto-item-page.component.html",
    styleUrls: ["./crypto-item-page.component.scss"],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoItemPageComponent implements OnDestroy {
    readonly MARKET_TRAND_CONST = MARKET_TRAND_CONST;
    readonly id = this.route.snapshot.paramMap.get("id");

    isFavoriteSubject = new BehaviorSubject(false);
    isFavorite$ = this.isFavoriteSubject.asObservable();

    isGeneratingPriceSubject = new BehaviorSubject(false);
    isGeneratingPrice$ = this.isGeneratingPriceSubject.asObservable();
    generatedPriceSubject = new BehaviorSubject(null);
    generatedPrice$ = this.generatedPriceSubject.asObservable();

    item$ = this.cryptoApiService.getCryproById(this.id).pipe(
        map((res) => res.data),
        tap(({ coin, favourite }) => {
            this.headerDataService.updateData({
                name: coin.name,
                symbol: coin.symbol,
                change: coin.change,
                color: coin.color,
            });
            this.isFavoriteSubject.next(favourite);
        })
    );

    constructor(
        private cryptoApiService: CryptoApiService,
        private favoriteService: FavoriteService,
        private headerDataService: HeaderDataService,
        private translateService: TranslateService,
        private route: ActivatedRoute,
        private destroy$: DestroyService
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

    generatePrice(highPrice: string, price: string) {
        this.isGeneratingPriceSubject.next(true);
        setTimeout(() => {
            this.isGeneratingPriceSubject.next(false);
            this.generatedPriceSubject.next(
                this.roundNumber(Math.random() * (+highPrice - +price) + +price)
            );
        }, 5000);
    }

    toggleFavorite(id: string): void {
        this.favoriteService
            .toggleFavorite(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(({ is_favorite }: { is_favorite: boolean }) =>
                this.isFavoriteSubject.next(is_favorite)
            );
    }

    // translate(text: string): Observable<string> {
    //     if (!text) return;

    //     return this.translateService.translate(text);
    // }
}
