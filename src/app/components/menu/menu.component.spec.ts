import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MenuComponent } from "./menu.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ERoutes } from "@app/enums";
import { By } from "@angular/platform-browser";

describe("MenuComponent", () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuComponent],
            imports: [RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the menu component", () => {
        expect(component).toBeTruthy();
    });

    it('should display the menu when "opened" is true', () => {
        component.opened = true;
        fixture.detectChanges();

        const menu = fixture.debugElement.query(By.css(".menu"));
        expect(menu).toBeTruthy();
    });

    it('should hide the menu when "opened" is false', () => {
        component.opened = false;
        fixture.detectChanges();

        const menu = fixture.debugElement.query(By.css(".menu"));
        expect(menu).toBeFalsy();
    });

    it("should have the correct routerLink values", () => {
        component.opened = true;
        fixture.detectChanges();
        const links = fixture.debugElement.queryAll(By.css("a"));

        expect(links.length).toBe(7);
    });
});
