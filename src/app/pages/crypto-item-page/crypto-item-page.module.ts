import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CryptoItemPageComponent } from "./crypto-item-page.component";
import { RouterModule } from "@angular/router";

const routes = [{ path: "", component: CryptoItemPageComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [CryptoItemPageComponent],
})
export class CryptoItemPageModule {}
