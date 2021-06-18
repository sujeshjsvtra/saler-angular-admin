import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';
const header = { 'Content-Type': 'application/json', 'mode': 'no-cors' };
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  allCategoryType():Promise<HttpResponse<any>>{
    return this.http.get("http://localhost:8081/seller/categorytype/listall",{
      headers:header,
      observe:'response'
    }).toPromise();
  }

  async allCategories(params: any): Promise<HttpResponse<any>> {
    params = params?params:0;
    return await this.http.get("http://localhost:8081/seller/category/list/"+params, {
      headers: header,
      observe: 'response',
    }).toPromise();
  }

  createCategory(params: any): Observable<HttpResponse<any>> {
    return this.http.post("http://localhost:8081/seller/category/create", params, {
      observe: 'response'
    })
  }

  deleteCategory(params: any): Promise<HttpResponse<any>> {
    return this.http.delete("http://localhost:8081/seller/category/delete/" + params, {
      headers: header,
      observe: 'response'
    }).toPromise();
  }



}
