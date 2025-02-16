import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IApiResponse } from "../crypto-page/interfaces";
import { ICoinApiResponse } from "../crypto-item-page/interfaces";
import { map } from "rxjs/operators";

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

    getCryproById(id: string) {
        return this.http.get<ICoinApiResponse>(
            `https://api.coinranking.com/v2/coin/${id}`
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

    getLogoCompany(ISIN: string) {
        return this.http.get(
            `https://invest-brands.cdn-tinkoff.ru/${ISIN}x640.png`
        );
    }
}
