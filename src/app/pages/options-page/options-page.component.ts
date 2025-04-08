import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from "@angular/core";
import {
    FuturesApiService,
    HeaderDataService,
    OptionsApiService,
} from "@app/services";

@Component({
    selector: "app-options-page",
    templateUrl: "./options-page.component.html",
    styleUrls: ["./options-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsPageComponent implements OnDestroy {
    items$ = this.optionsApiService.getOptions();

    constructor(
        private optionsApiService: OptionsApiService,
        private headerDataService: HeaderDataService
    ) {
        this.headerDataService.updateData({ name: "Опционы" });
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
    }
}
