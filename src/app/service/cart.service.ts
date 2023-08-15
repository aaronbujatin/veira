import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { CartItem } from '../model/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor() {
    this.cartItems = this.getCartItems();
    this.cartSizeSubject.next(this.cartItems.length);
  }

  private cartItems: any[] = [];
  private cartSizeSubject = new BehaviorSubject<number>(0);
  private cartKey = 'cart';

  addToCart(product: Product, size: string, quantity: number) {
    this.cartItems = this.getCartItems();

    const itemExists = this.cartItems.findIndex(cartItem => cartItem.productId === product.id && cartItem.size === undefined);
    if (itemExists === -1) {
      const cartItem: CartItem = {
        productId: product.id,
        name: product.name,
        imageUrl : product.imageUrl,
        size,
        quantity,
    
      }
      //when user add a item it will push to array
      this.cartItems.push(cartItem);
    
      
      //this will check the lenght if items in cart
      this.cartSizeSubject.next(this.cartItems.length);
      //this will set the item in localstorage and convert the product item to json
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    } else {
      console.log('Item already in the cart');
    }
  }

  getCartItems(): any[] {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartSizeSubject.next(this.cartItems.length);
    }
  }

  getCartSize() {
    return this.cartSizeSubject.asObservable();
  }

}
