import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ICoin } from "@app/interfaces/coin";
import { ITradingViewWidget } from "angular-tradingview-widget";

@Component({
    selector: "app-chart",
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
    @Input() item: ICoin;

    getWidgetConfig(item: ICoin): ITradingViewWidget {
        return {
            symbol: `BINANCE:${item.symbol}USD`,
            widgetType: "widget",
            locale: "ru",
            timezone: "UTC-3",
            toolbar_bg: item?.color,
            // autosize: true,
        };
    }
}
