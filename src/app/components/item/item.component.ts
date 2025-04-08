import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
} from "@angular/core";
import { IItem } from "@app/interfaces";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
    @Input() item: IItem & { wrappedColor?: boolean };

    getLogo(item: IItem): string {
        if (item.type === "crypto") return item.logo;
        if (item.logo === "test.png") return null;

        return `https://invest-brands.cdn-tinkoff.ru/${
            item.logo.split(".")[0]
        }x160.png`;
    }
}
