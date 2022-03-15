import { Component, OnInit } from '@angular/core';

import { UserInfo } from '../shared/interfaces/auth.interface';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    document.body.classList.add('login-background');
  }

  ngOnDestroy() {
    document.body.classList.remove('login-background');
  }

  login(userInfo: UserInfo) {
    this.authService.login(userInfo);
  }

  signup(userInfo:UserInfo){
    this.authService.register(userInfo);
  }

  tosignup() {
    // @ts-ignore
    document.getElementById("signupForm").classList.remove('animate__fadeOutRight');
    // @ts-ignore
    document.getElementById("signupImg").classList.remove('animate__fadeOutLeft');
    // @ts-ignore
    document.getElementById("signupForm").classList.add('animate__animated','animate__fadeInRight','z-1');
    // @ts-ignore
    document.getElementById("signupImg").classList.add('animate__animated','animate__fadeInLeft','z-1');
    console.log("TO SIGN UP!")
  }

  tosignin() {
    // @ts-ignore
    document.getElementById("signupForm").classList.remove('animate__fadeInRight');
    //@ts-ignore
    document.getElementById("signupForm").classList.add('animate__fadeOutRight');
    // @ts-ignore
    document.getElementById("signupImg").classList.remove('animate__fadeInLeft');
    // @ts-ignore
    document.getElementById("signupImg").classList.add('animate__fadeOutLeft');
    console.log("TO SIGN IN!")
  }


}