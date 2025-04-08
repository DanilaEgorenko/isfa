import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { EtfApiService, HeaderDataService } from "@app/services";
import { map } from "rxjs/operators";

@Component({
    selector: "app-etf-page",
    templateUrl: "./etf-page.component.html",
    styleUrls: ["./etf-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EtfPageComponent implements OnDestroy {
    search = "";

    items$ = this.etfsApiService.getEtfs();

    constructor(
        private etfsApiService: EtfApiService,
        private headerDataService: HeaderDataService
    ) {
        this.headerDataService.updateData({ name: "Паи" });
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
    }
}
