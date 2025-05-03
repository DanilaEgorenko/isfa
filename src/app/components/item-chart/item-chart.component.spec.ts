import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ItemChartComponent } from "./item-chart.component";
import { By } from "@angular/platform-browser";
import { Chart } from "chart.js";

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

    it("should initialize chart on AfterViewInit", () => {
        const initChartSpy = spyOn(component, "initChart").and.callThrough();
        component.ngAfterViewInit();
        expect(initChartSpy).toHaveBeenCalled();
    });

    it("should call createChart with correct data", () => {
        const createChartSpy = spyOn(
            component,
            "createChart"
        ).and.callThrough();
        component.initChart();
        expect(createChartSpy).toHaveBeenCalledWith(mockData);
    });

    it("should create the chart with the correct dataset", () => {
        const chartData = mockData.map((d, i) => ({
            x: i,
            o: d.o,
            h: d.h,
            l: d.l,
            c: d.c,
            volume: d.volume,
        }));

        const chartInitSpy = spyOn(Chart, "register").and.callThrough();
        const createChartSpy = spyOn(
            component,
            "createChart"
        ).and.callThrough();
        component.initChart();

        expect(chartInitSpy).toHaveBeenCalled();
        expect(createChartSpy).toHaveBeenCalled();
        expect(component.chart.data.datasets[0].data).toEqual(chartData);
    });

    it("should handle canvas context correctly", () => {
        const chartCanvasElement: HTMLCanvasElement =
            fixture.debugElement.query(By.css("canvas")).nativeElement;
        const contextSpy = spyOn(
            chartCanvasElement,
            "getContext"
        ).and.callThrough();

        component.initChart();

        expect(contextSpy).toHaveBeenCalledWith("2d");
        expect(component.chart).toBeDefined();
    });

    it("should handle canvas context error", () => {
        const chartCanvasElement: HTMLCanvasElement =
            fixture.debugElement.query(By.css("canvas")).nativeElement;
        spyOn(chartCanvasElement, "getContext").and.returnValue(null);

        const consoleErrorSpy = spyOn(console, "error");

        component.initChart();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            "Не удалось получить контекст canvas"
        );
    });

    it("should contain chart with zoom and pan options", () => {
        component.initChart();
        const options = component.chart.options.plugins.zoom;

        expect(options).toBeTruthy();
        expect(options.zoom).toEqual({
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: "x",
        });
        expect(options.pan).toEqual({
            enabled: true,
            mode: "x",
            modifierKey: "ctrl",
        });
    });

    it("should update chart data correctly when input data changes", () => {
        component.data = [
            { x: 1637598000000, o: 1.5, h: 2.0, l: 1.2, c: 1.8, volume: 150 },
        ];
        fixture.detectChanges();

        const updateChartSpy = spyOn(component.chart, "update");
        component.createChart(component.data);

        expect(updateChartSpy).toHaveBeenCalled();
    });
});
