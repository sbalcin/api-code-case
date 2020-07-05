import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService,
              private toastr: ToastrService
  ) {
  }

  public canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }

    console.log('Please sign in ');
    this.router.navigate(['/login']);
    return false;

  };
}
