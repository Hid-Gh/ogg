import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { products } from '../model/products';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories$:any;
 
  //: Product;    //the error(title is null) persists and sth else I should do is the red warnings should show and category also not showing
    id:any;
    public product:products = {
      title:'',
      price:0,
      imageurl:'',
      calories :'',
      orders :''
  };
    constructor(private route: ActivatedRoute,private router: Router,private db: AngularFireDatabase) { 
  
    }
    create(product: products){
      console.log(product)
      this.db.list('/products').push(product);
    }
    navigateToMenu() {
      this.router.navigate(['/products']);
    }
}
