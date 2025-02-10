import { NgModule } from "@angular/core";
import { ItemComponent } from "./item.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [ItemComponent],
    imports: [CommonModule, RouterModule],
    exports: [ItemComponent],
})
export class ItemModule {}
