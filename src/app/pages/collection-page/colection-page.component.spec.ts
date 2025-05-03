import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CollectionPageComponent } from "./collection-page.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { CollectionService, HeaderDataService } from "@app/services";
import { CollectionPageModule } from "./collection-page.module";

describe("CollectionPageComponent", () => {
    let component: CollectionPageComponent;
    let fixture: ComponentFixture<CollectionPageComponent>;
    let mockCollectionService: any;
    let mockHeaderDataService: any;

    beforeEach(async () => {
        mockCollectionService = {
            getCollectionById: jest.fn(() => of()),
        };

        mockHeaderDataService = {
            updateData: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [CollectionPageModule],
            providers: [
                { provide: CollectionService, useValue: mockCollectionService },
                { provide: HeaderDataService, useValue: mockHeaderDataService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => "42",
                            },
                        },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CollectionPageComponent);
        component = fixture.componentInstance;
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should initialize collection$ with correct id and update header", () => {
        component.id = 42;
        const mockCollection = { name: "Test Collection" };
        mockCollectionService.getCollectionById.mockReturnValue(
            of(mockCollection)
        );

        component.collection$.subscribe((result) => {
            expect(result).toEqual(mockCollection);
            expect(mockHeaderDataService.updateData).toHaveBeenCalledWith({
                name: "Test Collection",
            });
        });

        expect(component.id).toBe(42);
        expect(mockCollectionService.getCollectionById).toHaveBeenCalledWith(
            42
        );
    });

    it("should clear header data on destroy", () => {
        component.ngOnDestroy();
        expect(mockHeaderDataService.updateData).toHaveBeenCalledWith(null);
    });
});
