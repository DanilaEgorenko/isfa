import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
    AuthService,
    DestroyService,
    FavoriteService,
    HeaderDataService,
    ItemsApiService,
    VirtualStockService,
} from "@app/services";
import { BehaviorSubject } from "rxjs";
import { map, shareReplay, takeUntil, tap } from "rxjs/operators";
import { MARKET_TRAND_CONST } from "./constants";
import {
    formatNumber,
    getDiffCurrPrice,
    getVirtualPrice,
    roundNumber,
} from "@app/utils";

@Component({
    selector: "app-item-page",
    templateUrl: "./item-page.component.html",
    styleUrls: ["./item-page.component.scss"],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemPageComponent implements OnDestroy {
    readonly formatNumber = formatNumber;
    readonly roundNumber = roundNumber;
    readonly getDiffCurrPrice = getDiffCurrPrice;
    readonly getVirtualPrice = getVirtualPrice;
    readonly MARKET_TRAND_CONST = MARKET_TRAND_CONST;
    readonly id = this.route.snapshot.paramMap.get("id");

    isLoading$ = this.itemsApiService.isLoading$;
    isError$ = this.itemsApiService.isError$;

    private isFavoriteSubject = new BehaviorSubject(false);
    isFavorite$ = this.isFavoriteSubject.asObservable();

    private virtualStockSubject = new BehaviorSubject(null);
    virtualStock$ = this.virtualStockSubject.asObservable();

    private isGeneratingPriceSubject = new BehaviorSubject(false);
    isGeneratingPrice$ = this.isGeneratingPriceSubject.asObservable();
    private generatedPriceSubject = new BehaviorSubject(null);
    generatedPrice$ = this.generatedPriceSubject.asObservable();

    userData$ = this.authService.userData$;

    item$ = this.itemsApiService.getById(this.id).pipe(
        tap((item) => {
            this.headerDataService.updateData({
                name: item.name,
                symbol: item.ticker,
                change: item?.change && roundNumber(item.change, 1),
                color: item.brand.logoBaseColor,
            });
            this.isFavoriteSubject.next(item.favorite);
            if (item.virtual_stock) {
                this.virtualStockSubject.next({
                    count: item.virtual_stock?.count || 0,
                    value: item.virtual_stock?.value || 0,
                });
            }
        }),
        shareReplay(1)
    );
    chartData$ = this.item$.pipe(
        map((item) =>
            item.candles.map((el) => ({
                x: el.time,
                o: el.open,
                c: el.close,
                h: el.high,
                l: el.low,
                volume: el.volume,
            }))
        )
    );

    constructor(
        private itemsApiService: ItemsApiService,
        private favoriteService: FavoriteService,
        private headerDataService: HeaderDataService,
        private authService: AuthService,
        private virtualStockService: VirtualStockService,
        private route: ActivatedRoute,
        private destroy$: DestroyService
    ) {}

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
}
