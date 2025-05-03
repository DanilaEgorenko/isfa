import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    flush,
} from "@angular/core/testing";
import { CryptoPageComponent } from "./crypto-page.component";
import { CryptoApiService } from "@app/services";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BehaviorSubject } from "rxjs";
import { CryptoPageModule } from "./crypto-page.module";

describe("CryptoPageComponent", () => {
    let component: CryptoPageComponent;
    let fixture: ComponentFixture<CryptoPageComponent>;
    let cryptoApiService: CryptoApiService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, CryptoPageModule],
            providers: [
                CryptoApiService,
                {
                    provide: CryptoApiService,
                    useValue: {
                        getCrypro: jest.fn().mockReturnValue(
                            of({
                                data: {
                                    coins: [
                                        { name: "Bitcoin" },
                                        { name: "Ethereum" },
                                    ],
                                },
                            })
                        ),
                        isLoading$: new BehaviorSubject(false),
                        isError$: new BehaviorSubject(false),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CryptoPageComponent);
        component = fixture.componentInstance;
        cryptoApiService = TestBed.inject(CryptoApiService);
        fixture.detectChanges();
    });
});
