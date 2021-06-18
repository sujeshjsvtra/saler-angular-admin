import { Component } from '@angular/core';
 
import { Router } from '@angular/router';
import { User } from './shared/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public redirectUrl: string = "seller";
  title = ' SALER  ';
  login = true;
  
  constructor( private router: Router){}

 switchLogin(){
    this.login = !(this.login);
     
 }

 ngOnInit(){
  
 }
  

  isUserLogIn(){
    var ts = sessionStorage.getItem("CLIENT_TOKEN");
    if(ts && ts!=null){
      return true;
    } 
    return false;
  }
  
}
