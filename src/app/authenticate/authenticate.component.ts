import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { ConfirmedValidator } from '../shared/confirmed.validator';
import { first } from 'rxjs/operators';
import { Authenticate } from '../model/authenticate';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserHeader } from '../model/header';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  userHeader = new UserHeader
  user= new User;
  register = false;
  authenticate = new Authenticate();
  visible = true;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  constructor(private formBuilder: FormBuilder, private _authenticateService: AuthenticateService,private router: Router) { }
  
  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirm: ['', [Validators.required]]
  }, {
    // validator: this.passwordMatchValidator
    validator: ConfirmedValidator('password', 'confirm')
  });
  loginForm = this.formBuilder.group({     
    email: ['', [Validators.required, Validators.email]],    
    password: ['', [Validators.required, Validators.minLength(5)]]     
  });

  ngOnInit(): void {
    this.visible = sessionStorage.getItem("CLIENT_TOKEN") == null?true:false;
  }


  switchLoginSection() {
    this.registerForm.reset(this.registerForm.value);
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.register = !this.register;
  }


  get f() {

    return this.registerForm.controls;

  }
  async submit() {

    await this._authenticateService.emailIsExist(this.registerForm.get('email')).then((response)=>{
      if(response && !response.body){
        this.createUserAuth();
      }else{
        this.error("Email is already exist, please try new one");
        this.registerForm.patchValue({
          'email':''
        });
      }
    })

    

  }

  createUserAuth(){
    this._authenticateService.create(this.registerForm.value)
    .pipe(first())
    .subscribe((res) => {
      this.authenticate = res.body;
      if (this.authenticate.id != null && this.authenticate.id > 1) {
        Swal.fire('Account Created!', 'Successfully created your account please login.!', 'success');
        this.switchLoginSection();
      }
    });
  }

  login(){
    this._authenticateService.login(this.loginForm.value)
    .pipe(first())
    .subscribe((response)=>{
      this.user = response.body;
     
      if(this.user!=null && this.user.id!=null){
        response.headers.keys().map( (key: any) => console.log(`${key}: ${response.headers.get(key)}`));
        this.setHeader(response.headers);
        sessionStorage.setItem("USER",JSON.stringify(this.user));
        response.headers.keys().map( (key: any) => console.log(`${key}: ${response.headers.get(key)}`));
        this.router.navigate(['/dashboard']);
        window.location.reload();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'login attempt failed..',
          text: 'Invalid Email address or Password !'
        })
      }
    })  
  }

  setHeader(response:any){
        let token = response.headers.get("token");
        let ticket = response.headers.get("ticket");
        let transport = response.headers.get("transporter");
        this.userHeader.ticket = ticket;
        this.userHeader.token=token;
        this.userHeader.transport = transport;
        console.log(JSON.stringify(this.userHeader));
        sessionStorage.setItem("CLIENT_TOKEN",token),
        sessionStorage.setItem("CLIENT_HEADER",JSON.stringify(this.userHeader));
  }

  error(message: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2500
    })
  }

}
