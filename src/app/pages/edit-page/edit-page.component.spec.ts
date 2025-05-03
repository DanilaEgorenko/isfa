import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EditPageComponent } from "./edit-page.component";
import { EditPageModule } from "./edit-page.module";

describe("EditPageComponent", () => {
    let component: EditPageComponent;
    let fixture: ComponentFixture<EditPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                EditPageModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Создаёт компонент", () => {
        expect(component).toBeTruthy();
    });
});
