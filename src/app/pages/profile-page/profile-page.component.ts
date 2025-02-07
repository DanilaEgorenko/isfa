import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { of } from "rxjs";
import { ACHIEVEMENT_MAP } from "./constants";

@Component({
    selector: "app-profile-page",
    templateUrl: "./profile-page.component.html",
    styleUrls: ["./profile-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
    readonly ACHIEVEMENT_MAP = ACHIEVEMENT_MAP;

    profileInfo$ = of({
        name: "Danila",
        pic: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
        status: "Главный тут",
        last_login: new Date(),
        rating: 0,
        achievements: [{ name: "login_streak", value: 1 }],
        id: 1,
    });

    getAnimationDuration(value: number): string {
        const formula = 1 - value / 100;
        return (formula <= 0.95 ? formula + 0.2 : 0) + "s";
    }
}
