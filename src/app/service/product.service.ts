import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) { }

  private readonly baseUrl = environment.baseUrl;

  getProductByCatalog(catalog : string){
    return this.httpClient.get(`${this.baseUrl}/api/v1/products/catalog?catalog=${catalog}`)
  }

  public getProductById(id:number) {
    return this.httpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }

}
