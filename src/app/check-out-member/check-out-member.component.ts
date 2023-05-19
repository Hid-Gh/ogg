import { Component, OnInit ,OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { ShoppingCart } from '../model/shoppingCart';
import { Observable, Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { orders } from '../model/orders';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-check-out-member',
  templateUrl: './check-out-member.component.html',
  styleUrls: ['./check-out-member.component.css']
})
export class CheckOutMemberComponent implements OnInit {
  cart$!: Observable<ShoppingCart>;
  
  constructor(private shoppingCartService: CartService){}
  async ngOnInit(){
    this.cart$= await  this.shoppingCartService.getCart();

  }

   
}
