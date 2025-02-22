import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserRatingComponent } from "./user-rating.component";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [UserRatingComponent],
    exports: [UserRatingComponent],
})
export class UserRatingModule {}
