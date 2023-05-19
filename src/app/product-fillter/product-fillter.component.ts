import { Component, Input } from '@angular/core';
import { Observable } from '@firebase/util';
import { CategoryService } from '../category.service';
import { SnapshotAction } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'product-fillter',
  templateUrl: './product-fillter.component.html',
  styleUrls: ['./product-fillter.component.css']
})
export class ProductFillterComponent {
  @Input('category') category:any ;
  category$:any
  selectedIndex!:number
  constructor( 
    private categoryService:CategoryService,
    private route:ActivatedRoute
    ){

  this.category$=categoryService.getCategories()
  }

  setRow(index:number){
    this.selectedIndex=index
  }
}
