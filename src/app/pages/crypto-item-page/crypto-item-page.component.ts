import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MainApiService } from "../main-page/main-api.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
    selector: "app-crypto-item-page",
    templateUrl: "./crypto-item-page.component.html",
    styleUrls: ["./crypto-item-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoItemPageComponent {
    readonly id = this.route.snapshot.paramMap.get("id");

    item$ = this.mainApiService
        .getCryproById(this.id)
        .pipe(map((res) => res.data.coin));

    constructor(
        private mainApiService: MainApiService,
        private route: ActivatedRoute
    ) {}
}
