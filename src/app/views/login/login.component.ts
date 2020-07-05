import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserInfo} from '../../models/user-info';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  email = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [`${environment.sampleEmail}`, [Validators.required]],
      password: [`${environment.samplePassword}`, [Validators.required]],
    });
  }

  tryLogin(value) {

    if (!value.email || !value.password) {
      this.toastr.warning('Please fill the credentials');
      return;
    }

    const user: UserInfo = new UserInfo();
    user.email = value.email;
    user.password = value.password;

    this.authService.signInUser(user).subscribe(data => {
      data.email = user.email;
      if (data.status === 'APPROVED') {
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/home';
      } else {
        this.toastr.error('Please check the credentials');
      }
    }, error => {
      if (error.message) {
        this.toastr.error(error.message);
      } else {
        this.toastr.error(error.error.message);
      }
    });
  }
}
