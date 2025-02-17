import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserRatingComponent } from "./user-rating.component";

@NgModule({
    imports: [CommonModule],
    declarations: [UserRatingComponent],
    exports: [UserRatingComponent],
})
export class UserRatingModule {}
