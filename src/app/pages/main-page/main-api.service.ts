import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class MainApiService {
    private readonly apiUrl = "http://127.0.0.1:8000/api/";

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

    getLogoCompany(ISIN: string) {
        return this.http.get(
            `https://invest-brands.cdn-tinkoff.ru/${ISIN}x640.png`
        );
    }
}
