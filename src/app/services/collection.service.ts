import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { delay, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CollectionService {
    getCollections() {
        return of([
            {
                name: "Крупнейшие криптовалюты",
                short_description: "Существуют не первый год",
                description:
                    "Я крутой аналитик и меня надо слушаться, кто меня не будет слушать, упустит момент и не сможет круто заработать. А ты ведь хочешь заработать? Знаю, что хочешь, так что слушайся маму и кушай кашу",
                id: 1,
                pic: "https://www.t4trade.com/wp-content/uploads/2023/10/digital-currency-bitcoin-ethereum.png",
                items: [
                    {
                        uuid: "Qwsogvtv82FCd",
                        symbol: "BTC",
                        name: "Bitcoin",
                        color: "#f7931A",
                        iconUrl:
                            "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
                        marketCap: "1890546725345",
                        price: "95358.58179267512",
                        change: "-1.58",
                    },
                    {
                        uuid: "razxDUgYGNAdQ",
                        symbol: "ETH",
                        name: "Ethereum",
                        color: "#3C3C3D",
                        iconUrl:
                            "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
                        marketCap: "326461769767",
                        price: "2708.0428825384392",
                        change: "1.09",
                    },
                    {
                        uuid: "zNZHO_Sjf",
                        symbol: "SOL",
                        name: "Solana",
                        color: "#000",
                        iconUrl:
                            "https://cdn.coinranking.com/yvUG4Qex5/solana.svg",
                        marketCap: "85896860138",
                        price: "175.8779270489021",
                        change: "-7.19",
                    },
                ],
            },
            {
                name: "Крупнейшие криптовалюты",
                short_description: "Существуют не первый год",
                description:
                    "Я крутой аналитик и меня надо слушаться, кто меня не будет слушать, упустит момент и не сможет круто заработать. А ты ведь хочешь заработать? Знаю, что хочешь, так что слушайся маму и кушай кашу",
                id: 2,
                pic: "https://www.t4trade.com/wp-content/uploads/2023/10/digital-currency-bitcoin-ethereum.png",
                items: [
                    {
                        uuid: "Qwsogvtv82FCd",
                        symbol: "BTC",
                        name: "Bitcoin",
                        color: "#f7931A",
                        iconUrl:
                            "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
                        marketCap: "1890546725345",
                        price: "95358.58179267512",
                        change: "-1.58",
                    },
                    {
                        uuid: "razxDUgYGNAdQ",
                        symbol: "ETH",
                        name: "Ethereum",
                        color: "#3C3C3D",
                        iconUrl:
                            "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
                        marketCap: "326461769767",
                        price: "2708.0428825384392",
                        change: "1.09",
                    },
                    {
                        uuid: "zNZHO_Sjf",
                        symbol: "SOL",
                        name: "Solana",
                        color: "#000",
                        iconUrl:
                            "https://cdn.coinranking.com/yvUG4Qex5/solana.svg",
                        marketCap: "85896860138",
                        price: "175.8779270489021",
                        change: "-7.19",
                    },
                ],
            },
        ]).pipe(delay(500));
    }

    getCollectionById(id: number) {
        return this.getCollections().pipe(
            map((res) => res.find((el) => el.id === id))
        );
    }
}
