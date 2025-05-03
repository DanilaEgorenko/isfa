import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { CryptoApiService } from "./crypto-api.service";

describe("CryptoApiService", () => {
    let service: CryptoApiService;
    let httpMock: HttpTestingController;
    const apiUrl = "http://127.0.0.1:8000/api/";

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CryptoApiService],
        });
        service = TestBed.inject(CryptoApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should get crypto list with offset", () => {
        const mockResponse = { results: [] };

        service.getCrypro({ offset: 10 }).subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${apiUrl}crypto/?offset=10`);
        expect(req.request.method).toBe("GET");
        req.flush(mockResponse);
    });

    it("should get crypto list with default offset 0", () => {
        const mockResponse = { results: [] };

        service.getCrypro().subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${apiUrl}crypto/?offset=0`);
        expect(req.request.method).toBe("GET");
        req.flush(mockResponse);
    });

    it("should get crypto sorted by change", () => {
        const mockResponse = { results: [] };

        service.getCryproByChange("desc").subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${apiUrl}crypto/change/desc/`);
        expect(req.request.method).toBe("GET");
        req.flush(mockResponse);
    });

    it("should get crypto by ID with authorization", () => {
        const mockResponse = { id: "btc", name: "Bitcoin" };
        sessionStorage.setItem("access", "dummy-token");

        service.getById("btc").subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${apiUrl}crypto/btc/`);
        expect(req.request.method).toBe("GET");
        expect(req.request.headers.get("Authorization")).toBe(
            "Bearer dummy-token"
        );
        req.flush(mockResponse);
    });

    it("should get crypto history from external API", () => {
        const mockResponse = { data: { history: [] } };

        service.getCryptoHistory().subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(
            "https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/history"
        );
        expect(req.request.method).toBe("GET");
        req.flush(mockResponse);
    });

    it("should get crypto symbol and prefix from external API", () => {
        const mockApiResponse = {
            data: {
                markets: [
                    {
                        exchangeName: "Binance",
                        baseSymbol: "BTC",
                    },
                ],
            },
        };

        service.getCryptoSymbol("bitcoin").subscribe((res) => {
            expect(res).toEqual({ prefix: "Binance", symbol: "BTC" });
        });

        const req = httpMock.expectOne(
            "https://api.coinranking.com/v2/search-suggestions?query=bitcoin"
        );
        expect(req.request.method).toBe("GET");
        req.flush(mockApiResponse);
    });

    it("should toggle isLoading$ on getCrypro", fakeAsync(() => {
        const states: boolean[] = [];
        service.isLoading$.subscribe((val) => states.push(val));

        service.getCrypro().subscribe();
        const req = httpMock.expectOne(`${apiUrl}crypto/?offset=0`);
        req.flush({});

        tick();
        expect(states).toEqual([false, true, false]);
    }));

    it("should set error on failed getCrypro", fakeAsync(() => {
        let error: string | null = null;
        service.isError$.subscribe((err) => (error = err));

        service.getCrypro().subscribe();
        const req = httpMock.expectOne(`${apiUrl}crypto/?offset=0`);
        req.flush("Failed", { status: 500, statusText: "Server Error" });

        tick();
        expect(error).toBe(
            "Http failure response for http://127.0.0.1:8000/api/crypto/?offset=0: 500 Server Error"
        );
    }));

    it("should toggle isLoading$ on getById", fakeAsync(() => {
        const states: boolean[] = [];
        sessionStorage.setItem("access", "dummy-token");

        service.isLoading$.subscribe((val) => states.push(val));
        service.getById("btc").subscribe();

        const req = httpMock.expectOne(`${apiUrl}crypto/btc/`);
        req.flush({});

        tick();
        expect(states).toEqual([false, true, false]);
    }));
});
