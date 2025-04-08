import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from "@angular/core";
import {
    EtfApiService,
    FuturesApiService,
    HeaderDataService,
} from "@app/services";

@Component({
    selector: "app-futures-page",
    templateUrl: "./futures-page.component.html",
    styleUrls: ["./futures-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuturesPageComponent implements OnDestroy {
    items$ = this.futuresApiService.getFutures();

    constructor(
        private futuresApiService: FuturesApiService,
        private headerDataService: HeaderDataService
    ) {
        this.headerDataService.updateData({ name: "Фьючерсы" });
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
    }
}
