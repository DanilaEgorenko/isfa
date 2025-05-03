import { TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let authService: AuthService;
    let httpMock: HttpTestingController;

    const apiUrl = "http://127.0.0.1:8000/api";

    let sessionStorageMock: any;

    beforeEach(() => {
        // Мокируем sessionStorage
        sessionStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
        };
        Object.defineProperty(window, "sessionStorage", {
            value: sessionStorageMock,
        });

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });

        authService = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(authService).toBeTruthy();
    });

    it("should call parseToken", () => {
        const spy = jest.spyOn(authService, "parseToken");

        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJUb2t5In0sImV4cCI6MTYyMTYwNzI1OX0.-X-xkqE2Ax1b2QkMchcG07f-Jt63WrrZTsh5hECeB3Y";
        authService.parseToken(token);

        expect(spy).toHaveBeenCalledWith(token);
    });
});
