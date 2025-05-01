import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY } from "rxjs";
import { catchError, delay, finalize } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PredictionService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    private isErrorSubject = new BehaviorSubject<string | null>(null);
    isError$ = this.isErrorSubject.asObservable();

    constructor(private http: HttpClient) {}

    getPrediction(body: any) {
        this.isLoadingSubject.next(true);
        this.isErrorSubject.next(null);

        return this.http
            .post<any>(`${this.apiUrl}/predict_price/`, body, {})
            .pipe(
                catchError((e: HttpErrorResponse) => {
                    this.isErrorSubject.next(e.message);

                    return EMPTY;
                }),
                delay(3000), // this is for magic =)
                finalize(() => this.isLoadingSubject.next(false))
            );
    }
}
