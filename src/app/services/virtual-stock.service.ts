import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class VirtualStockService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    constructor(private http: HttpClient) {}

    manageVirtualStock(
        item_id: string,
        quantity: number,
        type: "add" | "remove",
        price_per_unit?: number
    ) {
        return this.http.post(
            `${this.apiUrl}/manage_virtual_portfolio`,
            {
                item_id,
                quantity,
                type,
                price_per_unit,
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                },
            }
        );
    }
}
