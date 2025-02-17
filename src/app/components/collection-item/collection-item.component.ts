import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "app-collection-item",
    templateUrl: "./collection-item.component.html",
    styleUrls: ["./collection-item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionItemComponent {
    @Input() collection: any;
}
