import { ICoin } from "./coin";
import { ICoinStats } from "./coin-stats";

export interface IApiResponse {
    status: string;
    data: {
        stats: ICoinStats;
        coins: ICoin[];
    };
}
