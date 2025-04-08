import { Component, OnInit } from "@angular/core";
import { ERoutes } from "@app/enums";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
    readonly ERoutes = ERoutes;
    opened: boolean = false;
}
