import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DEFAULT_PIC } from "@app/constants";
import { DestroyService } from "@app/services";
import { AuthService } from "@app/services/auth.service";
import { ProfileService } from "@app/services/profile.service";
import { map, takeUntil } from "rxjs/operators";

@Component({
    selector: "app-profile-page",
    templateUrl: "./profile-page.component.html",
    styleUrls: ["./profile-page.component.scss"],
    providers: [ProfileService, DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
    readonly DEFAULT_PIC = DEFAULT_PIC;
    readonly id = Number(this.route.snapshot.paramMap.get("id"));

    profileInfo$ = this.profileService.getData(this.id);
    isLoading$ = this.profileService.isLoading$;
    userData$ = this.authService.userDataSubject$.asObservable();
    isMineProdile$ = this.userData$.pipe(
        map(({ user_id }) => user_id === this.id)
    );

    constructor(
        private profileService: ProfileService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private destroy$: DestroyService
    ) {
        this.isLoading$.subscribe((data) => console.log(data));
    }

    logout() {
        this.authService
            .logout()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.router.navigateByUrl("/"));
    }
}
