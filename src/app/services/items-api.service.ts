import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ItemsApiService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    private isErrorSubject = new BehaviorSubject<string | null>(null);
    isError$ = this.isErrorSubject.asObservable();

    constructor(private http: HttpClient) {}

    getItems(type: string) {
        this.isLoadingSubject.next(true);
        this.isErrorSubject.next(null);

        return this.http.get<any[]>(`${this.apiUrl}/${type}s`).pipe(
            catchError((e: HttpErrorResponse) => {
                this.isErrorSubject.next(e.message);

                return EMPTY;
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    getById(id: string) {
        this.isLoadingSubject.next(true);
        this.isErrorSubject.next(null);

        return this.http
            .get<any>(`${this.apiUrl}/item/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                },
            })
            .pipe(
                catchError((e: HttpErrorResponse) => {
                    this.isErrorSubject.next(e.message);

                    return EMPTY;
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }
}
