import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";

@Injectable()
export class ProfileService {
    private apiUrl = "http://127.0.0.1:8000/api";

    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    private isErrorSubject = new BehaviorSubject<string | null>(null);
    isError$ = this.isErrorSubject.asObservable();

    constructor(private http: HttpClient) {}

    getData(id: number): Observable<any> {
        this.isLoadingSubject.next(true);
        this.isErrorSubject.next(null);

        return this.http.get(`${this.apiUrl}/user/${id}/`).pipe(
            catchError((e: HttpErrorResponse) => {
                this.isErrorSubject.next(e.message);

                return EMPTY;
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }
}
