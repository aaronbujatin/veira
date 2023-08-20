import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClient) { }

  private readonly baseUrl = environment.baseUrl
  private readonly localUrl = "http://localhost:8080"

  public saveOrder(order){
    return this.httpClient.post(`${this.localUrl}/api/v1/orders`, order);
  }


}
