import { HttpClient, HttpHandler } from "@angular/common/http";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MainApiService } from "./main-api.service";
import { of } from "rxjs";

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"],
    providers: [MainApiService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
    constructor(private mainApiService: MainApiService) {
        this.mainApiService.getApi().subscribe((data) => console.log(data));

        this.mainApiService.getLogoCompany("RU000A0D8MM8").subscribe();
    }

    item$ = of({
        name: "SBER",
        change: 15,
        isin: "RU0009029540",
        type: "stocks",
    });
}
