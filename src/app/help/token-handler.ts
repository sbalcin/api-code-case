import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenHandler implements HttpInterceptor {
    constructor(private readonly authenticationService: AuthService) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Accept : '*',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                        Authorization: `${currentUser.token}`
                    }
                });
        } else {
            request = request.clone({
                // setHeaders: {
                //     Accept : '*',
                //     'Access-Control-Allow-Origin': '*',
                //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                //     'Access-Control-Request-Headers': '*'
                // }
            });
        }
        return next.handle(request);
    }
}
