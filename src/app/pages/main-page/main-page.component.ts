import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CollectionService, CryptoApiService } from "@app/services";
import { map } from "rxjs/operators";

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"],
    providers: [CryptoApiService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
    topLowest$ = this.cryptoApiService
        .getCryproByChange("asc")
        .pipe(map((res) => res.data.coins));

    topHighest$ = this.cryptoApiService
        .getCryproByChange("desc")
        .pipe(map((res) => res.data.coins));

    collections$ = this.collectionService.getCollections();

    constructor(
        private cryptoApiService: CryptoApiService,
        private collectionService: CollectionService
    ) {}
}
