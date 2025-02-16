import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class HeaderDataService {
    private dataSubject = new BehaviorSubject<any>(null);
    public data$ = this.dataSubject.asObservable();

    updateData(newData: any) {
        this.dataSubject.next(newData);
    }
}
