import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FuturesPageComponent } from "./futures-page.component";
import { RouterModule } from "@angular/router";
import { ItemModule } from "@app/components/item/item.module";

export const routes = [{ path: "", component: FuturesPageComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ItemModule],
    declarations: [FuturesPageComponent],
})
export class FuturesPageModule {}
