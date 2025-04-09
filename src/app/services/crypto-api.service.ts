import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICoinApiResponse } from "@app/interfaces";
import { IApiResponse } from "@app/pages/crypto-page/interfaces";
import { BehaviorSubject, EMPTY } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CryptoApiService {
    private readonly apiUrl = "http://127.0.0.1:8000/api/";

    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    private isErrorSubject = new BehaviorSubject<string | null>(null);
    isError$ = this.isErrorSubject.asObservable();

    constructor(private http: HttpClient) {}

    getCrypro(params?: { offset: number }) {
        this.isLoadingSubject.next(true);
        this.isErrorSubject.next(null);

        return this.http
            .get<IApiResponse>(`${this.apiUrl}crypto/`, {
                params: { offset: params?.offset ?? 0 },
            })
            .pipe(
                catchError((e: HttpErrorResponse) => {
                    this.isErrorSubject.next(e.message);

                    return EMPTY;
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    getCryproByChange(orderDirection: "desc" | "asc") {
        return this.http.get<IApiResponse>(
            `${this.apiUrl}crypto/change/${orderDirection}/`
        );
    }

    getById(id: string) {
        this.isLoadingSubject.next(true);
        this.isErrorSubject.next(null);

        return this.http
            .get<ICoinApiResponse>(`${this.apiUrl}crypto/${id}/`, {
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

    getCryptoHistory() {
        return this.http.get(
            "https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/history"
        );
    }

    getCryptoSymbol(name: string) {
        return this.http
            .get<any>(
                `https://api.coinranking.com/v2/search-suggestions?query=${name}`
            )
            .pipe(
                map((res) => ({
                    prefix: res?.data.markets?.[0].exchangeName,
                    symbol: res?.data.markets?.[0].baseSymbol,
                }))
            );
    }
}
