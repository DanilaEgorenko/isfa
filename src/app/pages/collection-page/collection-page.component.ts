import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CollectionService, HeaderDataService } from "@app/services";
import { tap } from "rxjs/operators";

@Component({
    selector: "app-collection-page",
    templateUrl: "./collection-page.component.html",
    styleUrls: ["./collection-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPageComponent implements OnDestroy {
    readonly id = Number(this.route.snapshot.paramMap.get("id"));

    collection$ = this.collectionService.getCollectionById(this.id).pipe(
        tap((collection) => {
            this.headerDataService.updateData({ name: collection.name });
        })
    );

    constructor(
        private collectionService: CollectionService,
        private headerDataService: HeaderDataService,
        private route: ActivatedRoute
    ) {}

    ngOnDestroy(): void {
        this.headerDataService.updateData(null);
    }
}
