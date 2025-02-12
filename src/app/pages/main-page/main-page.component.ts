import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MainApiService } from "./main-api.service";
import { of } from "rxjs";
import { map } from "rxjs/operators";

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
    constructor(private mainApiService: MainApiService) {
        //this.mainApiService.getLogoCompany("RU000A0D8MM8").subscribe();
    }

    item$ = of({
        name: "SBER",
        change: 15,
        isin: "RU0009029540",
        type: "stocks",
    });
}
