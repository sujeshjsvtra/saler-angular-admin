import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const header = { 'Content-Type': 'application/json', 'mode': 'no-cors' };

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getAllProductsByUser(param: any): Observable<HttpResponse<any>> {
    return this.http.get("http://localhost:8081/seller/products/list/" + param, {
      headers: header,
      observe: 'response'
    })
  }

  createNewstock(param:any):Promise<HttpResponse<any>>{
    return this.http.post("http://localhost:8081/seller/stock/create/",param,{
      observe:'response',
      headers:header
    }).toPromise();
  }

  fetchStock(param:any):Promise<HttpResponse<any>>{
    return this.http.get("http://localhost:8081/seller/stock/listall/"+param,{
      observe:'response',
      headers:header
    }).toPromise();
  }

  markStockToSale(param:any):Promise<HttpResponse<any>>{
    return this.http.post("http://localhost:8081/seller/stock/trademove/",param,{
      observe:'response',
      headers:header
    }).toPromise();
  }

  fetchStockByStockId(param:any):Promise<HttpResponse<any>>{
    return this.http.get("http://localhost:8081/seller/stock/list/"+param,{
      observe:'response',
      headers:header
    }).toPromise();
  }

  deleteProductStock(param:any):Promise<HttpResponse<any>>{
    return this.http.delete("http://localhost:8081/seller/stock/delete/"+param,{
      observe:'response',
      headers:header
    }).toPromise();
  }
}
