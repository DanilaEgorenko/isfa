import { IAllTimeHigh } from "./all-time-high";
import { ILink } from "./link";
import { ISupply } from "./supply";

export interface ICoin {
    uuid: string;
    symbol: string;
    name: string;
    description: string;
    color: string;
    iconUrl: string;
    websiteUrl: string;
    links: ILink[];
    supply: ISupply;
    numberOfMarkets: number;
    numberOfExchanges: number;
    "24hVolume": string;
    marketCap: string;
    fullyDilutedMarketCap: string;
    price: string;
    btcPrice: string;
    priceAt: number;
    change: string;
    rank: number;
    sparkline: (string | null)[];
    allTimeHigh: IAllTimeHigh;
    coinrankingUrl: string;
    tier: number;
    lowVolume: boolean;
    listedAt: number;
    hasContent: boolean;
    notices: null;
    contractAddresses: string[];
    tags: string[];
}
