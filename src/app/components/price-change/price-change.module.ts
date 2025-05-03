import { NgModule } from "@angular/core";
import { PriceChangeComponent } from "./price-change.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [PriceChangeComponent],
    exports: [PriceChangeComponent],
})
export class PriceChangeModule {}
