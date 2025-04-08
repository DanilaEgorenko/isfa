import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DEFAULT_PIC } from "@app/constants";
import { DestroyService } from "@app/services";
import { AuthService } from "@app/services/auth.service";
import { ProfileService } from "@app/services/profile.service";
import { getLogo } from "@app/utils";
import { map, takeUntil } from "rxjs/operators";

@Component({
    selector: "app-profile-page",
    templateUrl: "./profile-page.component.html",
    styleUrls: ["./profile-page.component.scss"],
    providers: [ProfileService, DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {
    readonly getLogo = getLogo;
    readonly DEFAULT_PIC = DEFAULT_PIC;
    readonly id = Number(this.route.snapshot.paramMap.get("id"));

    profileInfo$ = this.profileService.getData(this.id);
    isLoading$ = this.profileService.isLoading$;
    userData$ = this.authService.userData$;
    isMineProdile$ = this.userData$.pipe(map((user) => user.id === this.id));

    constructor(
        private profileService: ProfileService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private destroy$: DestroyService
    ) {}

    ngOnInit(): void {
        this.authService.loadUserData();
    }

    logout() {
        this.authService
            .logout()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.router.navigateByUrl("/"));
    }

    getVirtualStockValue(arr: any[]): number {
        return Math.round(arr.reduce((a, r) => a + r.value * r.count, 0));
    }

    getDiffVirtualPrice(nowPrice: number, boughtPrice: number): number {
        if (!nowPrice) return 0;
        return Math.round(((nowPrice - boughtPrice) / nowPrice) * 100);
    }
}
