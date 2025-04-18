import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ChartModule } from "@app/components/chart/chart.module";
import { UserRatingModule } from "@app/components/user-rating/user-rating.module";
import { CryptoItemPageComponent } from "./crypto-item-page.component";
import { CommentsModule } from "@app/components/comments/comments.module";
import { LoadSpinnerModule } from "@app/components/load-spinner/load-spinner.module";

const routes = [{ path: "", component: CryptoItemPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        UserRatingModule,
        ChartModule,
        CommentsModule,
        LoadSpinnerModule,
    ],
    declarations: [CryptoItemPageComponent],
})
export class CryptoItemPageModule {}
