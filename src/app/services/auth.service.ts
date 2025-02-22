import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AuthService {
    isLoginSuject$ = new BehaviorSubject(false);
    isLogin$ = this.isLoginSuject$.asObservable();

    logout(): void {}

    login(form: { email: string; password: string }): void {
        debugger;
    }

    registration(form: {
        email: string;
        password: string;
        name: string;
    }): void {
        debugger;
    }
}
