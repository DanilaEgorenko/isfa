import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ItemsApiService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    constructor(private http: HttpClient) {}

    getItems(type: string) {
        return this.http.get<any[]>(`${this.apiUrl}/${type}s`);
    }

    getById(id: string) {
        return this.http.get<any>(`${this.apiUrl}/share/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        });
    }
}
