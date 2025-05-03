import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { PriceChangeComponent } from "./price-change.component";
import { PriceChangeModule } from "./price-change.module";

describe("PriceChangeComponent", () => {
    let component: PriceChangeComponent;
    let fixture: ComponentFixture<PriceChangeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                PriceChangeModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PriceChangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Создаёт компонент", () => {
        expect(component).toBeTruthy();
    });
});
