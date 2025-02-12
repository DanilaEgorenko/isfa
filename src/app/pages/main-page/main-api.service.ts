import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IApiResponse } from "../crypto-page/interfaces";

@Injectable({ providedIn: "root" })
export class MainApiService {
    constructor(private http: HttpClient) {}

    getApi() {
        // return this.http.get(
        //     "http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/dates"
        //     // "http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities.json?iss.json=extended&iss.data=on"
        // );
        //markets/shares - stocks and etfs
        //market/bonds - bonds
        // return this.http.request(
        //     "POST",
        //     "https://sandbox-invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetLastPrices",
        //     {
        //         body: {
        //             instrumentId: ["MOEX"],
        //         },
        //     }
        // );
    }

    getCrypro(params?: { offset: number }) {
        return this.http.get<IApiResponse>(
            `https://api.coinranking.com/v2/coins?limit=40&offset=${
                params?.offset ?? 0
            }`
        );
    }

    getCryproByChange(orderDirection: "desc" | "asc") {
        return this.http.get<IApiResponse>(
            `https://api.coinranking.com/v2/coins?limit=10&orderBy=change&orderDirection=${orderDirection}`
        );
    }

    getLogoCompany(ISIN: string) {
        return this.http.get(
            `https://invest-brands.cdn-tinkoff.ru/${ISIN}x640.png`
        );
    }
}
