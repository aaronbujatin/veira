import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }


  private baseUrl = "https://localhost:8080";

  saveCheckout(formData){
    return this.httpClient.post(`${this.baseUrl}/api/v1/checkouts`, formData);
  }

}
