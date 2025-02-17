import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ItemModule } from "@app/components/item/item.module";
import { UserRatingModule } from "../../components/user-rating/user-rating.module";
import { CollectionPageComponent } from "./collection-page.component";

const routes = [{ path: ":id", component: CollectionPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UserRatingModule,
        UserRatingModule,
        ItemModule,
    ],
    declarations: [CollectionPageComponent],
})
export class CollectionPageModule {}
