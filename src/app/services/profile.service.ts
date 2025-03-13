import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";

@Injectable()
export class ProfileService {
    private apiUrl = "http://127.0.0.1:8000/api";

    isLoading$ = new BehaviorSubject(false);

    constructor(private http: HttpClient) {}

    getData(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/user/${id}/`).pipe(
            tap(() => this.isLoading$.next(true)),
            finalize(() => this.isLoading$.next(false))
        );
    }
}
