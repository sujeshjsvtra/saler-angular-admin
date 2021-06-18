import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserHeader } from '../model/header';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersessionService {
  private userId!:number;
  private userHeader = new UserHeader;
  private user = new User;
  constructor() {
    this.user = JSON.parse(sessionStorage.getItem("USER"));
    this.userHeader = JSON.parse(sessionStorage.getItem("CLIENT_HEADER"));
  }
  loginUser() {
    this.user = JSON.parse(sessionStorage.getItem("USER"));
    return this.user;
  }
  loginUserId() {
    this.userId=this.user != null ? this.user.id : 0;
    return this.userId;
  }
  token(){
    return this.userHeader!=null?this.userHeader.token:"";
  }
  header(){
    return this.userHeader;
  }
}
