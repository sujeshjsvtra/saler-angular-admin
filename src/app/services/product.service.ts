import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const header = { 'Content-Type': 'application/json', 'mode': 'no-cors' };

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(params: any): Promise<HttpResponse<any>> {
    console.log(params);
    return this.http.post("http://localhost:8081/seller/products/create", params, {
      headers: header,
      observe: 'response'
    }).toPromise();
  }

  getProducts(param: any): Promise<HttpResponse<any>> {
     
    return this.http.get("http://localhost:8081/seller/products/list/" + param, {
      headers: header,
      observe: 'response'
    }).toPromise();
  }

  createThumbnail(params: any): Promise<HttpResponse<any>> {
    return this.http.post("http://localhost:8081/seller/products/create/thumbnail", params, {
      //headers:{'Content-Type':'application/octet-stream'},
      observe: 'response'
    }).toPromise();
  }

  createGallery(params: any): Promise<HttpResponse<any>> {
    return this.http.post("http://localhost:8081/seller/products/create/gallery", params, {
      // headers:{'Content-Type':'application/octet-stream'},
      observe: 'response'
    }).toPromise();
  }

  deleteProduct(param: any): Promise<HttpResponse<any>> {
    return this.http.delete("http://localhost:8081/seller/products/delete/" + param, {
      headers: header,
      observe: 'response'
    }).toPromise();
  }

 

  categoryGroupType():Observable<HttpResponse<any>>{
    return this.http.get("http://localhost:8081/seller/categorytype/group",{
      headers:header,
      observe:'response'
    })
  }

  productsByCategory(param:any):Promise<HttpResponse<any>>{
    return this.http.get("http://localhost:8081/seller/products/category/list/"+param,{
      observe:'response',
      headers:header
    }).toPromise();
  }

}
