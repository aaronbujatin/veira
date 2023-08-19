import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderItem } from 'src/app/model/order-item.model';
import { Order } from 'src/app/model/order.model';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cartItems: any = []
  orderItems: any = []
  ngOnInit() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
    const orderItemsFormArray = this.checkoutForm.get('orderItems') as FormArray;
    this.orderItems = this.cartItems.forEach(item => {
      orderItemsFormArray.push(this.createOrderItemFormGroup(item));
    });
  }

  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private cartService : CartService) {
    this.checkoutForm = this.formBuilder.group({
      checkoutInfo: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', Validators.required],
        phoneNumber: ['', Validators.required],
      }),
      orderItems: this.formBuilder.array(this.orderItems)
    })
  }

  submitForm() {
    if (this.checkoutForm.valid) {
      const formData = this.checkoutForm.value
      console.log(formData);
      
      this.orderService.saveOrder(formData).subscribe(
        (response) => {
          this.cartService.clearCart();
          console.log(response);
        }, (error) => {
          console.log(error);
        }
      )
    } else {
      console.log("Form was not sent");
    }
  }

  createOrderItemFormGroup(item): FormGroup {
    return this.formBuilder.group({
      id: item.id,
      quantity: item.quantity,
      productId: item.productId,
      unitPrice: item.unitPrice
    });
  }

}
