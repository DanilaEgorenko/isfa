import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RegistrationPageComponent } from "./registration-page.component";
import { AuthService } from "@app/services/auth.service";
import { Router } from "@angular/router";
import { DestroyService } from "@app/services";
import { ReactiveFormsModule } from "@angular/forms";
import { of, Subject } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";

class MockDestroyService extends Subject<void> {}

describe("RegistrationPageComponent", () => {
    let component: RegistrationPageComponent;
    let fixture: ComponentFixture<RegistrationPageComponent>;
    let authService: any;
    let router: any;

    beforeEach(async () => {
        authService = {
            registration: jest.fn(),
        };

        router = {
            navigateByUrl: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [RegistrationPageComponent],
            imports: [ReactiveFormsModule, RouterTestingModule],
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: Router, useValue: router },
                { provide: DestroyService, useValue: MockDestroyService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RegistrationPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create component", () => {
        expect(component).toBeTruthy();
    });

    it("should call registration and navigate to '/'", () => {
        const mockResponse$ = of({});
        authService.registration.mockReturnValue(mockResponse$);

        component.formGroup.setValue({
            email: "test@example.com",
            password: "123456",
            name: "Test User",
        });

        component.registration();

        expect(authService.registration).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "123456",
            name: "Test User",
        });

        expect(router.navigateByUrl).toHaveBeenCalledWith("/");
    });
});
