import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { DestroyService } from "@app/services";
import { AuthService } from "@app/services/auth.service";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "app-registration-page",
    templateUrl: "./registration-page.component.html",
    styleUrls: ["./registration-page.component.scss"],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {
    formGroup = new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
        name: new FormControl(),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private destroy$: DestroyService
    ) {}

    registration(): void {
        this.authService
            .registration(this.formGroup.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.router.navigateByUrl("/");
            });
    }
}
