import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderDataService, ItemsApiService } from "@app/services";

const NAMES = {
    share: "Акции",
    etf: "Паи",
    bond: "Облигации",
    future: "Фьючерсы",
    option: "Опционы",
};

@Component({
    selector: "app-items-page",
    templateUrl: "./items-page.component.html",
    styleUrls: ["./items-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsPageComponent implements OnDestroy {
    type = this.router.url.split("/")[1];
    items$ = this.itemsApiService.getItems(this.type);

    constructor(
        private itemsApiService: ItemsApiService,
        private headerDataService: HeaderDataService,
        private router: Router
    ) {
        this.headerDataService.updateData({ name: NAMES[this.type] });
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
    }
}
