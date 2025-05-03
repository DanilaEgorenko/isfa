import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoadSpinnerComponent } from "./load-spinner.component";
import { By } from "@angular/platform-browser";

describe("LoadSpinnerComponent", () => {
    let component: LoadSpinnerComponent;
    let fixture: ComponentFixture<LoadSpinnerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoadSpinnerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LoadSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should not display spinner when isLoading is false", () => {
        component.isLoading = false;
        component.error = null;
        fixture.detectChanges();

        const loaderDiv = fixture.debugElement.query(By.css("#loader"));
        expect(loaderDiv).toBeFalsy();
    });

    it("should not display error message when error is not provided", () => {
        component.isLoading = false;
        component.error = null;
        fixture.detectChanges();

        const errorDiv = fixture.debugElement.query(By.css(".error"));
        expect(errorDiv).toBeFalsy();
    });

    it("should not display spinner or error when both are falsy", () => {
        component.isLoading = false;
        component.error = null;
        fixture.detectChanges();

        const loaderDiv = fixture.debugElement.query(By.css("#loader"));
        const errorDiv = fixture.debugElement.query(By.css(".error"));

        expect(loaderDiv).toBeFalsy();
        expect(errorDiv).toBeFalsy();
    });
});
