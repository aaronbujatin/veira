import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: any[] = [];

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }

 

  increment(cartItem : any) {
    this.cartService.incrementItemFromCart(cartItem);
    console.log(cartItem);
    this.ngOnInit()
  }

 

  decrement(cartItem : any) {
    this.cartService.decrementItemFromCart(cartItem);
    console.log(cartItem);
    this.ngOnInit()

  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
    this.ngOnInit()
    this.toastr.success('Item was deleted', 'Veira Co.', { positionClass: 'toast-bottom-left', });
  }

  

}
