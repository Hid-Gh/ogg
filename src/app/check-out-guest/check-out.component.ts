import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../model/shoppingCart';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  cart$!: Observable<ShoppingCart>;
  
  constructor(private shoppingCartService: CartService){}
  async ngOnInit(){
    this.cart$= await  this.shoppingCartService.getCart();
  }
}
