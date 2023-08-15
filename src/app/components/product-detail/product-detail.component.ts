import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
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
    private titleService: Title,

    private toastr: ToastrService) { }

  ngOnInit() {

    this.route.params.subscribe(params => this.getProductById(params['id']))

  }



  addToCart(product: any): void {
    if (!this.productSize === undefined) {
      this.cartService.addToCart(product, this.productSize, this.quantity);
      console.log(this.cartService.addToCart(product, this.productSize, this.quantity));
      this.showSuccess();
       console.log(this.cartService.addToCart(product, this.productSize, this.quantity))

    } else if (this.productSize === undefined) {
      this.productAlreadyInCartWarn();
      console.log(this.productSize);
    }


  }


  showSuccess() {
    this.toastr.success('Item was added to cart, Baby!','Veira Co.',{positionClass: 'toast-bottom-left', });
  }

  productAlreadyInCartWarn(){
    this.toastr.success('Item was already in cart','Veira Co.',{positionClass: 'toast-bottom-left', });
  }

  showSelectSizeWarn(){
    this.toastr.success('Select item size','Veira Co.',{positionClass: 'toast-bottom-left', });
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



  selectedSize: string;

  showStock(size: string): void {
    this.selectedSize = size;
  }

  getStock(size: string): number {
    const selectedSize = this.product.variants.find(s => s.size === size);
    return selectedSize ? selectedSize.stock : 0;
  }

  productSize: string

  selectSize(size: string) {
    this.productSize = size;
    console.log(this.productSize);

    // You can perform additional actions if needed
  }





  quantity: number = 1

  increment() {
    this.quantity = this.quantity + 1;
    console.log(this.quantity);

  }

  shouldDisableButton(): boolean {
    return this.quantity <= 1; // Return true if quantity is 1 or less
  }

  decrement() {
    this.quantity -= 1;

  }


}
