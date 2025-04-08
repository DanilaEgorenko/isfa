import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { HeaderDataService, SharesApiService } from "@app/services";

@Component({
    selector: "app-shares-page",
    templateUrl: "./shares-page.component.html",
    styleUrls: ["./shares-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharesPageComponent implements OnDestroy {
    items$ = this.sharesApiService.getShares();

    constructor(
        private sharesApiService: SharesApiService,
        private headerDataService: HeaderDataService
    ) {
        this.headerDataService.updateData({ name: "Акции" });
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
    }
}
