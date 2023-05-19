import { Component, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { ShoppingCart } from '../model/shoppingCart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input ('product') product :any;
  @Input('show-action') showAction=true
  @Input ('shoppingCart')shoppingcart!:ShoppingCart

  constructor(private cartService:CartService){
  }

  addtoCart(){
    console.log(this.shoppingcart)

    this.cartService.addToCart(this.product)
  }
}
