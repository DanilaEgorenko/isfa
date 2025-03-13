import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {} // Вместо DI используем Injector

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);

        let accessToken = sessionStorage.getItem("access");
        if (accessToken) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${accessToken}` },
            });
            authService.loadUserData();
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return authService.refreshToken().pipe(
                        switchMap(() => {
                            const newAccessToken =
                                sessionStorage.getItem("access");
                            if (newAccessToken) {
                                req = req.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${newAccessToken}`,
                                    },
                                });
                                sessionStorage.setItem(
                                    "access",
                                    newAccessToken
                                );
                                authService.loadUserData();
                            }
                            authService.userDataSubject$.next(null);
                            return next.handle(req);
                        })
                    );
                }
                return throwError(error);
            })
        );
    }
}
