import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }
  getCategories(){
    return this.db.list('/categories', ref=>ref.orderByChild('name')).snapshotChanges()
   
  }
  getcomment(postId:any , offset:any , startKey?:any){
      return this.db.list(`categories`)
  }
}
