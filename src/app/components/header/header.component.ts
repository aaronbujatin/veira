import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartSize: number


  constructor(private cartService: CartService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.cartService.getCartSize().subscribe(size => {
      this.cartSize = size;
    }); 
  }

 

}



