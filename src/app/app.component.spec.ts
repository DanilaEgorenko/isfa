import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AuthService } from "./services";
import { AppModule } from "./app.module";
import { APP_BASE_HREF } from "@angular/common";

describe("AppComponent", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let mockAuthService: { loadUserData: jest.Mock };

    beforeEach(async () => {
        mockAuthService = {
            loadUserData: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: APP_BASE_HREF, useValue: "/" },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should call authService.loadUserData on constructor", () => {
        expect(mockAuthService.loadUserData).toHaveBeenCalled();
    });

    it("should set isOnlineSubject to false when offline event is triggered", () => {
        component.ngOnInit();
        window.dispatchEvent(new Event("offline"));

        component.isOnline$.subscribe((value) => {
            expect(value).toBe(false);
        });
    });

    it("should set isOnlineSubject to true when online event is triggered", () => {
        component.ngOnInit();
        window.dispatchEvent(new Event("online"));

        component.isOnline$.subscribe((value) => {
            expect(value).toBe(true);
        });
    });
});
