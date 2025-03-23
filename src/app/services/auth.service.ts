import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface ILoginResponse {
    access: string;
    refresh: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
    private readonly apiUrl = "http://127.0.0.1:8000/api";

    userDataSubject$ = new BehaviorSubject(null);
    userData$ = this.userDataSubject$.asObservable();

    constructor(private http: HttpClient) {}

    refreshToken() {
        const refresh = sessionStorage.getItem("refresh");
        if (!refresh) return;

        return this.http
            .post<{ access: string }>(`${this.apiUrl}/refresh/`, {
                refresh,
            })
            .pipe(catchError(() => this.logout()));
    }

    logout(): Observable<boolean> {
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
        this.userDataSubject$.next(null);
        return of(true);
    }

    login(params: {
        email: string;
        password: string;
    }): Observable<ILoginResponse> {
        return this.http.post(`${this.apiUrl}/login/`, params).pipe(
            tap(({ access, refresh }: ILoginResponse) => {
                sessionStorage.setItem("access", access);
                sessionStorage.setItem("refresh", refresh);
                this.loadUserData();
            })
        );
    }

    registration(params: {
        email: string;
        password: string;
        name: string;
    }): Observable<ILoginResponse> {
        return this.http.post(`${this.apiUrl}/register/`, params).pipe(
            tap(({ access, refresh }: ILoginResponse) => {
                sessionStorage.setItem("access", access);
                sessionStorage.setItem("refresh", refresh);
                this.loadUserData();
            })
        );
    }

    parseToken(token: string) {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    }

    loadUserData(): void {
        if (sessionStorage.getItem("access")) {
            this.userDataSubject$.next(
                this.parseToken(sessionStorage.getItem("access"))
            );
        }
    }
}
