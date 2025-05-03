import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { UserRatingComponent } from "./user-rating.component";
import { UserRatingModule } from "./user-rating.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("UserRatingComponent", () => {
    let component: UserRatingComponent;
    let fixture: ComponentFixture<UserRatingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                UserRatingModule,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserRatingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Создаёт компонент", () => {
        expect(component).toBeDefined();
    });
});
