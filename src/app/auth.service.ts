import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of, switchMap } from 'rxjs';
import { User } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AppUser } from './app-user';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User> ;
  
  constructor(private userService:UserService,private afAuth:AngularFireAuth,private route: ActivatedRoute,private fireauth : AngularFireAuth, private router : Router) { 
    this.user$  = afAuth.authState  as Observable<User>;
  }
  loginWithGoogle(){
    
      let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl',returnUrl)
      this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }
  logout(){ 
    this.afAuth.signOut();
  }
  get appUser$() : Observable<AppUser | null>{
    return this.user$
    .pipe(switchMap(user=> {
        if (user) return this.userService.get(user.uid).valueChanges()
        return of(null);
        }))
  }  

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');

        if(res.user?.emailVerified == true) {

          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['/varify-email']);
        }
        

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  // logout() {
  //   this.fireauth.signOut().then( () => {
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     alert(err.message);
  //   })
  // }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
   
   
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl)
    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }
}
