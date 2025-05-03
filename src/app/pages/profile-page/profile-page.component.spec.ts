import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfilePageComponent } from "./profile-page.component";
import { ProfileService } from "@app/services/profile.service";
import { AuthService } from "@app/services/auth.service";
import { DestroyService } from "@app/services";
import { ActivatedRoute, Router } from "@angular/router";
import { of, Subject } from "rxjs";
import { ProfilePageModule } from "./profile-page.module";

describe("ProfilePageComponent", () => {
    let component: ProfilePageComponent;
    let fixture: ComponentFixture<ProfilePageComponent>;
    let router: Router;
    let authService: any;
    let destroy$: Subject<void>;

    const mockProfileService = {
        getData: jest.fn(),
        isLoading$: of(false),
        isError$: of(false),
    };

    const mockAuthService = {
        userData$: of({ id: 1 }),
        logout: jest.fn(),
    };

    const mockActivatedRoute = {
        snapshot: {
            paramMap: {
                get: jest.fn().mockReturnValue("1"),
            },
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfilePageModule],
            providers: [
                { provide: ProfileService, useValue: mockProfileService },
                { provide: AuthService, useValue: mockAuthService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: DestroyService, useValue: new Subject<void>() },
                {
                    provide: Router,
                    useValue: {
                        navigateByUrl: jest.fn(),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilePageComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        authService = TestBed.inject(AuthService);
        destroy$ = TestBed.inject(DestroyService) as unknown as Subject<void>;
        fixture.detectChanges();
    });

    it("should create component", () => {
        expect(component).toBeTruthy();
    });

    it("should call getData with correct id", () => {
        expect(mockProfileService.getData).toHaveBeenCalledWith(1);
    });

    it("should determine if profile is mine", (done) => {
        component.isMineProdile$.subscribe((res) => {
            expect(res).toBe(true);
            done();
        });
    });

    it("should logout and navigate to '/'", () => {
        const logoutSubject = new Subject<void>();
        mockAuthService.logout.mockReturnValue(logoutSubject.asObservable());

        component.logout();
        logoutSubject.next();
        logoutSubject.complete();

        expect(mockAuthService.logout).toHaveBeenCalled();
        expect(router.navigateByUrl).toHaveBeenCalledWith("/");
    });

    it("should calculate virtual stock value correctly", () => {
        const arr = [
            { count: 2, value: 100 },
            { count: 1, value: 200 },
        ];
        const result = component.getVirtualStockValue(arr);
        expect(result).toBe(400);
    });

    it("should calculate virtual price difference correctly", () => {
        const diff = component.getDiffVirtualPrice(200, 150);
        expect(diff).toBe(25);
    });

    it("should return 0 diff if nowPrice is 0", () => {
        const diff = component.getDiffVirtualPrice(0, 150);
        expect(diff).toBe(0);
    });
});
