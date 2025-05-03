import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICollection, IShortCollection } from "@app/interfaces";
import { BehaviorSubject, EMPTY } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CollectionService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    private isErrorSubject = new BehaviorSubject<string | null>(null);
    isError$ = this.isErrorSubject.asObservable();

    constructor(private http: HttpClient) {}

    getCollections() {
        this.isLoadingSubject.next(true);
        this.isErrorSubject.next(null);

        return this.http
            .get<IShortCollection[]>(`${this.apiUrl}/collections/`)
            .pipe(
                catchError((e: HttpErrorResponse) => {
                    this.isErrorSubject.next(e.message);

                    return EMPTY;
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    getCollectionById(id: number) {
        this.isLoadingSubject.next(true);
        this.isErrorSubject.next(null);

        return this.http
            .get<ICollection>(`${this.apiUrl}/collections/${id}/`, {
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
