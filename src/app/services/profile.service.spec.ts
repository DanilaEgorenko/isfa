import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { ProfileService } from "./profile.service";

describe("ProfileService", () => {
    let service: ProfileService;
    let httpMock: HttpTestingController;

    const apiUrl = "http://127.0.0.1:8000/api";

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProfileService],
        });

        service = TestBed.inject(ProfileService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should fetch user data and manage loading state correctly", fakeAsync(() => {
        const mockId = 1;
        const mockResponse = { id: 1, name: "Test User" };
        const loadingStates: boolean[] = [];

        const sub = service.isLoading$.subscribe((val) =>
            loadingStates.push(val)
        );

        service.getData(mockId).subscribe((data) => {
            expect(data).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${apiUrl}/user/${mockId}/`);
        expect(req.request.method).toBe("GET");
        req.flush(mockResponse);
        tick();

        expect(loadingStates).toEqual([false, true, false]);

        sub.unsubscribe();
    }));
});
