import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    isOnlineSubject = new BehaviorSubject(true);
    isOnline$ = this.isOnlineSubject.asObservable();

    constructor(private authService: AuthService) {
        this.authService.loadUserData();
    }

    ngOnInit() {
        window.addEventListener("offline", () => {
            this.isOnlineSubject.next(false);
        });
        window.addEventListener("online", () => {
            this.isOnlineSubject.next(true);
        });
    }
}
