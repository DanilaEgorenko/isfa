import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserRatingComponent } from "./user-rating.component";
import { AuthService } from "@app/services/auth.service";
import { DestroyService } from "@app/services/destroy.service";
import { of } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";
import { UserRatingModule } from "./user-rating.module";
import { UserRatingApiService } from "@app/services";
import { RouterTestingModule } from "@angular/router/testing";
import { CommonModule } from "@angular/common";

describe("UserRatingComponent", () => {
    let component: UserRatingComponent;
    let fixture: ComponentFixture<UserRatingComponent>;
    let userRatingApiService: jest.Mocked<UserRatingApiService>;
    let cdr: ChangeDetectorRef;

    beforeEach(async () => {
        const userRatingApiServiceMock: jest.Mocked<UserRatingApiService> = {
            vote: jest.fn().mockReturnValue(of({})),
        } as any;

        await TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule],
            declarations: [UserRatingComponent],
            providers: [
                DestroyService,
                {
                    provide: UserRatingApiService,
                    useValue: userRatingApiServiceMock,
                },
                {
                    provide: AuthService,
                    useValue: { userData$: of({ id: 1 }) },
                },
                {
                    provide: ChangeDetectorRef,
                    useValue: { detectChanges: jest.fn() },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserRatingComponent);
        component = fixture.componentInstance;
        userRatingApiService = TestBed.inject(
            UserRatingApiService
        ) as jest.Mocked<UserRatingApiService>;
        cdr = TestBed.inject(ChangeDetectorRef);

        component.humanTrand = { up: 3, down: 2 };
        component.userAction = "none";
        component.id = "123";
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should return correct percentage from getPercentages()", () => {
        const percent = component.getPercentages(3);
        expect(percent).toBeCloseTo(60);
    });

    it("should upvote and update state", () => {
        component.vote("up");
        expect(userRatingApiService.vote).toHaveBeenCalledWith(
            "123",
            "up",
            "collections"
        );
    });

    it("should switch from up to down vote", () => {
        component.userAction = "up";
        component.humanTrand = { up: 3, down: 2 };

        component.vote("down");

        expect(userRatingApiService.vote).toHaveBeenCalledWith(
            "123",
            "down",
            "collections"
        );
    });

    it("should toggle vote off when voting same again", () => {
        component.userAction = "up";
        component.humanTrand = { up: 3, down: 2 };

        userRatingApiService.vote.mockReturnValue(of({}));

        component.vote("up");

        expect(userRatingApiService.vote).toHaveBeenCalled();
    });
});
