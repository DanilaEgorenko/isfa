import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./components/menu/menu.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ItemComponent } from "./components/item/item.component";

@NgModule({
    declarations: [AppComponent, MenuComponent, ProfileComponent],
    imports: [BrowserModule, AppRoutingModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
