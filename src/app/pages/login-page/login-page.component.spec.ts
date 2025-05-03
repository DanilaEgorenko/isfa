import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginPageComponent } from "./login-page.component";
import { AuthService } from "@app/services/auth.service";
import { DestroyService } from "@app/services";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { LoginPageModule } from "./login-page.module";

describe("LoginPageComponent", () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;

    const authService = {
        login: jest.fn(),
    };

    const router = {
        navigateByUrl: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, LoginPageModule],
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: Router, useValue: router },
                DestroyService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call authService.login with form data and navigate", () => {
        const credentials = { email: "test@example.com", password: "123456" };
        component.formGroup.setValue(credentials);
        authService.login.mockReturnValue(of({}));

        component.login();

        expect(authService.login).toHaveBeenCalledWith(credentials);
        expect(router.navigateByUrl).toHaveBeenCalledWith("/");
    });
});
