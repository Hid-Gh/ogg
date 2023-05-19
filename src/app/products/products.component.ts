import { Component,OnDestroy ,OnInit } from '@angular/core';
import { Observable, Subscription, async, map, switchMap } from 'rxjs';
import { products } from '../model/products';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../model/shoppingCart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit ,OnDestroy {
 

  
  products:any[] =[]//:Product[]
  filteredProducts:any[]=[]//: Product[]
  category!: string|null
  cart$!:Observable<ShoppingCart>
  categories$!: Observable<any>;
  subscription!: Subscription;
  cart!:any

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: CartService,
    private categoryservice:CategoryService) 
    { 
         
    }
  
  async ngOnInit(){
    this.subscription =  (await this.shoppingCartService.getCart()).subscribe(c=>this.cart=c)
    this.categories$ = this.categoryservice.getCategories();
    this.populateProducts();
  }
  
ngOnDestroy(): void {
  this.subscription.unsubscribe()
}


  private populateProducts(){
    this.productService.getAll()
    .pipe(switchMap(products => {
      this.products = products as products[]
       return this.route.queryParamMap;
    }))
    .subscribe(params => {
        this.category = params.get('category');  
        this.applyFilter();
       
    }) 
  }

  private applyFilter(){
    this.filteredProducts=(this.category)?
    this.products.filter(p =>p.payload.val().category?.trim().toLowerCase() == this.category?.trim().toLowerCase()) :
    this.products;
  }

    filterProduct(query:string)
    {
      this.filteredProducts=(query) ? this.products.filter(p=>p.payload.val().title?.toLowerCase().includes(query.toLowerCase()))
      : this.products
    }
}