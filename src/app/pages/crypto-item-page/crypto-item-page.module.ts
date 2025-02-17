import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UserRatingModule } from "@app/components/user-rating/user-rating.module";
import { TradingviewWidgetModule } from "angular-tradingview-widget";
import { CryptoItemPageComponent } from "./crypto-item-page.component";

const routes = [{ path: "", component: CryptoItemPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TradingviewWidgetModule,
        FormsModule,
        UserRatingModule,
    ],
    declarations: [CryptoItemPageComponent],
})
export class CryptoItemPageModule {}
