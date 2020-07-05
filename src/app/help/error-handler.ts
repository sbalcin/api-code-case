import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

@Injectable()
export class ErrorHandler implements HttpInterceptor {

  constructor(private authenticationService: AuthService,
              private router: Router,
              private toastr: ToastrService
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      this.toastr.warning(err.message);
      if (err.status === 401) {
        this.router.navigate(['/login']);
      }
      return throwError(err);
    }));
  }
}
