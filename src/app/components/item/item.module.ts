import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PriceChangeModule } from "../price-change/price-change.module";
import { ItemComponent } from "./item.component";

@NgModule({
    imports: [CommonModule, RouterModule, PriceChangeModule],
    declarations: [ItemComponent],
    exports: [ItemComponent],
})
export class ItemModule {}
