import { Component } from '@angular/core';
import { AppUser } from '../app-user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email : string = '';
  password : string = '';
  appUser!:AppUser;
  constructor(private auth : AuthService,private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(x=>console.log(x))
   }

  ngOnInit(): void {
    // this.auth.appUser$.subscribe(appUser => this.appUser =appUser);
  
  }

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
 
}
