import { ShoppingCart } from "./shoppingCart";

export class orders{
    datePlaced:number;
    items :any[]
    constructor( shoppingCart:ShoppingCart , public userId:number,public shipping:any){
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart .items.map(i =>{
                return{
                    product:{
                        title:i.title,
                        price:i.price,
                        imageUrl:i.imageUrl
                    },
                    quantity:i.quantity,
                    totalPrice:i.totalPrice
                };

        })

    }
}