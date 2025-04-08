import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from "@angular/core";
import {
    BondsApiService,
    EtfApiService,
    HeaderDataService,
} from "@app/services";

@Component({
    selector: "app-bonds-page",
    templateUrl: "./bonds-page.component.html",
    styleUrls: ["./bonds-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BondsPageComponent implements OnDestroy {
    items$ = this.bondsApiService.getBonds();

    constructor(
        private bondsApiService: BondsApiService,
        private headerDataService: HeaderDataService
    ) {
        this.headerDataService.updateData({ name: "Облигации" });
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
    }
}
