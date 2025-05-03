import { TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { VirtualStockService } from "./virtual-stock.service";

describe("VirtualStockService", () => {
    let service: VirtualStockService;
    let httpMock: HttpTestingController;

    const apiUrl = "http://127.0.0.1:8000/api";

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [VirtualStockService],
        });

        service = TestBed.inject(VirtualStockService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should send POST request to manage virtual stock", () => {
        const itemId = "abc123";
        const quantity = 10;
        const type = "add";
        const pricePerUnit = 99.99;

        sessionStorage.setItem("access", "mock-token");

        service
            .manageVirtualStock(itemId, quantity, type, pricePerUnit)
            .subscribe();

        const req = httpMock.expectOne(`${apiUrl}/manage_virtual_portfolio`);
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual({
            item_id: itemId,
            quantity,
            type,
            price_per_unit: pricePerUnit,
        });
        expect(req.request.headers.get("Authorization")).toBe(
            "Bearer mock-token"
        );

        req.flush({ success: true });
    });

    it("should work without pricePerUnit (optional param)", () => {
        const itemId = "xyz789";
        const quantity = 5;
        const type = "remove";

        sessionStorage.setItem("access", "mock-token");

        service.manageVirtualStock(itemId, quantity, type).subscribe();

        const req = httpMock.expectOne(`${apiUrl}/manage_virtual_portfolio`);
        expect(req.request.body).toEqual({
            item_id: itemId,
            quantity,
            type,
            price_per_unit: undefined,
        });

        req.flush({ success: true });
    });
});
