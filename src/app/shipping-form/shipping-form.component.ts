import { Component , OnInit , OnDestroy, Input} from '@angular/core';
import { ShoppingCart } from '../model/shoppingCart';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Shipping } from './shipping';
import { Payment } from './payment';
import { AuthService } from '../auth.service';
import { Order } from '../order';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CartService } from '../cart.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit , OnDestroy{
  @Input('cart') cart! : any
  @Input('member') member! : boolean
  shipping = {
    fName: "",
    lName: "",
    phone:null,
    addressLine1:"",
    addressLine2:"",
    country:"",
    state:"",
    zip :null
  }; 
  payment = {
    type: "",
    fName: "",
    lName: "",
    cardNum:"",
    expiration:"",
    cvv:"",
    addressLine1:"",
    addressLine2:"",
    country:"",
    state:"",
    zip:"",
    phone:"",
  }; 
    userId!:string;
    userSubscription!:Subscription
    states=[""]
    pstates=[""]
    pcountry!:string
    country!:string
    selectedType:any
    ship:any;
    cardPattern = "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$"
    cvvPattern = "^[0-9]{3,4}$"
    expirationPattern="^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$"
  constructor(private router: Router,private authService: AuthService,private orderservice :OrderService,private db: AngularFireDatabase, private route: ActivatedRoute, private shoppingCartService: CartService){}
  ngOnInit() {

    this.getShippingByUser().subscribe((s: any) => {
        this.setShip(s)
      })
      this.getPaymentByUser().subscribe((p: any) => {
        this.setPayment(p)
      
      })
      this.userSubscription=this.authService.user$.subscribe(user => this.userId=user.uid)

    
  }
  payments=['Credit Card','Debit Card','Paypal']
  radioChangeHandler(event:any){
     this.selectedType=event.target.value;
     this.payment.type=this.selectedType
  }

  getShippingByUser() {
    return this.db.object<Shipping>('users/' + this.userId + '/shipping/').snapshotChanges()
  }
  getPaymentByUser() {
    return this.db.object<Payment>('users/' + this.userId + '/billing/').snapshotChanges()
  }
  
  setShip(s:any){
    this.shipping.fName=s.payload.val().fName;
    this.shipping.lName=s.payload.val().lName;
    this.shipping.phone=s.payload.val().phone;
    this.shipping.addressLine1=s.payload.val().addressLine1;
    this.shipping.addressLine2=s.payload.val().addressLine2;
    this.country=this.shipping.country=s.payload.val().country;
    this.shipping.state=s.payload.val().state;
    this.shipping.zip=s.payload.val().zip;
    this.setState()
  }
  setPayment(p: { payload: { val: () => { (): any; new(): any; fName: string; lName: string; phone: string; addressLine1: string; addressLine2: string; country: string; state: string; zip: string; type: string; cardNum: string; expiration: string; cvv: string; }; }; }){
    this.payment.fName=p.payload.val().fName;
    this.payment.lName=p.payload.val().lName;
    this.payment.phone=p.payload.val().phone;
    this.payment.addressLine1=p.payload.val().addressLine1;
    this.payment.addressLine2=p.payload.val().addressLine2;
    this.pcountry=  this.payment.country=p.payload.val().country;
    this.payment.state=p.payload.val().state;
    this.payment.zip=p.payload.val().zip;
    this.payment.type=p.payload.val().type;
    this.payment.cardNum=p.payload.val().cardNum;
    this.payment.expiration=p.payload.val().expiration;
    this.payment.cvv=p.payload.val().cvv;
    this.setState()
  }
  checkState(state: string){
    if(this.shipping.state==""){
      if(this.country=="United States"){
        this.shipping.state="Alabama"
      }
      else if(this.country=="United Kingdom"){
        this.shipping.state="Bedfordshire"
      }
      else if(this.country=="Canada"){
        this.shipping.state="Alberta"
      }
    }
    else if(this.payment.state==""){
       if(this.pcountry=="United States"){
        this.payment.state="Alabama"
      }
      else if(this.pcountry=="United Kingdom"){
        this.payment.state="Bedfordshire"
      }
      else if(this.pcountry=="Canada"){
        this.payment.state="Alberta"
      }
    }
    else if(this.shipping.state!=""){
      this.shipping.state=state
    }
    else if(this.payment.state!=""){
      this.payment.state=state
    }
  }
  setState(){
    if(this.country =="United States"){
      this.checkState(this.shipping.state)
      this.states =["Alabama","Alaska","Arizona","California","Colorado","Florida","Georgia","Hawaii","Illionis","Kentucky","Maryland","Massachusetts","New York","Texas",]
      }
    if(this.country =="United Kingdom"){
      this.checkState(this.shipping.state)
      this.states =["Bedfordshire","Buckinghamshire","Essex","Hampshire","Oxfordshire","Warwickshire","Sussex"]
      
    }
    if(this.country=="Canada"){
      this.checkState(this.shipping.state)
      this.states =["Alberta","British Columbia","Manitoba","Nunavut","Ontario","Quebec","Yukon"]
     
    }
    if(this.pcountry=="United States"){
      this.checkState(this.payment.state)
      this.pstates =["Alabama","Alaska","Arizona","California","Colorado","Florida","Georgia","Hawaii","Illionis","Kentucky","Maryland","Massachusetts","New York","Texas",]
    }
    if(this.pcountry=="United Kingdom"){
      this.checkState(this.payment.state)
      this.pstates =["Bedfordshire","Buckinghamshire","Essex","Hampshire","Oxfordshire","Warwickshire","Sussex"]
   
    }
    if(this.pcountry=="Canada"){
      this.checkState(this.payment.state)
      this.pstates =["Alberta","British Columbia","Manitoba","Nunavut","Ontario","Quebec","Yukon"]
    }
    
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
 
  private getShipping() {
    return this.db.object('/users/' + this.userId + '/shipping/');
  }
  private getPayment() {
    return this.db.object('/users/' + this.userId + '/billing/');
  }
    updateUser(){
      if(this.member==true){
    let item$ = this.getShipping();
    
    item$.snapshotChanges().pipe(take(1)).subscribe(() => {
            item$.update({
           
                fName: this.shipping.fName,
                lName:  this.shipping.lName,
                addressLine1: this.shipping.addressLine1,
                addressLine2: this.shipping.addressLine2,
                country:  this.shipping.country,
                state: this.shipping.state,
                zip:  this.shipping.zip,
                phone: this.shipping.phone,
            });
          
      
    });
  
      let item2$ = this.getPayment();
      item2$.snapshotChanges().pipe(take(1)).subscribe(() => {
        item2$.update({
            fName: this.payment.fName,
            lName:  this.payment.lName,
            addressLine1: this.payment.addressLine1,
            addressLine2: this.payment.addressLine2,
            country:  this.payment.country,
            state: this.payment.state,
            zip:  this.payment.zip,
            phone: this.payment.phone,
            type: this.payment.type,
            cardNum: this.payment.cardNum,
            expiration: this.payment.expiration,
            cvv: this.payment.cvv,
  
        });
      
     });
  }
 }
  onNgModelChange(e: any) { 
    if(e){
     
      this.payment.fName = this.shipping.fName
      this.payment.lName = this.shipping.lName
      this.payment.addressLine1 = this.shipping.addressLine1
      this.payment.addressLine2 = this.shipping.addressLine2
      this.pcountry=this.payment.country = this.shipping.country
      this.payment.state = this.shipping.state
      this.payment.zip = this.shipping.zip as unknown as string
      this.payment.phone = this.shipping.phone as unknown as string
      this.setState();
    }
    else{
      this.payment.fName= ""
      this.payment.lName= ""
      this.payment.addressLine1=""
      this.payment.addressLine2=""
      this.payment.country=""
      this.payment.state=""
      this.payment.zip=""
      this.payment.phone=""
    }
  }
  async placeOrder() {
    let order= new Order(this.userId,this.shipping,this.cart)
    let result=await this.orderservice.placeOrder(order)
    
  }

  
}
