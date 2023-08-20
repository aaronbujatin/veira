import { Component } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-newarrival',
  templateUrl: './product-newarrival.component.html',
  styleUrls: ['./product-newarrival.component.css']
})
export class ProductNewarrivalComponent {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getNewArrivalProducts();
  }

  products: Product[];

  public getNewArrivalProducts() {
    this.productService.getProductByCatalog("Japanese Street Fashion").subscribe(
      (response: Product[]) => {
        this.products = response
       
        
      }
    )
  }




}
