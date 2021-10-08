import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "./loader.service";
import { LoginService } from "./login.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private login: LoginService, private loaderService:LoaderService ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.isLoading.next(true);
        //add the jwt token 
        let authReq = req;
        const token = this.login.getToken();
        if (token != null) {
            authReq = authReq.clone({ 
                setHeaders: { Authorization: `Bearer ${token}` },
         });
        }
        return next.handle(authReq).pipe(
            finalize(()=>this.loaderService.isLoading.next(false))
        );
    }
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    }
] 