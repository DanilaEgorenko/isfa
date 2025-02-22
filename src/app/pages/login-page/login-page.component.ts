import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "@app/services/auth.service";

@Component({
    selector: "app-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"],
    providers: [AuthService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
    formGroup = new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
    });

    constructor(private authService: AuthService) {}

    login(): void {
        this.authService.login(this.formGroup.value);
    }
}
