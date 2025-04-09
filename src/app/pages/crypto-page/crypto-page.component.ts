import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { DestroyService } from "@app/services/destroy.service";
import { BehaviorSubject, combineLatest } from "rxjs";
import { first, map, takeUntil, throttleTime } from "rxjs/operators";
import { CryptoApiService, HeaderDataService } from "@app/services";

@Component({
    selector: "app-crypto-page",
    templateUrl: "./crypto-page.component.html",
    styleUrls: ["./crypto-page.component.scss"],
    providers: [CryptoApiService, DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoPageComponent implements OnInit {
    isLoading$ = this.cryptoApiService.isLoading$;
    isError$ = this.cryptoApiService.isError$;
    items$ = new BehaviorSubject([]);
    page = 1;

    constructor(
        private cryptoApiService: CryptoApiService,
        private headerDataService: HeaderDataService,
        private destroy$: DestroyService
    ) {
        this.headerDataService.updateData({ name: "Криптовалюта" });
    }

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
    }

    ngOnInit(): void {
        this.cryptoApiService
            .getCrypro()
            .pipe(
                map((res) => this.items$.next(res.data.coins)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    loadMore() {
        combineLatest([
            this.cryptoApiService.getCrypro({ offset: this.page * 50 }),
            this.items$.pipe(first()),
        ])
            .pipe(throttleTime(1000), takeUntil(this.destroy$))
            .subscribe(([res, items]) => {
                console.log(res, items);
                this.items$.next([...items, ...res.data.coins]);
                this.page++;
                console.log(this.page);
            });
    }
}
