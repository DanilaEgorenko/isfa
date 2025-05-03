import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ItemPageComponent } from "./item-page.component";
import { ItemsPageModule } from "../items-page/items-page.module";
import { ItemPageModule } from "./item-page.module";

describe("ItemPageComponent", () => {
    let component: ItemPageComponent;
    let fixture: ComponentFixture<ItemPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ItemPageModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Создаёт компонент", () => {
        expect(component).toBeTruthy();
    });
});
