import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ShoppingCart } from '../model/shoppingCart';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
cart$ !: Observable<ShoppingCart>

    constructor(private cartService:CartService){

    }

    async ngOnInit() {
      this.cart$ = (await this.cartService.getCart())
    }

    clearCart(){
      this.cartService.clearCart()
    }
}
