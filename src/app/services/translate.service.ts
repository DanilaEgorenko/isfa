import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class TranslateService {
    constructor(private http: HttpClient) {}

    translate(text: string): Observable<string> {
        return this.http
            .get(
                `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=ru&q=${text}`
            )
            .pipe(map((res) => res?.[0]?.[0]));
    }
}
