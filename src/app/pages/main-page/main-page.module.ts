import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainPageComponent } from "./main-page.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ItemModule } from "@app/components/item/item.module";

export const routes = [{ path: "", component: MainPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        ItemModule,
    ],
    declarations: [MainPageComponent],
})
export class MainPageModule {}
