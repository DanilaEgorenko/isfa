import { TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { FavoriteService } from "./favorite.service";

describe("FavoriteService", () => {
    let service: FavoriteService;
    let httpMock: HttpTestingController;
    const apiUrl = "http://127.0.0.1:8000/api";

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FavoriteService],
        });
        service = TestBed.inject(FavoriteService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should send POST request to toggle favorite with Authorization header", () => {
        const id = "abc123";
        const mockResponse = { success: true };
        sessionStorage.setItem("access", "dummy-token");

        service.toggleFavorite(id).subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${apiUrl}/toggle_favourite/${id}`);
        expect(req.request.method).toBe("POST");

        req.flush(mockResponse);
    });
});
