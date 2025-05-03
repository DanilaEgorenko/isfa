import { TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { PredictionService } from "./prediction.service";

describe("PredictionService", () => {
    let service: PredictionService;
    let httpMock: HttpTestingController;

    const apiUrl = "http://127.0.0.1:8000/api";

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PredictionService],
        });

        service = TestBed.inject(PredictionService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should handle error and update isError$", (done) => {
        const mockBody = { item: "ETH" };

        service.isError$.subscribe((error) => {
            if (error) {
                expect(error).toContain("Internal Server Error");
                done();
            }
        });

        service.getPrediction(mockBody).subscribe();

        const req = httpMock.expectOne(`${apiUrl}/predict_price/`);
        req.flush("Internal Server Error", {
            status: 500,
            statusText: "Internal Server Error",
        });
    });
});
