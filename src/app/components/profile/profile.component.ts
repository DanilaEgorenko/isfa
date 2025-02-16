import { Location } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { ERoutes } from "@app/enums";
import { HeaderDataService } from "@app/services";
import { DestroyService } from "@app/services/destroy.service";
import { BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
    isMainPage$ = new BehaviorSubject<boolean>(false);
    data$ = this.headerDataService.data$;

    constructor(
        private headerDataService: HeaderDataService,
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
