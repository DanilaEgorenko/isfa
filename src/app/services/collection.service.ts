import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAction } from "@app/components/user-rating/user-rating.component";
import { BehaviorSubject, EMPTY } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

export interface IShortCollection {
    id: number;
    name: string;
    short_description: string;
    pic: string;
}

export interface ICollection {
    id: number;
    name: string;
    description: string;
    short_description: string;
    pic: string;
    color: string | null;
    retail_trand: number;
    human_trand_up: number;
    human_trand_down: number;
    user_action: UserAction;
    items: any[];
    comments: any[];
}

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
