import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IItem } from "@app/interfaces";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
    @Input() item: IItem & { wrappedColor?: boolean };

    getLogo(isin: string): string {
        return `https://invest-brands.cdn-tinkoff.ru/${isin}x160.png`;
    }
}
