import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./components/menu/menu.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [AppComponent, MenuComponent, ProfileComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
