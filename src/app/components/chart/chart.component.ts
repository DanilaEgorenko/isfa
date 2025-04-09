import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    ViewChild,
} from "@angular/core";
import { ICoin } from "@app/interfaces/coin";
import {
    ITradingViewWidget,
    TradingviewWidgetComponent,
} from "angular-tradingview-widget";

@Component({
    selector: "app-chart",
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnDestroy {
    @Input() item: ICoin;

    @ViewChild("widget") widget: TradingviewWidgetComponent;

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

    ngOnDestroy(): void {
        this.widget.cleanWidget();
    }
}
