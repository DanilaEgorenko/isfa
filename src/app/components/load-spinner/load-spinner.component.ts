import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
    selector: "app-load-spinner",
    templateUrl: "./load-spinner.component.html",
    styleUrls: ["./load-spinner.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadSpinnerComponent {
    @Input() isLoading: boolean;
    @Input() error: string;
}
