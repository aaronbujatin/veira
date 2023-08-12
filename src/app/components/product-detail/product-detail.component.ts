import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
    private cartService : CartService,
    private titleService : Title) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.getProductById(params['id']))
    console.log(this.product);

  }

  addToCart(product : any): void {
    this.cartService.addToCart(product);
  }

  product: Product = new Product
  variants: Variant[]

  public getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      (response: Product) => {
        this.product = response
        this.titleService.setTitle(` ${this.product.name} Veira Co.`)
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
