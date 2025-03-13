import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICoinApiResponse } from "@app/interfaces";
import { IApiResponse } from "@app/pages/crypto-page/interfaces";
import { first, map, switchMap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class CryptoApiService {
    private readonly apiUrl = "http://127.0.0.1:8000/api/";

    constructor(private http: HttpClient) {}

    getCrypro(params?: { offset: number }) {
        return this.http.get<IApiResponse>(`${this.apiUrl}crypto/`, {
            params: { offset: params?.offset ?? 0 },
        });
    }

    getCryproByChange(orderDirection: "desc" | "asc") {
        return this.http.get<IApiResponse>(
            `${this.apiUrl}crypto/change/${orderDirection}/`
        );
    }

    getCryproById(id: string) {
        return this.http.get<ICoinApiResponse>(`${this.apiUrl}crypto/${id}/`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        });
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
