import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommentsComponent } from "./comments.component";
import { of } from "rxjs";
import { CommentsService, AuthService, DestroyService } from "@app/services";
import { By } from "@angular/platform-browser";
import { ChangeDetectorRef } from "@angular/core";
import { CommentsModule } from "./comments.module";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

describe("CommentsComponent", () => {
    let component: CommentsComponent;
    let fixture: ComponentFixture<CommentsComponent>;

    const mockCommentsService = {
        getComments: jest.fn(),
        addComment: jest.fn(),
        removeComment: jest.fn(),
    };

    const mockAuthService = {
        userData$: of({ id: 1, username: "Test User", avatar: "avatar.jpg" }),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, RouterTestingModule],
            providers: [
                DestroyService,
                { provide: CommentsService, useValue: mockCommentsService },
                { provide: AuthService, useValue: mockAuthService },
                ChangeDetectorRef,
            ],
            declarations: [CommentsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CommentsComponent);
        component = fixture.componentInstance;
        component.id = "1";
        component.type = "item";
        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should call loadComments on init", () => {
        jest.spyOn(component, "loadComments");
        component.ngOnInit();
        expect(component.loadComments).toHaveBeenCalled();
    });

    it("should load comments correctly", () => {
        mockCommentsService.getComments.mockReturnValue(
            of({
                comments: [
                    {
                        id: 1,
                        text: "Test comment",
                        date: "2023-01-01",
                        author: {
                            id: 1,
                            username: "Test User",
                            avatar: "avatar.jpg",
                        },
                    },
                ],
            })
        );
        component.loadComments();
        fixture.detectChanges();
        const commentElement = fixture.debugElement.query(By.css(".comment"));
        expect(commentElement.nativeElement.textContent).toContain(
            "Test comment"
        );
    });

    it("should update char count on comment input", () => {
        component.comment = "Hello world";
        component.updateCharCount();
        expect(component.charCount).toBe(11);
    });

    it("should submit a comment", () => {
        const commentText = "New comment";
        component.comment = commentText;
        mockCommentsService.addComment.mockReturnValue(of({}));
        const loadCommentsSpy = jest.spyOn(component, "loadComments");

        component.submitComment();

        expect(mockCommentsService.addComment).toHaveBeenCalledWith({
            text: commentText,
            item_id: null,
            collection_id: "1",
        });
        expect(component.comment).toBe("");
        expect(component.charCount).toBe(0);
        expect(loadCommentsSpy).toHaveBeenCalled();
    });

    it("should not submit an empty comment", () => {
        component.comment = "";
        const alertSpy = jest.spyOn(window, "alert").mockImplementation();

        component.submitComment();

        expect(alertSpy).toHaveBeenCalledWith(
            "Комментарий не может быть пустым!"
        );
    });

    it("should delete a comment", () => {
        const commentId = 1;
        mockCommentsService.removeComment.mockReturnValue(of({}));
        const loadCommentsSpy = jest.spyOn(component, "loadComments");

        component.deleteComment(commentId);

        expect(mockCommentsService.removeComment).toHaveBeenCalledWith(
            commentId
        );
        expect(loadCommentsSpy).toHaveBeenCalled();
    });

    it("should check if the user is the author", (done) => {
        const authorId = 1;
        component.isAuthor$(authorId).subscribe((isAuthor) => {
            expect(isAuthor).toBe(true);
            done();
        });
    });
});
