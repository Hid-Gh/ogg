import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.user$.pipe(map(user => {
          if(user) return true;
           this.router.navigate(['/login'],{queryParams: {returnUrl:state.url}});
           return false;
  }))
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //     if (localStorage.getItem('token') != null){
       
  //       return true;
  //     }
      
      
  //   else {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  // }
  
}
