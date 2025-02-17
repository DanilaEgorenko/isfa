import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CollectionItemComponent } from "./collection-item.component";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [CollectionItemComponent],
    exports: [CollectionItemComponent],
})
export class CollectionItemModule {}
