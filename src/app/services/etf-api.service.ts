import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class EtfApiService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    constructor(private http: HttpClient) {}

    getEtfs() {
        return this.http.get<any>(`${this.apiUrl}/etfs`);
    }
}
