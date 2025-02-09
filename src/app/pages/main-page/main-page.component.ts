import { HttpClient, HttpHandler } from "@angular/common/http";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MainApiService } from "./main-api.service";

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"],
    providers: [MainApiService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
    constructor(private mainApiService: MainApiService) {
        this.mainApiService.getCrypro().subscribe((data) => console.log(data));

        this.mainApiService.getLogoCompany("RU000A0D8MM8").subscribe();
    }
}
