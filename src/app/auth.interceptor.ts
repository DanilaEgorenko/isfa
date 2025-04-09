import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const router = this.injector.get(Router);

        const accessToken = sessionStorage.getItem("access");
        if (accessToken) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${accessToken}` },
            });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                if (error.status === 401) {
                    router.navigate(["/login"]);
                }
                return throwError(error);
            })
        );
    }
}
