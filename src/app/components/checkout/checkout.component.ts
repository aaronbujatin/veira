import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderItem } from 'src/app/model/order-item.model';
import { Order } from 'src/app/model/order.model';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { OrderService } from 'src/app/service/order.service';
import Swal from 'sweetalert2';

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

  constructor(private formBuilder: FormBuilder, 
    private orderService: OrderService, 
    private cartService : CartService,
    private toastr: ToastrService,
    private router : Router
    
    ) {
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
      this.isLoading = true
      const formData = this.checkoutForm.value
     
      
      this.orderService.saveOrder(formData).subscribe(
        (response) => {
          this.cartService.clearCart();
         
          this.handleBuyNotification()
          this.isLoading = false
          
        }, (error) => {
          
        }
      )
    } else if(this.cartItems.length === 0){
      this.toastr.success('Your cart was empty', 'Veira Co.', { positionClass: 'toast-bottom-left', });
    } else {
      this.toastr.success('Please provide correct input format details', 'Veira Co.', { positionClass: 'toast-bottom-left', });
    }
  }

  isLoading = false

  createOrderItemFormGroup(item): FormGroup {
    return this.formBuilder.group({
      id: item.id,
      quantity: item.quantity,
      productId: item.productId,
      unitPrice: item.unitPrice,
      imageUrl : item.imageUrl,
      productName : item.name
    });
  }

  handleBuyClick(){
    if(this.cartItems.length === 0){
      this.toastr.success('Your cart was empty', 'Veira Co.', { positionClass: 'toast-bottom-left', });
    }
  }

  handleBuyNotification(){
    Swal.fire({
      title: 'Woohoo, Order Successful',
      text: "Congratulations! You've successfully purchased. You will receive an email notification within a seconds",
      icon: 'success',
      confirmButtonColor: '#121212', 
      confirmButtonText: 'Home',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([''])
      } else if (result.dismiss) {
        this.router.navigate([''])
      }
    })

    
  }

}
