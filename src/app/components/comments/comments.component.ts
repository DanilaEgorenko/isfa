import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    ChangeDetectorRef,
} from "@angular/core";
import { AuthService, CommentsService, DestroyService } from "@app/services";
import { Observable, of } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

export interface IComment {
    id: number;
    text: string;
    date: string;
    author: {
        id: number;
        username: string;
        avatar: string;
    };
}

@Component({
    selector: "app-comments",
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.scss"],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
    charCount: number = 0;
    comment: string = "";

    @Input() id: string | number;
    @Input() type: "collection" | "item";

    comments$ = of([]);
    userId$ = this.authService.userData$.pipe(map(({ id }) => id));

    constructor(
        private authService: AuthService,
        private commentsService: CommentsService,
        private cdr: ChangeDetectorRef,
        private destroy$: DestroyService
    ) {}

    ngOnInit(): void {
        this.loadComments();
    }

    loadComments() {
        this.comments$ = this.commentsService
            .getComments(this.id, this.type)
            .pipe(map((el) => el.comments));
    }

    updateCharCount(): void {
        this.charCount = this.comment.length;
    }

    submitComment(): void {
        if (this.comment.trim().length === 0) {
            alert("Комментарий не может быть пустым!");
            return;
        }

        if (this.comment.length > 500) {
            alert("Комментарий слишком длинный!");
            return;
        }

        this.commentsService
            .addComment({
                text: this.comment,
                item_id: this.type === "item" ? this.id : null,
                collection_id: this.type === "collection" ? this.id : null,
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.comment = "";
                this.charCount = 0;
                this.loadComments();
                this.cdr.detectChanges();
            });
    }

    isAuthor$(authorId: number): Observable<boolean> {
        return this.userId$.pipe(map((id) => id === authorId));
    }

    deleteComment(id: number): void {
        this.commentsService
            .removeComment(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.loadComments();
                this.cdr.detectChanges();
            });
    }
}
