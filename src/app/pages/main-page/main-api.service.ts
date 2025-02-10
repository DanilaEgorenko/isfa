import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class MainApiService {
    constructor(private http: HttpClient) {}

    getApi() {
        return this.http.get(
            "http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/dates"
            // "http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities.json?iss.json=extended&iss.data=on"
        );
        //markets/shares - stocks and etfs
        //market/bonds - bonds
    }

    getCrypro() {
        return this.http.get("https://api.coinranking.com/v2/coins?limit=100");
    }

    getLogoCompany(ISIN: string) {
        return this.http.get(
            `https://invest-brands.cdn-tinkoff.ru/${ISIN}x640.png`
        );
    }
}
