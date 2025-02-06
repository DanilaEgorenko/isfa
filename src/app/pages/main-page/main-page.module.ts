import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainPageComponent } from "./main-page.component";
import { RouterModule } from "@angular/router";

const routes = [{ path: "", component: MainPageComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [MainPageComponent],
})
export class MainPageModule {}
