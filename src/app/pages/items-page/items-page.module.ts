import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ItemModule } from "@app/components/item/item.module";
import { ItemsPageComponent } from "./items-page.component";

export const routes = [
    { path: "", component: ItemsPageComponent },
    {
        path: ":id",
        loadChildren: () =>
            import("../item-page/item-page.module").then(
                (m) => m.ItemPageModule
            ),
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ItemModule],
    declarations: [ItemsPageComponent],
})
export class ItemsPageModule {}
