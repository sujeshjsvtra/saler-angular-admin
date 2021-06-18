import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { UserHeader } from '../model/header';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  userHeader = new UserHeader;

  constructor(public loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userHeader = JSON.parse(sessionStorage.getItem("CLIENT_HEADER"));
    if (this.userHeader != null && this.userHeader.ticket != null) {
      req = req.clone({
        setHeaders: {
          Tiket: '' + this.userHeader.ticket,
          Token: '' + this.userHeader.token,
          Transporter: '' + this.userHeader.transport
        }
      })
    }
    this.loaderService.show();
    return next.handle(req);
    // .pipe(
    //   //finalize(()=>{this.loaderService.isLoading.next(false);})
    // );

    // this.loaderService.show();
    // return next.handle(req).pipe(
    //     finalize(() => this.loaderService.hide())
    // );

  }
}