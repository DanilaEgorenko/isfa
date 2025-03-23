import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CommentsService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    constructor(private http: HttpClient) {}

    addComment(body: any) {
        return this.http.post(`${this.apiUrl}/add_comment/`, body, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        });
    }

    removeComment(id: number) {
        return this.http.delete(`${this.apiUrl}/delete_comment/${id}/`);
    }

    getComments(id: number | string, type: "collection" | "item") {
        return this.http.get<{ comments: any[] }>(
            `${this.apiUrl}/comments?type=${type}&id=${id}`
        );
    }
}
