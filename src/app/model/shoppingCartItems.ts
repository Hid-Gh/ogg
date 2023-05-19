import { products } from "./products";

export class shoppingCartItems{
    key!:string;
    title!:string;
    price!:number;
    imageUrl!:string;
    quantity!:number
    
    constructor(init?:Partial<shoppingCartItems>) {
            Object.assign(this,init)
    }
    get totalPrice(){
        return this.price * this.quantity
    }
}