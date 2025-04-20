import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { DestroyService } from "@app/services";
import { AuthService } from "@app/services/auth.service";
import { takeUntil, tap } from "rxjs/operators";

@Component({
    selector: "app-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
    formGroup = new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private destroy$: DestroyService
    ) {}

    login(): void {
        this.authService
            .login(this.formGroup.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.router.navigateByUrl("/");
            });
    }
}
