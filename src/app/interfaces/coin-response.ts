import { ICoin } from "./coin";

export interface ICoinApiResponse {
    status: string;
    data: {
        coin: ICoin;
    };
}
