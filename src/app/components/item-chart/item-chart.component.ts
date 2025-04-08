import {
    Component,
    AfterViewInit,
    ViewChild,
    ElementRef,
    ChangeDetectionStrategy,
    Input,
} from "@angular/core";
import { Chart, registerables } from "chart.js";
import {
    CandlestickController,
    CandlestickElement,
    OhlcController,
    OhlcElement,
} from "chartjs-chart-financial";
import zoomPlugin from "chartjs-plugin-zoom";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

@Component({
    selector: "app-item-chart",
    templateUrl: "./item-chart.component.html",
    styleUrls: ["./item-chart.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemChartComponent implements AfterViewInit {
    @Input() data: any[] = [];

    @ViewChild("chartCanvas", { static: true }) chartCanvas!: ElementRef;
    chart: any;

    ngAfterViewInit(): void {
        this.initChart();
    }

    initChart() {
        Chart.register(
            ...registerables,
            zoomPlugin,
            CandlestickController,
            OhlcController,
            CandlestickElement,
            OhlcElement
        );

        this.createChart(this.data);
    }

    createChart(data: any[]) {
        const ctx = this.chartCanvas.nativeElement.getContext("2d");
        if (!ctx) {
            console.error("Не удалось получить контекст canvas");
            return;
        }

        const labels = data.map((d) =>
            format(new Date(d.x), "dd.MM HH:mm", { locale: ru })
        );

        const chartData = data.map((d, i) => ({
            x: i,
            o: d.o,
            h: d.h,
            l: d.l,
            c: d.c,
            volume: d.volume,
        }));

        this.chart = new Chart(ctx, {
            type: "candlestick",
            data: {
                labels,
                datasets: [
                    {
                        label: "Цена",
                        data: chartData,
                        // @ts-ignore
                        color: {
                            up: "#1b8",
                            down: "#f75708",
                            unchanged: "#e4dccf",
                        },
                    },
                ],
            },
            options: {
                responsive: true,
                animation: false,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const item = context.raw as any;
                                return [
                                    `Откр: ${item.o}`,
                                    `Макс: ${item.h}`,
                                    `Мин: ${item.l}`,
                                    `Закр: ${item.c}`,
                                    `Объём: ${item.volume}`,
                                ];
                            },
                        },
                    },
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: "x",
                            modifierKey: "ctrl", // Прокрутка с Ctrl
                        },
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            mode: "x",
                        },
                        limits: {
                            x: {
                                min: 0,
                                max: chartData.length - 1,
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        type: "category",
                        ticks: {
                            maxRotation: 0,
                            autoSkip: true,
                        },
                        min: 0,
                        max: 48, // Показываем ~1 день (48 свечей по 30 минут или сколько у тебя)
                    },
                },
            },
        });
    }
}
