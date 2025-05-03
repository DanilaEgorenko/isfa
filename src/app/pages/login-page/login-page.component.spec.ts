import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginPageComponent } from "./login-page.component";
import { AuthService } from "@app/services/auth.service";
import { DestroyService } from "@app/services";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { LoginPageModule } from "./login-page.module";
import { RouterTestingModule } from "@angular/router/testing";

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
            imports: [ReactiveFormsModule, RouterTestingModule],
            declarations: [LoginPageComponent],
            providers: [
                { provide: AuthService, useValue: authService },
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

    it("should call authService.login with form data", () => {
        const credentials = { email: "test@example.com", password: "123456" };
        component.formGroup.setValue(credentials);
        authService.login.mockReturnValue(of({}));

        component.login();

        expect(authService.login).toHaveBeenCalledWith(credentials);
    });
});
