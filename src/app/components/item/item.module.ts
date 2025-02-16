import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PriceChangeModule } from "../price-change/price-change.module";
import { ItemComponent } from "./item.component";

@NgModule({
    declarations: [ItemComponent],
    imports: [CommonModule, RouterModule, PriceChangeModule],
    exports: [ItemComponent],
})
export class ItemModule {}
