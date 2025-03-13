import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
} from "@angular/core";
import { AuthService } from "@app/services/auth.service";
import { UserRatingApiService } from "./user-rating-api.service";
import { DestroyService } from "@app/services";
import { takeUntil } from "rxjs/operators";

export interface IHumanTrand {
    up: number;
    down: number;
}

export type UserAction = "up" | "down" | "none";

@Component({
    selector: "app-user-rating",
    templateUrl: "./user-rating.component.html",
    styleUrls: ["./user-rating.component.scss"],
    providers: [AuthService, DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRatingComponent {
    @Input() human_trand: IHumanTrand | null = null;
    @Input() userAction: UserAction = "none";
    @Input() id: string;

    userData$ = this.authService.userDataSubject$.asObservable();

    constructor(
        private authService: AuthService,
        private userRatingApiService: UserRatingApiService,
        private cdr: ChangeDetectorRef,
        private destroy$: DestroyService
    ) {
        this.authService.loadUserData();
    }

    getPercentages(trand: number): number {
        const allTrand = this.human_trand.up + this.human_trand.down;
        return (trand / allTrand) * 100;
    }

    vote(action: UserAction): void {
        this.userRatingApiService
            .vote(this.id, action)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (
                    (this.userAction === "down" && action === "up") ||
                    (this.userAction === "up" && action === "down")
                ) {
                    this.human_trand[this.userAction] -= 1;
                    this.userAction = "none";
                } else {
                    this.userAction = action;
                    this.human_trand[action] += 1;
                }
                this.cdr.detectChanges();
            });
    }
}
