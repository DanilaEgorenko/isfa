import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharesPageComponent } from "./shares-page.component";
import { RouterModule } from "@angular/router";
import { ItemModule } from "@app/components/item/item.module";

export const routes = [
    { path: "", component: SharesPageComponent },
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
    declarations: [SharesPageComponent],
})
export class SharesPageModule {}
