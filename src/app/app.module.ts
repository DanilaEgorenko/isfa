import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthInterceptor } from "./auth.interceptor";
import { MenuComponent } from "./components/menu/menu.component";
import { PriceChangeModule } from "./components/price-change/price-change.module";
import { ProfileComponent } from "./components/profile/profile.component";
import { ServiceWorkerModule } from "@angular/service-worker";

@NgModule({
    declarations: [AppComponent, MenuComponent, ProfileComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PriceChangeModule,
        ServiceWorkerModule.register("ngsw-worker.js"),
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
})
export class AppModule {}
