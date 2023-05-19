import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../model/shoppingCart';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
cartIcon = faShoppingCart;
homeIcon = faHome
searchIcon = faSearch
barIcon = faBars
cart$?:Observable<ShoppingCart>
categry!:any
faperson=faSignInAlt
subscription!:Subscription

    constructor(private cartService:CartService , private category:CategoryService ){
            
    }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
    this.categry=this.category.getCategories()

  }

  
}
