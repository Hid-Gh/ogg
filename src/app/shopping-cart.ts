
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart{
    items: ShoppingCartItem[]=[]
   
    constructor(private itemsMap: {[productId:string]:ShoppingCartItem}){
        this.itemsMap = itemsMap || {}
        for(let productId in itemsMap){
                       // console.log("bitch shopping-cart " + item.product.title + item.quantity)   
                       let item=itemsMap[productId];
                       let s= new ShoppingCartItem({
                        // title: item.title,
                        // imageUrl:item.imageUrl,
                        // price:item.price,
                        ...item,
                        key: productId
                       })
                //        Object.assign(s,item)
                //        s.key=productId
                       this.items.push(new ShoppingCartItem({
                        ...item,
                        key:productId
                       })) 
            }
    }  
    getQuantity(product: { key: string | number; }){
        //item.quantity
        //console.log(product.payload.val().title)
       
        let item = this.itemsMap[product.key]

       
        return item ? item?.quantity : 0
       
    }
    get totalPrice(){
            let sum=0;
            for(let productId in this.items)
                       sum+= this.items[productId].totalPrice
            
         
           return sum
            
    }
  
    get totalItemsCount(){
            let count=0;
            for(let productId in this.items){
                
                count += this.items[productId].quantity;

            }
            
            return count

     }
}