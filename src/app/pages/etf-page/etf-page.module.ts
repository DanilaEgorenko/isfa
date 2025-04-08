import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EtfPageComponent } from "./etf-page.component";
import { RouterModule } from "@angular/router";
import { ItemModule } from "@app/components/item/item.module";

export const routes = [{ path: "", component: EtfPageComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ItemModule],
    declarations: [EtfPageComponent],
})
export class EtfPageModule {}
