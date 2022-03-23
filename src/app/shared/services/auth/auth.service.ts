import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

import { UserInfo } from '../../interfaces/auth.interface';
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "../notifications/notification.service";
import {TokenStorageService} from "./token-storage.service";

const AUTHENTICATION_KEY = 'workshop:authenticated';
const BASE_URL = 'http://localhost:8081';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject(this.getIsAuthenticated() || false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  login(user: UserInfo): String | void {
    this.http.post<UserInfo>(this.getUrl()+"/signin", user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.setIsAuthenticated(true);
        this.isAuthenticated.next(true);
        this.tokenStorage.getUser().roles;
        this.router.navigateByUrl('/home');},
      err => {
        if(err.error == null)
          this.notificationService.notify("Bad Credentials: Email and/or Password are incorrect")
        else {this.notificationService.notify(err.error.message) };
      }
    );
  }

  logout() {
    this.setIsAuthenticated(false);
    this.isAuthenticated.next(false);
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/auth');
  }

  register(user:UserInfo): string | any{
    //console.log("NEW USER: "+JSON.stringify(user)+"\n HAS BEEN REGISTERED!")
    this.http.post<any>(this.getUrl()+"/signup", user).subscribe(
      data => {
        this.notificationService.notify(data.message)
      },
      err => {
        if(err.error == null)
          this.notificationService.notify("Bad Credentials: Email and/or Password are incorrect")
        else {this.notificationService.notify(err.error.message) };
      });
  }

  sendEmail(email:any): Observable<any>{
    return this.http.post<any>(this.getUrl()+"/sendemail", {email});
  }

  verifyCode(email: any, token: any): Observable<any>{
    return this.http.post<any>(this.getUrl()+"/verifycode", {email,token});
  }

  updatePwd(email:any, password:any): Observable<any>{
    return this.http.post<any>(this.getUrl()+"/changepwd", {email, password});
  }

  private getIsAuthenticated(): boolean {
    // @ts-ignore
    if(window.sessionStorage.getItem("isLoggedIn") === null)
      return false
    return true;
  }

  private setIsAuthenticated(isAuthenticated: boolean) {
    window.sessionStorage.setItem('isLoggedIn','true')
    //localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(isAuthenticated));
  }

  private getUrl() {
    return `${BASE_URL}/api/auth`;
  }

  private getUrlWithID(id: any) {
    return `${this.getUrl()}/${id}`;
  }
}
