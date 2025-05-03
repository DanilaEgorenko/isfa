import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from "@angular/core/testing";
import { EditPageComponent } from "./edit-page.component";
import { AuthService, ProfileService, DestroyService } from "@app/services";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EditPageModule } from "./edit-page.module";

describe("EditPageComponent", () => {
    let component: EditPageComponent;
    let fixture: ComponentFixture<EditPageComponent>;
    let authService: AuthService;
    let profileService: ProfileService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, EditPageModule],
            providers: [
                AuthService,
                ProfileService,
                DestroyService,
                {
                    provide: Router,
                    useValue: { navigateByUrl: jest.fn() },
                },
                {
                    provide: ProfileService,
                    useValue: {
                        getData: jest.fn().mockReturnValue(
                            of({
                                status: "Active",
                                name: "User",
                                pic: "pic.jpg",
                            })
                        ),
                        isLoading$: of(false),
                        isError$: of(false),
                    },
                },
                {
                    provide: AuthService,
                    useValue: {
                        userData$: of({ id: "123" }),
                        edit: jest.fn().mockReturnValue(of({})),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditPageComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        profileService = TestBed.inject(ProfileService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should initialize form with user data", fakeAsync(() => {
        component.profileInfo$.subscribe(() => {
            expect(component.formGroup.get("status").value).toBe("Active");
            expect(component.formGroup.get("name").value).toBe("User");
            expect(component.formGroup.get("pic").value).toBe("pic.jpg");
        });

        tick();
    }));

    it("should send form data when edit button is clicked", fakeAsync(() => {
        component.formGroup.setValue({
            status: "Inactive",
            name: "New User",
            pic: "new-pic.jpg",
        });

        component.sendEditData();
        tick(); // Wait for async operations

        expect(authService.edit).toHaveBeenCalledWith({
            status: "Inactive",
            name: "New User",
            pic: "new-pic.jpg",
        });
        expect(router.navigateByUrl).toHaveBeenCalledWith("/");
    }));
});
