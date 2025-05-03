import { TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { ItemsApiService } from "./items-api.service";

describe("ItemsApiService", () => {
    let service: ItemsApiService;
    let httpMock: HttpTestingController;

    const apiUrl = "http://127.0.0.1:8000/api";

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ItemsApiService],
        });

        service = TestBed.inject(ItemsApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should handle error in getItems and update isError$", (done) => {
        const type = "product";

        service.isError$.subscribe((error) => {
            if (error) {
                expect(error).toContain("Not Found");
                done();
            }
        });

        service.getItems(type).subscribe();

        const req = httpMock.expectOne(`${apiUrl}/${type}s`);
        req.flush("Not Found", { status: 404, statusText: "Not Found" });
    });

    it("should fetch item by ID with Authorization header", (done) => {
        const id = "123";
        const mockItem = { id: "123", name: "ItemName" };
        sessionStorage.setItem("access", "mock-token");

        service.getById(id).subscribe((item) => {
            expect(item).toEqual(mockItem);
            done();
        });

        const req = httpMock.expectOne(`${apiUrl}/item/${id}`);
        expect(req.request.method).toBe("GET");
        expect(req.request.headers.get("Authorization")).toBe(
            "Bearer mock-token"
        );
        req.flush(mockItem);
    });

    it("should handle error in getById and update isError$", (done) => {
        const id = "999";

        service.isError$.subscribe((error) => {
            if (error) {
                expect(error).toContain("Unauthorized");
                done();
            }
        });

        service.getById(id).subscribe();

        const req = httpMock.expectOne(`${apiUrl}/item/${id}`);
        req.flush("Unauthorized", { status: 401, statusText: "Unauthorized" });
    });
});
