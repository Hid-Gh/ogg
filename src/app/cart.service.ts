import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, take } from 'rxjs';
import { ShoppingCart } from './model/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db:AngularFireDatabase) { }

  private create(){
   return this.db.list("/cart").push({
      dateCreated:new Date().getTime()
  });
  }

  async getCart():Promise<Observable<ShoppingCart>> {
    let cartId= await this.getorCreate()

    return this.db.object('/cart/'+cartId).valueChanges()
    .pipe(map((x)=>(x)? new ShoppingCart((x as any).Items):(x as any)))

  }

  private async getorCreate(){
    let cartid =  localStorage.getItem('cartID')
    if(cartid) return cartid

    let result = await this.create();
    localStorage.setItem('cartID',result.key as string)
    return result.key
  } 

  private getItem(cartid:string|null , productID:string){
    return this.db.object('/cart/' + cartid + '/Items/' + productID)
  }
   addToCart(product:any){
       this.updateCart(product,1)      
  }

  removeCart(product:any){
    this.updateCart(product ,-1)
  }


   async updateCart(product:any , change : number){
    let cartid = await this.getorCreate();
    let item$ = this.getItem(cartid,product.key)
    item$.snapshotChanges().pipe(take(1)).subscribe((item:any)=>{

      let qty = (item.payload.val()?.quantity || 0 )+ change 
      if(qty === 0) {
        item$.remove()
      }
      
  else{
    if(item.payload.exists())
       item$.update({  quantity:( item.payload.val().quantity )+ change })
  
     else{
       item$.update({
         
           title: product?.payload?.val()?.title,
           price:  product?.payload?.val()?.price,
           category:  product?.payload?.val()?.category,
           imageUrl:  product?.payload?.val()?.imageUrl,
           callories :product?.payload?.val()?.calories,
           quantity: qty
       });
     }
  }
     
     });
  
  }

  async clearCart(){
    let cartId = await this.getorCreate();
    return this.db.object(('/cart/'+cartId +'/Items/')).remove()
  }

  }






