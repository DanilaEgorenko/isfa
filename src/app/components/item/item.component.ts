import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { IItem } from "@app/interfaces";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
    @Input() item: Omit<IItem, "logo">;

    getRotateDeg(change: number): number {
        const deg = 90 - (change / 100) * 90;
        return deg < 0 || deg > 180 ? (deg > 180 ? 180 : 0) : deg;
    }
}
