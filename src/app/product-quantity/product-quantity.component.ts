import { Component, Input } from '@angular/core';
import { CartService } from '../cart.service';
import { products } from '../model/products';
import { ShoppingCart } from '../model/shoppingCart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input ('product') product !:products
  @Input ('shoppingCart')shoppingcart!:ShoppingCart


  constructor(private cartService:CartService){
      
  }
  addToCart(){
    this.cartService.addToCart(this.product)
   }
 
   removeCart(){
     this.cartService.removeCart(this.product)
   }
 
}
