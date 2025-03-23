import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAction } from "@app/components/user-rating/user-rating.component";

export interface IShortCollection {
    id: number;
    name: string;
    short_description: string;
    pic: string;
}

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

@Injectable({ providedIn: "root" })
export class CollectionService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    constructor(private http: HttpClient) {}

    getCollections() {
        return this.http.get<IShortCollection[]>(`${this.apiUrl}/collections/`);
    }

    getCollectionById(id: number) {
        return this.http.get<ICollection>(`${this.apiUrl}/collections/${id}/`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        });
    }
}
