import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-user-rating",
    templateUrl: "./user-rating.component.html",
    styleUrls: ["./user-rating.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRatingComponent {}
