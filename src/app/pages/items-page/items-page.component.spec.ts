import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ItemsPageComponent } from "./items-page.component";

describe("ItemsPageComponent", () => {
    let component: ItemsPageComponent;
    let fixture: ComponentFixture<ItemsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [ItemsPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Создаёт компонент", () => {
        expect(component).toBeTruthy();
    });
});
