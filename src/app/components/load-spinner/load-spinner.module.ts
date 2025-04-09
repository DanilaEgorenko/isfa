import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadSpinnerComponent } from "./load-spinner.component";

@NgModule({
    imports: [CommonModule],
    declarations: [LoadSpinnerComponent],
    exports: [LoadSpinnerComponent],
})
export class LoadSpinnerModule {}
