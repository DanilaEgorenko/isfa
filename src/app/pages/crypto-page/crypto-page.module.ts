import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CryptoPageComponent } from "./crypto-page.component";
import { RouterModule } from "@angular/router";
import { ItemModule } from "@app/components/item/item.module";
import { LoadSpinnerModule } from "@app/components/load-spinner/load-spinner.module";

export const routes = [
    { path: "", component: CryptoPageComponent },
    {
        path: ":id",
        loadChildren: () =>
            import("../crypto-item-page/crypto-item-page.module").then(
                (m) => m.CryptoItemPageModule
            ),
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ItemModule,
        LoadSpinnerModule,
    ],
    declarations: [CryptoPageComponent],
})
export class CryptoPageModule {}
