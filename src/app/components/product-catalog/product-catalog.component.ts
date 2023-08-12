import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent {

  constructor(private productService: ProductService, private elementRef: ElementRef) { }

  ngOnInit() {

    this.categories.forEach(category => {
      this.fetchProductsForCategory(category);
    });
  }

  [x: string]: any;

  @Input() test: string

  @Input() products: Product[] = [];


  catalog = [
    'Japanese Street Fashion',
    'Skatewear Collections',
    'Teddy Bear Collections',
    'Cars Collections',
    'Hip Hop Artists Collections',
    'Urban Collections',
    'Renaissance Collections',
    'Sportswear Collections',
    'HypeBeasts Collections',
  ]

  categories: string[] = ['Japanese Street Fashion', 'Skatewear Collections', 'Teddy Bear Collections', 'Cars Collections',
    'Hip Hop Artists Collections', 'Urban Collections', 'Renaissance Collections', 'Sportswear Collections', 'HypeBeasts Collections'];
  categoryProducts: { [category: string]: Product[] } = {};

  fetchProductsForCategory(category: string) {
    this.productService.getProductByCatalog(category).subscribe(
      (response: Product[]) => {
        this.categoryProducts[category] = response;
        console.log(this.categoryProducts[category]);

      }
    );
  }

  currentSlideIndex = 0;

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.categories.length) % this.categories.length;
  }
  
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.categories.length;
  }


  @Input() catalogTitle: string = '';
  // currentIndex: number = 0;
  // itemWidth: number = 410; // Adjust this according to your design

  // goNext(category: string) {
  //   const productsArray = this.categoryProducts[category];
  //   if (productsArray) {
  //     this.currentIndex = (this.currentIndex + 1) % productsArray.length;
  //     this.updateSliderPosition(); // Update the slider position
  //   }
  // }

  // goPrev(category: string) {
  //   const productsArray = this.categoryProducts[category];
  //   if (productsArray) {
  //     this.currentIndex = (this.currentIndex - 1 + productsArray.length) % productsArray.length;
  //     this.updateSliderPosition(); // Update the slider position
  //   }
  // }

  // updateSliderPosition() {
  //   const newPosition = -this.currentIndex * this.itemWidth;
  //   this['sliderContainer'].nativeElement.style.transform = `translateX(${newPosition}px)`;
  // }


  // getProductJapaneseCatalog() {
  //   this.productService.getProductByCatalog(this.catalog[0]).subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //       console.log(this.products);
  //     }
  //   )
  // }

  // getProductSkatewearCatalog() {
  //   this.productService.getProductByCatalog(this.catalog[1]).subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //       console.log(this.products);

  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  // }

  // getProductTeddyBearCatalog() {
  //   this.productService.getProductByCatalog(this.catalog[2]).subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //     }
  //   )
  // }

  // getProductCarsCatalog() {
  //   this.productService.getProductByCatalog(this.catalog[3]).subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //     }
  //   )
  // }

  // getProductHipHopArtistsCatalog() {
  //   this.productService.getProductByCatalog(this.catalog[4]).subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //     }
  //   )
  // }

  // getProductUrbanCatalog() {
  //   this.productService.getProductByCatalog(this.catalog[5]).subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //     }
  //   )
  // }

  // getProductRenaissanceCatalog() {
  //   this.productService.getProductByCatalog(this.catalog[6]).subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //     }
  //   )
  // }

  // getProductSportswearCatalog() {
  //   this.productService.getProductByCatalog(this.catalog[7]).subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //     }
  //   )
  // }

  // getProductHypeBeastsCatalog() {
  //   this.productService.getProductByCatalog(this.catalog[8]).subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //     }
  //   )
  // }


}
