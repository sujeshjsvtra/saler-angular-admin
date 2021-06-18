import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams, HttpResponse } from '@angular/common/http';
import { Authenticate } from '../model/authenticate';
import { from, Observable } from 'rxjs';

const header = { 'Content-Type': 'application/json', 'mode': 'no-cors' };

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  baseUrl!: "http://localhost:8080/authenticate/account";
  _url: String = "http://localhost:8080/authenticate/account/seller";
  authenticate = new Authenticate();
  constructor(private http: HttpClient) { }

  create(params: any) :Observable<any>{
    return this.http.post("http://localhost:8080/authenticate/account/seller", params, {
      headers: header,
      observe: 'response',
      responseType: 'json',
    })

  }

  login(params:any):Observable<HttpResponse<any>>{
    return this.http.post("http://localhost:8080/authenticate/account/login",params,{
      headers:header,
      observe:'response'
    })
  }
 
  // userDetailsByToken(params:any):Observable<HttpResponse<any>>{
  //   return this.http.get("http://localhost:8080/user/details/"+params,{
  //     headers:header,
  //     observe:'response'
  //   })
  // }

  emailIsExist(param:any):Promise<HttpResponse<any>>{
    return this.http.get("http://localhost:8080/authenticate/emailisexist/"+param.value,{
      observe:'response',
      headers:header
    }).toPromise();
  }


}
