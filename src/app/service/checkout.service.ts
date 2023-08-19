import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }


  private baseUrl = "http://localhost:8080"

  saveCheckout(formData){
    return this.httpClient.post("http://localhost:8080/api/v1/orders", formData);
  }

}
