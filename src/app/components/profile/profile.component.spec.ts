import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfileComponent } from "./profile.component";
import { Router } from "@angular/router";
import { APP_BASE_HREF, Location } from "@angular/common";
import { HeaderDataService } from "@app/services";
import { AuthService } from "@app/services/auth.service";
import { DestroyService } from "@app/services/destroy.service";
import { RouterTestingModule } from "@angular/router/testing";
import { AppModule } from "@app/app.module";

describe("ProfileComponent", () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let router: Router;
    let location: Location;
    let headerDataService: HeaderDataService;
    let authService: AuthService;
    let destroyService: DestroyService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, AppModule],
            providers: [
                HeaderDataService,
                AuthService,
                DestroyService,
                Location,
                { provide: APP_BASE_HREF, useValue: "/" },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        headerDataService = TestBed.inject(HeaderDataService);
        authService = TestBed.inject(AuthService);
        destroyService = TestBed.inject(DestroyService);

        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should navigate to the previous page when back() is called", () => {
        const locationBackSpy = jest.spyOn(location, "back");
        component.back();
        expect(locationBackSpy).toHaveBeenCalled();
    });
});
