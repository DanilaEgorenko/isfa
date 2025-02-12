import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IItem } from "@app/interfaces";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
    @Input() item: IItem;

    constructor(private router: Router) {}

    getRotateDeg(change: number): number {
        const deg = 90 - (change / 100) * 90;
        return deg < 0 || deg > 180 ? (deg > 180 ? 180 : 0) : deg;
    }

    getLogo(isin: string): string {
        return `https://invest-brands.cdn-tinkoff.ru/${isin}x160.png`;
    }

    goTo(path: string[]): void {
        this.router.navigateByUrl(`localhost:4200/${path.join("/")}`);
    }
}
