import { Location } from "@angular/common";
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { DEFAULT_PIC } from "@app/constants";
import { ERoutes } from "@app/enums";
import { HeaderDataService } from "@app/services";
import { AuthService } from "@app/services/auth.service";
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
    readonly DEFAULT_PIC = DEFAULT_PIC;

    isMainPage$ = new BehaviorSubject<boolean>(false);
    isLoginPage$ = new BehaviorSubject<boolean>(false);
    data$ = this.headerDataService.data$;

    userData$ = this.authService.userData$;

    constructor(
        private headerDataService: HeaderDataService,
        private authService: AuthService,
        private location: Location,
        private router: Router,
        private destroy$: DestroyService
    ) {
        this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.isMainPage$.next(this.router.url === `/${ERoutes.MAIN}`);
            this.isLoginPage$.next(
                this.router.url === `/${ERoutes.LOGIN}` ||
                    this.router.url === `/${ERoutes.REGISTRATION}`
            );
        });
    }

    back(): void {
        this.location.back();
    }
}
