import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "app-price-change",
    templateUrl: "./price-change.component.html",
    styleUrls: ["./price-change.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceChangeComponent {
    @Input() change: number;

    getRotateDeg(change: number): number {
        const deg = 90 - (change / 100) * 90;
        return deg < 0 || deg > 180 ? (deg > 180 ? 180 : 0) : deg;
    }
}
