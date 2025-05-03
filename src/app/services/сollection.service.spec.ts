import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { CollectionService } from "./collection.service";
import { ICollection, IShortCollection } from "@app/interfaces";

describe("CollectionService", () => {
    let service: CollectionService;
    let httpMock: HttpTestingController;

    const mockShortCollections: IShortCollection[] = [
        {
            id: 1,
            name: "Test 1",
            short_description: "Short 1",
            pic: "pic1.jpg",
        },
        {
            id: 2,
            name: "Test 2",
            short_description: "Short 2",
            pic: "pic2.jpg",
        },
    ];

    const mockFullCollection: ICollection = {
        id: 1,
        name: "Full",
        description: "Desc",
        short_description: "Short",
        pic: "pic.jpg",
        color: null,
        retail_trand: 0,
        human_trand_up: 0,
        human_trand_down: 0,
        user_action: "up",
        items: [],
        comments: [],
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CollectionService],
        });

        service = TestBed.inject(CollectionService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should fetch short collections", (done) => {
        service.getCollections().subscribe((data) => {
            expect(data).toEqual(mockShortCollections);
            done();
        });

        const req = httpMock.expectOne(
            "http://127.0.0.1:8000/api/collections/"
        );
        expect(req.request.method).toBe("GET");
        req.flush(mockShortCollections);
    });

    it("should set error on failed getCollections", fakeAsync(() => {
        let error: string | null = null;

        service.isError$.subscribe((err) => (error = err));

        service.getCollections().subscribe();
        const req = httpMock.expectOne(
            "http://127.0.0.1:8000/api/collections/"
        );
        req.flush("Error loading", { status: 500, statusText: "Server Error" });

        tick();
        expect(error).toBe(
            "Http failure response for http://127.0.0.1:8000/api/collections/: 500 Server Error"
        );
    }));

    it("should fetch full collection by ID", (done) => {
        sessionStorage.setItem("access", "dummy-token");

        service.getCollectionById(1).subscribe((data) => {
            expect(data).toEqual(mockFullCollection);
            done();
        });

        const req = httpMock.expectOne(
            "http://127.0.0.1:8000/api/collections/1/"
        );
        expect(req.request.method).toBe("GET");
        expect(req.request.headers.get("Authorization")).toBe(
            "Bearer dummy-token"
        );
        req.flush(mockFullCollection);
    });

    it("should set error on failed getCollectionById", fakeAsync(() => {
        sessionStorage.setItem("access", "dummy-token");
        let error: string | null = null;

        service.isError$.subscribe((err) => (error = err));

        service.getCollectionById(1).subscribe();
        const req = httpMock.expectOne(
            "http://127.0.0.1:8000/api/collections/1/"
        );
        req.flush("Error loading", { status: 404, statusText: "Not Found" });

        tick();
        expect(error).toBe(
            "Http failure response for http://127.0.0.1:8000/api/collections/1/: 404 Not Found"
        );
    }));

    it("should toggle isLoading$ on getCollections", fakeAsync(() => {
        const states: boolean[] = [];
        service.isLoading$.subscribe((val) => states.push(val));

        service.getCollections().subscribe();
        const req = httpMock.expectOne(
            "http://127.0.0.1:8000/api/collections/"
        );
        req.flush(mockShortCollections);

        tick();
        expect(states).toEqual([false, true, false]);
    }));

    it("should toggle isLoading$ on getCollectionById", fakeAsync(() => {
        sessionStorage.setItem("access", "dummy-token");
        const states: boolean[] = [];
        service.isLoading$.subscribe((val) => states.push(val));

        service.getCollectionById(1).subscribe();
        const req = httpMock.expectOne(
            "http://127.0.0.1:8000/api/collections/1/"
        );
        req.flush(mockFullCollection);

        tick();
        expect(states).toEqual([false, true, false]);
    }));

    it("should toggle isLoading$ and still handle error on getCollectionById", fakeAsync(() => {
        sessionStorage.setItem("access", "dummy-token");
        const states: boolean[] = [];
        service.isLoading$.subscribe((val) => states.push(val));

        service.getCollectionById(1).subscribe();
        const req = httpMock.expectOne(
            "http://127.0.0.1:8000/api/collections/1/"
        );
        req.flush("Error", { status: 500, statusText: "Server Error" });

        tick();
        expect(states).toEqual([false, true, false]);
    }));
});
