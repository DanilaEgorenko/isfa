import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePageComponent } from "./profile-page.component";
import { RouterModule } from "@angular/router";
import { ItemModule } from "@app/components/item/item.module";

const routes = [{ path: ":id", component: ProfilePageComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ItemModule],
    declarations: [ProfilePageComponent],
})
export class ProfilePageModule {}
