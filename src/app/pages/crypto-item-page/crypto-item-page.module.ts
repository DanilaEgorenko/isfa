import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CryptoItemPageComponent } from "./crypto-item-page.component";
import { RouterModule } from "@angular/router";
import { TradingviewWidgetModule } from "angular-tradingview-widget";
import { FormsModule } from "@angular/forms";

const routes = [{ path: "", component: CryptoItemPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TradingviewWidgetModule,
        FormsModule,
    ],
    declarations: [CryptoItemPageComponent],
})
export class CryptoItemPageModule {}
