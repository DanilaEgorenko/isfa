import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CollectionItemComponent } from "./collection-item.component";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

describe("CollectionItemComponent", () => {
    let component: CollectionItemComponent;
    let fixture: ComponentFixture<CollectionItemComponent>;

    const mockCollection = {
        id: 1,
        name: "Test Collection",
        short_description: "Test short description",
        pic: "https://example.com/test.jpg",
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CollectionItemComponent],
            imports: [RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(CollectionItemComponent);
        component = fixture.componentInstance;
        component.collection = mockCollection;
        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should display collection name", () => {
        const nameElement = fixture.debugElement.query(By.css(".name"));
        expect(nameElement.nativeElement.textContent).toContain(
            mockCollection.name
        );
    });

    it("should display collection short description", () => {
        const shortDescriptionElement = fixture.debugElement.query(
            By.css(".short_description")
        );
        expect(shortDescriptionElement.nativeElement.textContent).toContain(
            mockCollection.short_description
        );
    });

    it("should set background image for logo div", () => {
        const logoDiv = fixture.debugElement.query(By.css(".logo"));
        const backgroundImage = logoDiv.nativeElement.style.backgroundImage;
        expect(backgroundImage).toContain(mockCollection.pic);
    });
});
