import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TradingviewWidgetModule } from "angular-tradingview-widget";
import { ChartComponent } from "./chart.component";

@NgModule({
    imports: [CommonModule, TradingviewWidgetModule],
    declarations: [ChartComponent],
    exports: [ChartComponent],
})
export class ChartModule {}
