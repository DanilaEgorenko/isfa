import { HeaderDataService } from "./header-data.service";

describe("HeaderDataService", () => {
    let service: HeaderDataService;

    beforeEach(() => {
        service = new HeaderDataService();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should initially emit null", (done) => {
        service.data$.subscribe((value) => {
            expect(value).toBeNull();
            done();
        });
    });

    it("should update and emit new data", (done) => {
        const newData = { title: "Test Header", count: 5 };

        let callCount = 0;
        service.data$.subscribe((value) => {
            callCount++;
            if (callCount === 2) {
                expect(value).toEqual(newData);
                done();
            }
        });

        service.updateData(newData);
    });
});
