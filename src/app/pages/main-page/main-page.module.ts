import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CollectionItemModule } from "@app/components/collection-item/collection-item.module";
import { ItemModule } from "@app/components/item/item.module";
import { MainPageComponent } from "./main-page.component";

export const routes = [{ path: "", component: MainPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        ItemModule,
        CollectionItemModule,
    ],
    declarations: [MainPageComponent],
})
export class MainPageModule {}
