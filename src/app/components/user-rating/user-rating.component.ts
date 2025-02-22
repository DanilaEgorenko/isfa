import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@app/services/auth.service";

@Component({
    selector: "app-user-rating",
    templateUrl: "./user-rating.component.html",
    styleUrls: ["./user-rating.component.scss"],
    providers: [AuthService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRatingComponent {
    isLogin$ = this.authService.isLogin$;
    constructor(private authService: AuthService) {}
}
