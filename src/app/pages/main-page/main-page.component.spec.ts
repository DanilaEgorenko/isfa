import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MainPageComponent } from "./main-page.component";
import { CryptoApiService } from "@app/services";
import { CollectionService } from "@app/services";
import { of } from "rxjs";
import { MainPageModule } from "./main-page.module";
import { RouterTestingModule } from "@angular/router/testing";

describe("MainPageComponent", () => {
    let component: MainPageComponent;
    let fixture: ComponentFixture<MainPageComponent>;

    const mockCryptoApiService = {
        getCryproByChange: jest.fn(),
    };

    const mockCollectionService = {
        getCollections: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MainPageModule, RouterTestingModule],
            providers: [
                { provide: CryptoApiService, useValue: mockCryptoApiService },
                { provide: CollectionService, useValue: mockCollectionService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        mockCryptoApiService.getCryproByChange.mockImplementation((order) =>
            of({
                data: {
                    coins:
                        order === "asc" ? ["low1", "low2"] : ["high1", "high2"],
                },
            })
        );

        mockCollectionService.getCollections.mockReturnValue(
            of(["col1", "col2"])
        );

        fixture = TestBed.createComponent(MainPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should fetch topLowest$, topHighest$, and collections$", (done) => {
        component.topLowest$.subscribe((low) => {
            expect(low).toEqual(["low1", "low2"]);
        });

        component.topHighest$.subscribe((high) => {
            expect(high).toEqual(["high1", "high2"]);
        });

        component.collections$.subscribe((collections) => {
            expect(collections).toEqual(["col1", "col2"]);
            done();
        });

        expect(mockCollectionService.getCollections).toHaveBeenCalled();
    });
});
