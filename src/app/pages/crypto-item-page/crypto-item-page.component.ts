import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
    CryptoApiService,
    DestroyService,
    FavoriteService,
    HeaderDataService,
    VirtualStockService,
} from "@app/services";
import { TranslateService } from "@app/services/translate.service";
import { BehaviorSubject } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";
import { MARKET_TRAND_CONST } from "./constants";
import {
    formatNumber,
    getDiffCurrPrice,
    getVirtualPrice,
    roundNumber,
} from "@app/utils";

@Component({
    selector: "app-crypto-item-page",
    templateUrl: "./crypto-item-page.component.html",
    styleUrls: ["./crypto-item-page.component.scss"],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoItemPageComponent implements OnDestroy {
    readonly formatNumber = formatNumber;
    readonly roundNumber = roundNumber;
    readonly getDiffCurrPrice = getDiffCurrPrice;
    readonly getVirtualPrice = getVirtualPrice;
    readonly MARKET_TRAND_CONST = MARKET_TRAND_CONST;
    readonly id = this.route.snapshot.paramMap.get("id");

    isLoading$ = this.cryptoApiService.isLoading$;
    isError$ = this.cryptoApiService.isError$;

    isFavoriteSubject = new BehaviorSubject(false);
    isFavorite$ = this.isFavoriteSubject.asObservable();

    virtualStockSubject = new BehaviorSubject(null);
    virtualStock$ = this.virtualStockSubject.asObservable();

    isGeneratingPriceSubject = new BehaviorSubject(false);
    isGeneratingPrice$ = this.isGeneratingPriceSubject.asObservable();
    generatedPriceSubject = new BehaviorSubject(null);
    generatedPrice$ = this.generatedPriceSubject.asObservable();

    item$ = this.cryptoApiService.getById(this.id).pipe(
        tap(({ coin, favourite, virtual_stock }) => {
            this.headerDataService.updateData({
                name: coin.name,
                symbol: coin.symbol,
                change: coin.change,
                color: coin.color,
            });
            this.isFavoriteSubject.next(favourite);
            if (virtual_stock) {
                this.virtualStockSubject.next({
                    count: virtual_stock?.count || 0,
                    value: virtual_stock?.value || 0,
                });
            }
        })
    );

    constructor(
        private cryptoApiService: CryptoApiService,
        private favoriteService: FavoriteService,
        private headerDataService: HeaderDataService,
        private virtualStockService: VirtualStockService,
        private translateService: TranslateService,
        private route: ActivatedRoute,
        private destroy$: DestroyService
    ) {
        this.cryptoApiService.getCryptoHistory().subscribe();
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
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

    manageVirtualStock(
        id: string,
        quantity: number,
        type: "add" | "remove",
        price_per_unit?: number
    ): void {
        this.virtualStockService
            .manageVirtualStock(id, quantity, type, price_per_unit)
            .pipe(takeUntil(this.destroy$))
            .subscribe((virtual_stock: any) => {
                this.virtualStockSubject.next({
                    count: virtual_stock?.count,
                    value: virtual_stock?.value,
                });
            });
    }

    // translate(text: string): Observable<string> {
    //     if (!text) return;

    //     return this.translateService.translate(text);
    // }
}
