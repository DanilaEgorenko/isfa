import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BondsPageComponent } from "./bonds-page.component";
import { RouterModule } from "@angular/router";
import { ItemModule } from "@app/components/item/item.module";

export const routes = [{ path: "", component: BondsPageComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ItemModule],
    declarations: [BondsPageComponent],
})
export class BondsPageModule {}
