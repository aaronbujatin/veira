import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from './../../model/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   
  }

  catalogJapanese: Product[]
  catalogSkatewear: Product[]
  catalogTeddyBear: Product[]
  catalogCars: Product[]
  catalogHipHopArtists: Product[]
  catalogUrban: Product[]
  catalogRenaissance: Product[]
  catalogHypeBeasts: Product[]


}
