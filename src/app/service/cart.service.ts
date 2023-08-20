import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { CartItem } from '../model/cart-item.model';
import { ToastrService } from 'ngx-toastr';

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
    
    const itemExists = this.cartItems.findIndex(cartItem =>
      cartItem.productId === product.id && cartItem.size === size);
    
    
      
    if (itemExists !== -1) {
      this.cartItems[itemExists].quantity += quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    } else {
      const cartItem: CartItem = {
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        size,
        quantity,
        unitPrice : product.price
      }
      //when user add a item it will push to array
      this.cartItems.push(cartItem);
      //this will check the lenght if items in cart
      this.cartSizeSubject.next(this.cartItems.length);
      //this will set the item in localstorage and convert the product item to json
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    } 
  }

  getCartItems(): any[] {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  removeFromCart(item: any) {
    const index = this.cartItems.findIndex(cartItem =>
      cartItem.productId === item.productId && cartItem.size === item.size
    );
  
   
    
    if (index !== -1) {
      
      
      this.cartItems.splice(index, 1);
      this.cartSizeSubject.next(this.cartItems.length);
      this.updateLocalStorage();
    }
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  getCartSize() {
    return this.cartSizeSubject.asObservable();
  }

  private updateLocalStorage() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  incrementItemFromCart(item : any){
    const itemExists = this.cartItems.findIndex(cartItem =>
      cartItem.productId === item.productId && cartItem.size === item.size);
    if (itemExists !== -1) {
      this.cartItems[itemExists].quantity += 1;
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    }
  }

  decrementItemFromCart(item : any){
    const itemExists = this.cartItems.findIndex(cartItem =>
      cartItem.productId === item.productId && cartItem.size === item.size);
    if (itemExists !== -1) {
     
      
      this.cartItems[itemExists].quantity -= 1;
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartSizeSubject.next(0);
    this.updateLocalStorage();
  }

  

}
