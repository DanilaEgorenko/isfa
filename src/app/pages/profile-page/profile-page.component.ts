import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "@app/services/profile.service";
import { of } from "rxjs";

@Component({
    selector: "app-profile-page",
    templateUrl: "./profile-page.component.html",
    styleUrls: ["./profile-page.component.scss"],
    providers: [ProfileService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
    readonly id = Number(this.route.snapshot.paramMap.get("id"));

    profileInfo$ = this.profileService.getData(this.id);
    isLoading$ = this.profileService.isLoading$;

    constructor(
        private profileService: ProfileService,
        private route: ActivatedRoute
    ) {
        this.isLoading$.subscribe((data) => console.log(data));
    }
}
