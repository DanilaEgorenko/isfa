import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "@app/services/auth.service";

@Component({
    selector: "app-registration-page",
    templateUrl: "./registration-page.component.html",
    styleUrls: ["./registration-page.component.scss"],
    providers: [AuthService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {
    formGroup = new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
        name: new FormControl(),
    });

    constructor(private authService: AuthService) {}

    registration(): void {
        this.authService.registration(this.formGroup.value);
    }
}
