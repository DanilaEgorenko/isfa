import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PriceChangeComponent } from "./price-change.component";
import { By } from "@angular/platform-browser";

describe("PriceChangeComponent", () => {
    let component: PriceChangeComponent;
    let fixture: ComponentFixture<PriceChangeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PriceChangeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PriceChangeComponent);
        component = fixture.componentInstance;
    });

    it("should display the correct rotation value in the template", () => {
        component.change = 30;
        fixture.detectChanges();

        const changeDiv = fixture.debugElement.query(By.css(".change"));
        expect(changeDiv).toBeTruthy();

        const rotateElement = fixture.debugElement.query(
            By.css(".change > div")
        );
        expect(rotateElement).toBeTruthy();

        const style = rotateElement.nativeElement.style.transform;
        const expectedRotation = `rotate(${component.getRotateDeg(30)}deg)`;
        expect(style).toBe(expectedRotation);
    });
});
