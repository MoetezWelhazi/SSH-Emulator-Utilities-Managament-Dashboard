import { Component, EventEmitter, Output } from '@angular/core';
import { UserInfo } from "../../shared/models/auth.interface";

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})

export class SignupformComponent {
  isAdmin = false;
  hide = true;
  userInfo: UserInfo = {
    email: '',
    password: '',
    trigramme: '',
    roles: [],
};
  @Output() signup = new EventEmitter();
  @Output() toSignin = new EventEmitter();
  signup1(user: UserInfo) {
    user.roles = [ this.isAdmin? "admin": ""];
    this.signup.emit(user);
  }
}
