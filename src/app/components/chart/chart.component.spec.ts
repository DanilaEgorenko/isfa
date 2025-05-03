import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChartComponent } from "./chart.component";
import { ICoin } from "@app/interfaces/coin";
import { Component, Input } from "@angular/core";
import { ChartModule } from "./chart.module";

describe("ChartComponent", () => {
    let component: ChartComponent;
    let fixture: ComponentFixture<ChartComponent>;

    @Component({
        selector: "tradingview-widget",
        template: "",
    })
    class MockTradingviewWidgetComponent {
        cleanWidget = jest.fn();
    }

    const mockItem = {
        symbol: "BTC",
        color: "#FF0000",
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChartModule],
            declarations: [MockTradingviewWidgetComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.componentInstance;
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should return correct widget config", () => {
        const config = component.getWidgetConfig(mockItem as ICoin);
        expect(config).toEqual(
            expect.objectContaining({
                symbol: "BINANCE:BTCUSD",
                widgetType: "widget",
                locale: "ru",
                timezone: "UTC-3",
                toolbar_bg: "#FF0000",
            })
        );
    });

    it("should call cleanWidget on ngOnDestroy", () => {
        const mockWidget = {
            cleanWidget: jest.fn(),
        } as any;

        component.widget = mockWidget;
        component.ngOnDestroy();

        expect(mockWidget.cleanWidget).toHaveBeenCalled();
    });
});
