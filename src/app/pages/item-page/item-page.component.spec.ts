import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ItemPageComponent } from "./item-page.component";
import { ActivatedRoute } from "@angular/router";
import {
    AuthService,
    DestroyService,
    FavoriteService,
    HeaderDataService,
    ItemsApiService,
    VirtualStockService,
    PredictionService,
} from "@app/services";
import { of, Subject } from "rxjs";
import { ItemPageModule } from "./item-page.module";

describe("ItemPageComponent", () => {
    let component: ItemPageComponent;
    let fixture: ComponentFixture<ItemPageComponent>;

    let mockItem = {
        name: "Test Item",
        ticker: "TST",
        change: 2.34,
        favorite: true,
        brand: {
            logoBaseColor: "#fff",
        },
        virtual_stock: {
            count: 5,
            value: 100,
        },
        candles: [
            { time: 1, open: 10, close: 12, high: 13, low: 9, volume: 1000 },
        ],
    };

    const destroy$ = new Subject<void>();

    const mockRoute = {
        snapshot: { paramMap: { get: () => "1" } },
    };

    const headerDataService = { updateData: jest.fn() };
    const itemsApiService = {
        isLoading$: of(false),
        isError$: of(false),
        getById: jest.fn(() => of(mockItem)),
    };
    const authService = { userData$: of({ id: "user-1" }) };
    const favoriteService = {
        toggleFavorite: jest.fn(() => of({ is_favorite: false })),
    };
    const virtualStockService = {
        manageVirtualStock: jest.fn(() => of({ count: 10, value: 500 })),
    };
    const predictionService = {
        isLoading$: of(false),
        getPrediction: jest.fn(() => of(123.45)),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ItemPageModule],
            providers: [
                { provide: ActivatedRoute, useValue: mockRoute },
                { provide: HeaderDataService, useValue: headerDataService },
                { provide: ItemsApiService, useValue: itemsApiService },
                { provide: AuthService, useValue: authService },
                { provide: FavoriteService, useValue: favoriteService },
                { provide: VirtualStockService, useValue: virtualStockService },
                { provide: PredictionService, useValue: predictionService },
                { provide: DestroyService, useValue: destroy$ },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ItemPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        destroy$.next();
        destroy$.complete();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should update header and subjects on item$ subscription", (done) => {
        component.item$.subscribe(() => {
            expect(headerDataService.updateData).toHaveBeenCalledWith({
                name: "Test Item",
                symbol: "TST",
                change: 2.3,
                color: "#fff",
            });
            component.isFavorite$.subscribe((v) => {
                expect(v).toBe(true);
            });
            component.virtualStock$.subscribe((v) => {
                expect(v).toEqual({ count: 5, value: 100 });
                done();
            });
        });
    });

    it("should toggle favorite", (done) => {
        component["isFavoriteSubject"].subscribe((v) => {
            if (v === false) {
                expect(v).toBe(false);
                done();
            }
        });
        component.toggleFavorite("1");
    });

    it("should generate price", (done) => {
        component["generatedPriceSubject"].subscribe((v) => {
            if (v !== null) {
                expect(v).toBe(123.45);
                done();
            }
        });
        component.generatePrice([]);
    });

    it("should manage virtual stock", (done) => {
        component["virtualStockSubject"].subscribe((v) => {
            if (v?.count === 10) {
                expect(v).toEqual({ count: 10, value: 500 });
                done();
            }
        });
        component.manageVirtualStock("1", 2, "add", 50);
    });

    it("should call updateData with null on destroy", () => {
        component.ngOnDestroy();
        expect(headerDataService.updateData).toHaveBeenCalledWith(null);
    });
});
