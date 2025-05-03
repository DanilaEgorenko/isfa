import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CryptoItemPageComponent } from "./crypto-item-page.component";
import { BehaviorSubject } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import {
    FavoriteService,
    HeaderDataService,
    VirtualStockService,
    CryptoApiService,
} from "@app/services";
import { of } from "rxjs";
import { ICoinApiResponse } from "@app/interfaces";
import { CryptoItemPageModule } from "./crypto-item-page.module";

// Мокирование зависимостей
class MockCryptoApiService {
    isLoading$ = of(false);
    isError$ = of("");
    getById(id: string) {
        return of({
            coin: { name: "Bitcoin", symbol: "BTC", change: 5, color: "green" },
            favourite: false,
            virtual_stock: null,
        } as unknown as ICoinApiResponse);
    }
    getCryptoHistory = () => of();
}
class MockHeaderDataService {
    updateData(data: any) {}
}

class MockVirtualStockService {}

describe("CryptoItemPageComponent", () => {
    let component: CryptoItemPageComponent;
    let fixture: ComponentFixture<CryptoItemPageComponent>;
    let cryptoApiService: MockCryptoApiService;
    let headerDataService: MockHeaderDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, CryptoItemPageModule],
            providers: [
                { provide: CryptoApiService, useClass: MockCryptoApiService },
                { provide: HeaderDataService, useClass: MockHeaderDataService },
                {
                    provide: VirtualStockService,
                    useClass: MockVirtualStockService,
                },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { paramMap: { get: () => "1" } } },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CryptoItemPageComponent);
        component = fixture.componentInstance;
        cryptoApiService = TestBed.inject(CryptoApiService);
        headerDataService = TestBed.inject(HeaderDataService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should initialize with correct data", (done) => {
        component.item$.subscribe((data) => {
            expect(data.coin.name).toBe("Bitcoin");
            expect(component["isFavoriteSubject"].getValue()).toBe(false);
            done();
        });
    });
});
