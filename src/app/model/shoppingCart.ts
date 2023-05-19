import { shoppingCartItems } from "./shoppingCartItems";
export class ShoppingCart{
items:shoppingCartItems[]=[]
constructor(private ItemsMap:{ [key:string] :shoppingCartItems}){
    this.ItemsMap= ItemsMap || {}; 

 for(let productId in ItemsMap)
{     
    let item = ItemsMap[productId]   
    this.items.push(new shoppingCartItems({...item, key:productId}) )
}}

getQuantity(product:any){
    let item = this.ItemsMap[product.key]

  return item ? item.quantity:0
  
  }
    get TotalPrice(){
        let sum=0
        for(let productID in this.items)
            sum += this.items[productID].totalPrice
            return sum
    }
     
    get TotalItemCount(){
        let count=0 ;   
        for (let productId  in this.items) 
       count += this.items[productId].quantity
       return count;
    }
}