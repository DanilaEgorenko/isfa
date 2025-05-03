import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ItemComponent } from "./item.component";
import { IItem } from "@app/interfaces";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { PriceChangeModule } from "../price-change/price-change.module";
import { RouterTestingModule } from "@angular/router/testing";

describe("ItemComponent", () => {
    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;

    const mockItem: IItem = {
        isin: "1234567890",
        name: "Test Item",
        type: "testType",
        change: 1,
        logo: "test.png",
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule, PriceChangeModule],
            declarations: [ItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ItemComponent);
        component = fixture.componentInstance;
        component.item = mockItem;
        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should display the item name correctly", () => {
        const nameElement = fixture.debugElement.query(By.css(".name"));
        expect(nameElement.nativeElement.textContent).toBe(mockItem.name);
    });

    it("should call getLogo correctly", () => {
        const spy = jest.spyOn(component, "getLogo");
        component.getLogo(mockItem);
        expect(spy).toHaveBeenCalledWith(mockItem);
    });

    it("should set the correct router link", () => {
        const routerLinkElement = fixture.debugElement.query(By.css("a"));
        const expectedLink = [`/`, mockItem.type, mockItem.isin];
        expect(
            routerLinkElement.nativeElement.getAttribute(
                "ng-reflect-router-link"
            )
        ).toBe(expectedLink.join(","));
    });
});
