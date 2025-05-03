import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ItemChartComponent } from "./item-chart.component";
import { By } from "@angular/platform-browser";
import { Chart } from "chart.js";

jest.mock("chart.js", () => {
    const originalChart = jest.requireActual("chart.js");

    return {
        ...originalChart,
        Chart: {
            ...originalChart.Chart,
            register: jest.fn(),
        },
        registerables: [],
    };
});

jest.mock("chartjs-plugin-zoom", () => jest.fn());

jest.mock("chartjs-chart-financial", () => ({
    CandlestickController: jest.fn(),
    CandlestickElement: jest.fn(),
    OhlcController: jest.fn(),
    OhlcElement: jest.fn(),
}));

describe("ItemChartComponent", () => {
    let component: ItemChartComponent;
    let fixture: ComponentFixture<ItemChartComponent>;
    let mockData: any[];

    beforeEach(async () => {
        mockData = [
            { x: 1637587200000, o: 1, h: 1.5, l: 0.8, c: 1.2, volume: 100 },
            { x: 1637590800000, o: 1.2, h: 1.6, l: 1.0, c: 1.4, volume: 120 },
            { x: 1637594400000, o: 1.4, h: 1.8, l: 1.2, c: 1.6, volume: 140 },
        ];

        await TestBed.configureTestingModule({
            declarations: [ItemChartComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ItemChartComponent);
        component = fixture.componentInstance;
        component.data = mockData;
        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });
});
