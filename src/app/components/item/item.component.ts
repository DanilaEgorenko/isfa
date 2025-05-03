import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IItem } from "@app/interfaces";
import { getLogo } from "@app/utils";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
    readonly getLogo = getLogo;
    @Input() item: IItem & { wrappedColor?: boolean };
}
