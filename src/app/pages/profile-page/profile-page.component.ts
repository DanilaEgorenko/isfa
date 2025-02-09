import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
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
    profileInfo$ = this.profileService.getData(1);

    constructor(private profileService: ProfileService) {}
}
