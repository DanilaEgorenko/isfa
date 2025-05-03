import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAction } from "@app/types";

@Injectable({ providedIn: "root" })
export class UserRatingApiService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    constructor(private http: HttpClient) {}

    vote(id: string, action: UserAction, type: "collections" | "items") {
        return this.http.post(
            `${this.apiUrl}/${type}/${id}/vote/`,
            { action },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                },
            }
        );
    }
}
