import { TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { CommentsService } from "./comments.service";

describe("CommentsService", () => {
    let service: CommentsService;
    let httpMock: HttpTestingController;

    const apiUrl = "http://127.0.0.1:8000/api";

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CommentsService],
        });

        service = TestBed.inject(CommentsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should send POST request to add a comment", () => {
        const commentBody = { content: "Test comment", collection_id: 1 };
        sessionStorage.setItem("access", "dummy-token");

        service.addComment(commentBody).subscribe((response) => {
            expect(response).toEqual({ success: true });
        });

        const req = httpMock.expectOne(`${apiUrl}/add_comment/`);
        expect(req.request.method).toBe("POST");
        expect(req.request.headers.get("Authorization")).toBe(
            "Bearer dummy-token"
        );
        expect(req.request.body).toEqual(commentBody);

        req.flush({ success: true });
    });

    it("should send DELETE request to remove a comment", () => {
        const commentId = 123;

        service.removeComment(commentId).subscribe((response) => {
            expect(response).toEqual({ deleted: true });
        });

        const req = httpMock.expectOne(
            `${apiUrl}/delete_comment/${commentId}/`
        );
        expect(req.request.method).toBe("DELETE");

        req.flush({ deleted: true });
    });

    it("should send GET request to fetch comments", () => {
        const id = 5;
        const type = "collection";
        const mockComments = { comments: [{ id: 1, text: "Nice!" }] };

        service.getComments(id, type).subscribe((response) => {
            expect(response).toEqual(mockComments);
        });

        const req = httpMock.expectOne(
            `${apiUrl}/comments?type=collection&id=5`
        );
        expect(req.request.method).toBe("GET");

        req.flush(mockComments);
    });
});
