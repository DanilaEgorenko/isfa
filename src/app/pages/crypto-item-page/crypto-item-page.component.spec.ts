import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CryptoItemPageComponent } from "./crypto-item-page.component";
import { CryptoItemPageModule } from "./crypto-item-page.module";

describe("CryptoItemPageComponent", () => {
    let component: CryptoItemPageComponent;
    let fixture: ComponentFixture<CryptoItemPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                CryptoItemPageModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CryptoItemPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Создаёт компонент", () => {
        expect(component).toBeTruthy();
    });
});
