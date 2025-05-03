import { UserAction } from "@app/types";

export interface ICollection {
    id: number;
    name: string;
    description: string;
    short_description: string;
    pic: string;
    color: string | null;
    retail_trand: number;
    human_trand_up: number;
    human_trand_down: number;
    user_action: UserAction;
    items: any[];
    comments: any[];
}
