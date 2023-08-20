import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClient) { }

  private readonly baseUrl = environment.baseUrl


  public saveOrder(order){
    return this.httpClient.post(`${this.baseUrl}/api/v1/orders`, order);
  }


}
