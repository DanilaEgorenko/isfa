import { TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { UserRatingApiService } from "./user-rating-api.service";
import { UserAction } from "@app/components/user-rating/user-rating.component";

describe("UserRatingApiService", () => {
    let service: UserRatingApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserRatingApiService],
        });

        service = TestBed.inject(UserRatingApiService);
        httpMock = TestBed.inject(HttpTestingController);

        sessionStorage.setItem("access", "mock-token");
    });

    afterEach(() => {
        httpMock.verify();
        sessionStorage.clear();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should send POST request to correct URL with correct headers and body", () => {
        const mockResponse = { success: true };
        const id = "123";
        const action: UserAction = "up";
        const type = "items";

        service.vote(id, action, type).subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(
            `http://127.0.0.1:8000/api/items/123/vote/`
        );
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual({ action });
        expect(req.request.headers.get("Authorization")).toBe(
            "Bearer mock-token"
        );

        req.flush(mockResponse);
    });
});
