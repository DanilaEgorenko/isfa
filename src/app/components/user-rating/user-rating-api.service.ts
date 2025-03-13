import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAction } from "./user-rating.component";

@Injectable({ providedIn: "root" })
export class UserRatingApiService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    constructor(private http: HttpClient) {}

    vote(id: string, action: UserAction) {
        return this.http.post(
            `${this.apiUrl}/items/${id}/vote/`,
            { action },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                },
            }
        );
    }
}
