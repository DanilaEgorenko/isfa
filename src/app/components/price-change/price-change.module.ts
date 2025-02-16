import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PriceChangeComponent } from "./price-change.component";

@NgModule({
    imports: [CommonModule],
    declarations: [PriceChangeComponent],
    exports: [PriceChangeComponent],
})
export class PriceChangeModule {}
