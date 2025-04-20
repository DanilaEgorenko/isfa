import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { DEFAULT_PIC } from "@app/constants";
import { ERoutes } from "@app/enums";
import { AuthService, DestroyService, ProfileService } from "@app/services";
import { getLogo } from "@app/utils";
import { map, switchMap, takeUntil, tap } from "rxjs/operators";

@Component({
    selector: "app-edit-page",
    templateUrl: "./edit-page.component.html",
    styleUrls: ["./edit-page.component.scss"],
    providers: [ProfileService, DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent {
    readonly getLogo = getLogo;
    readonly ERoutes = ERoutes;
    readonly DEFAULT_PIC = DEFAULT_PIC;

    isLoading$ = this.profileService.isLoading$;
    isError$ = this.profileService.isError$;

    userData$ = this.authService.userData$;
    profileInfo$ = this.userData$.pipe(
        switchMap(({ id }) => id && this.profileService.getData(id))
    );

    formGroup = new FormGroup({
        status: new FormControl(""),
        name: new FormControl(""),
        pic: new FormControl(""),
    });

    constructor(
        private authService: AuthService,
        private profileService: ProfileService,
        private router: Router,
        private destroy$: DestroyService
    ) {
        this.profileInfo$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
            this.formGroup.get("status").patchValue(data.status);
            this.formGroup.get("name").patchValue(data.name);
            this.formGroup.get("pic").patchValue(data.pic);
        });
    }

    sendEditData(): void {
        this.authService
            .edit(this.formGroup.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.router.navigateByUrl("/"));
    }
}
