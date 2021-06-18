import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthenticateService } from '../services/authenticate.service';
import { LoaderService } from '../shared/loader.service';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  blocker = false;
  user = new User();
  constructor(private _authenticateService: AuthenticateService,public loaderService:LoaderService) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  logout() {
    sessionStorage.clear();
    window.location.href = '/authenticate'; 
    window.location.reload();
  }

  loadUserDetails() {
    let token = sessionStorage.getItem("CLIENT_TOKEN");
    if (token) {
       this.user = JSON.parse(sessionStorage.getItem("USER"));// as unknown as User;
    }
  }

  showUiBlocker(){
    this.blocker = true;
  }
  hideUiBlocker(){
    this.blocker = false;
  }

}
