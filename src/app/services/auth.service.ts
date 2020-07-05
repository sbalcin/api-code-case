import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserInfo} from '../models/user-info';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<UserInfo>;
  private readonly currentUserSubject: BehaviorSubject<UserInfo>;

  constructor(private router: Router,
              private toastr: ToastrService,
              private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserInfo>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserInfo {
    return this.currentUserSubject.getValue();
  }

  public signInUser(user: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${environment.url}merchant/user/login`, user);
  }

  public signOutUser() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
