import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FavoriteService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    constructor(private http: HttpClient) {}

    toggleFavorite(id: string) {
        return this.http.post(`${this.apiUrl}/toggle_favourite/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        });
    }
}
