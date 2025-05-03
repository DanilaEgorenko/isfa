import { EMarketTrand } from "@app/pages/crypto-item-page/enums";
import { ICoin } from "./coin";
import { UserAction } from "@app/types";

export interface ICoinApiResponse {
    status: string;
    coin: ICoin;
    favourite: boolean;
    retail_trand: EMarketTrand;
    human_trand_up: number;
    human_trand_down: number;
    user_action: UserAction;
    comments: any[];
    virtual_stock: {
        value: number;
        count: number;
        id: number;
    };
}
