import { DestroyService } from "./destroy.service";

describe("DestroyService", () => {
    let service: DestroyService;

    beforeEach(() => {
        service = new DestroyService();
    });

    it("should call next() and complete() on ngOnDestroy", () => {
        const nextSpy = jest.spyOn(service, "next");
        const completeSpy = jest.spyOn(service, "complete");

        service.ngOnDestroy();

        expect(nextSpy).toHaveBeenCalledTimes(1);
        expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it("should notify subscribers on destroy", (done) => {
        service.subscribe({
            next: () => {
                expect(true).toBe(true);
                done();
            },
        });

        service.ngOnDestroy();
    });
});
