import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/service/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutForm: FormGroup;

  constructor(private formBuidler: FormBuilder, private checkoutService : CheckoutService) {
    this.checkoutForm = this.formBuidler.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required, Validators.email],
      address:['', Validators.required],
      city:['', Validators.required],
      country:['', Validators.required],
      postalCode:['', Validators.required],
    })
  }

  submitForm(){
    if(this.checkoutForm.valid){
      const formData = this.checkoutForm.value
      this.checkoutService.saveCheckout(formData);
    } else {
      console.log("Form was not sent"); 
    }
  }


}
