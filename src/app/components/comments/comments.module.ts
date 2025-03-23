import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentsComponent } from "./comments.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [CommentsComponent],
    exports: [CommentsComponent],
})
export class CommentsModule {}
