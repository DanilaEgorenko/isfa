import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ItemsPageComponent } from "./items-page.component";
import { ItemsApiService, HeaderDataService } from "@app/services";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { ItemsPageModule } from "./items-page.module";
import { RouterTestingModule } from "@angular/router/testing";

const mockRouter = {
    url: "/share",
};

describe("ItemsPageComponent", () => {
    let component: ItemsPageComponent;
    let fixture: ComponentFixture<ItemsPageComponent>;

    const headerDataService = {
        updateData: jest.fn(),
    };

    const itemsApiService = {
        getItems: jest.fn(),
        isLoading$: of(false),
        isError$: of(false),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ItemsPageModule, RouterTestingModule],
            providers: [
                { provide: ItemsApiService, useValue: itemsApiService },
                { provide: HeaderDataService, useValue: headerDataService },
                { provide: Router, useValue: mockRouter },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ItemsPageComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should set type based on URL and fetch items", () => {
        expect(component.type).toBe("share");
        expect(itemsApiService.getItems).toHaveBeenCalledWith("share");
        expect(headerDataService.updateData).toHaveBeenCalledWith({
            name: "Акции",
        });
    });

    it("should update header data to null on destroy", () => {
        component.ngOnDestroy();
        expect(headerDataService.updateData).toHaveBeenCalledWith(null);
    });
});
