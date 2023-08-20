import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/model/order.model';
import { Product } from 'src/app/model/product.model';
import { Variant } from 'src/app/model/variant.model';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private titleService: Title,
    private toastr: ToastrService) { }

  ngOnInit() {
  
    
    this.route.params.subscribe(params => this.getProductById(params['id']))

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    } 
  }
  cartItems: any[] = [];

  addToCart(product: any): void {
    if (this.selectedSize !== "") {
      this.toggleLoading()
      this.cartService.addToCart(product, this.selectedSize, this.quantity);
      this.selectedSize = ''
      this.quantity = 1
      this.ngOnInit()
      
    } else {
      this.toastr.success('Please select item size', 'Veira Co.', { positionClass: 'toast-bottom-left', });
    }
  }


  showSuccess() {
    this.toastr.success('Item was added to cart, Baby!', 'Veira Co.', { positionClass: 'toast-bottom-left', });
  }

  showSelectSizeWarn() {
    this.toastr.success('Select item size', 'Veira Co.', { positionClass: 'toast-bottom-left', });
  }

  product: Product = new Product
  variants: Variant[]

  public getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      (response: Product) => {
        this.product = response
        this.titleService.setTitle(` ${this.product.name} | Veira Co.`)
      }
    )
  }

  isSizeSelected(size: string): boolean {
    return this.selectedSize === size;
  }


  selectedSize: string = ""

  selectSize(size: string) {
    this.selectedSize = size; // Set the selected size
  }
  showStock(size: string): void {
    this.selectedSize = size;
  }

  getStock(size: string): number {
    const selectedSize = this.product.variants.find(s => s.size === size);
    return selectedSize ? selectedSize.stock : 0;
  }

  productSize: string


  quantity: number = 1

  increment() {
    this.quantity = this.quantity + 1;
   

  }

  shouldDisableButton(): boolean {
    return this.quantity <= 1; // Return true if quantity is 1 or less
  }

  decrement() {
    this.quantity -= 1;

  }

  isLoading = false;

  toggleLoading = () => {
    this.isLoading = true;
    
    setTimeout(() => {
      this.isLoading = false;
      this.toastr.success('Item was added to cart', 'Veira Co.', { positionClass: 'toast-bottom-left', });
    }, 3000)
  }

  isCartEmpty(){
    if(this.cartService.getCartItems.length === 0){
      return true
    }
    return false
  }

  handleBuyClick(){
    if(this.cartItems.length === 0){
      this.toastr.success('Your cart was empty', 'Veira Co.', { positionClass: 'toast-bottom-left', });
    } else {
      this.router.navigate(['/checkout'])
    }
  }


}
