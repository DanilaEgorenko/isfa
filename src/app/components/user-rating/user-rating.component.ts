import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
} from "@angular/core";
import { AuthService } from "@app/services/auth.service";
import { DestroyService, UserRatingApiService } from "@app/services";
import { takeUntil } from "rxjs/operators";
import { IHumanTrand } from "@app/interfaces";
import { UserAction } from "@app/types";

@Component({
    selector: "app-user-rating",
    templateUrl: "./user-rating.component.html",
    styleUrls: ["./user-rating.component.scss"],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRatingComponent {
    @Input() humanTrand: IHumanTrand | null = null;
    @Input() userAction: UserAction = "none";
    @Input() id: string | number;

    userData$ = this.authService.userData$;

    constructor(
        private authService: AuthService,
        private userRatingApiService: UserRatingApiService,
        private cdr: ChangeDetectorRef,
        private destroy$: DestroyService
    ) {}

    getPercentages(trand: number): number {
        const allTrand = this.humanTrand.up + this.humanTrand.down;
        return (trand / allTrand) * 100;
    }

    vote(action: UserAction): void {
        this.userRatingApiService
            .vote(
                `${this.id}`,
                action,
                isNaN(+this.id) ? "items" : "collections"
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (
                    (this.userAction === "down" && action === "up") ||
                    (this.userAction === "up" && action === "down")
                ) {
                    this.humanTrand[this.userAction] -= 1;
                    this.userAction = "none";
                } else {
                    this.userAction = action;
                    this.humanTrand[action] += 1;
                }
                this.cdr.detectChanges();
            });
    }
}
