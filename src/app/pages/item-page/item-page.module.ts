import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ChartModule } from "@app/components/chart/chart.module";
import { UserRatingModule } from "@app/components/user-rating/user-rating.module";
import { ItemPageComponent } from "./item-page.component";
import { CommentsModule } from "@app/components/comments/comments.module";
import { ItemChartModule } from "@app/components/item-chart/item-chart.module";

const routes = [{ path: "", component: ItemPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        UserRatingModule,
        ChartModule,
        CommentsModule,
        ItemChartModule,
    ],
    declarations: [ItemPageComponent],
})
export class ItemPageModule {}
