import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
    ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
