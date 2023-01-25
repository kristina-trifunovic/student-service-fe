import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserLoginDataService } from "../services/user-login-data/user-login-data.service";


@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private userLoginData: UserLoginDataService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.userLoginData.token;
        if (token) {
            req = req.clone(
                {headers: req.headers.set('Authorization', token)}
            )            
        }
        return next.handle(req);
    }
}