import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ERoutes } from "@app/enums";
import { BehaviorSubject } from "rxjs";
import { take, takeLast, takeUntil } from "rxjs/operators";
import { DestroyService } from "@app/services/destroy.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
    isMainPage$ = new BehaviorSubject<boolean>(false);

    constructor(
        private location: Location,
        private router: Router,
        private destroy$: DestroyService
    ) {
        this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.isMainPage$.next(this.router.url === `/${ERoutes.MAIN}`);
        });
    }

    back(): void {
        this.location.back();
    }
}
