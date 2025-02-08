import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { of } from "rxjs";

@Component({
    selector: "app-profile-page",
    templateUrl: "./profile-page.component.html",
    styleUrls: ["./profile-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
    profileInfo$ = of({
        name: "Danila",
        pic: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
        status: "Главный тут",
        last_login: new Date(),
        rating: 0,
        id: 1,
    });
}
