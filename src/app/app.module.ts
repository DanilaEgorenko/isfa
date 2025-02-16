import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./components/menu/menu.component";
import { PriceChangeModule } from "./components/price-change/price-change.module";
import { ProfileComponent } from "./components/profile/profile.component";

@NgModule({
    declarations: [AppComponent, MenuComponent, ProfileComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PriceChangeModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
