import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../model/shoppingCart';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
  @Input('cart') cart!: ShoppingCart;
}
