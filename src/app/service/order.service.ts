import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClient) { }

  private readonly baseUrl = "http://localhost:8080";

  public saveOrder(order){
    return this.httpClient.post(`${this.baseUrl}/api/v1/orders`, order);
  }


}
