import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OptionsPageComponent } from "./options-page.component";
import { RouterModule } from "@angular/router";
import { ItemModule } from "@app/components/item/item.module";

export const routes = [{ path: "", component: OptionsPageComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ItemModule],
    declarations: [OptionsPageComponent],
})
export class OptionsPageModule {}
