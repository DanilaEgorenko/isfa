import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CollectionService } from "@app/services";
import { map } from "rxjs/operators";
import { MainApiService } from "./main-api.service";

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"],
    providers: [MainApiService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
    topLowest$ = this.mainApiService
        .getCryproByChange("asc")
        .pipe(map((res) => res.data.coins));

    topHighest$ = this.mainApiService
        .getCryproByChange("desc")
        .pipe(map((res) => res.data.coins));

    collections$ = this.collectionService.getCollections();

    constructor(
        private mainApiService: MainApiService,
        private collectionService: CollectionService
    ) {
        //this.mainApiService.getLogoCompany("RU000A0D8MM8").subscribe();
    }
}
