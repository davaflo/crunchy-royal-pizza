import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, Routes } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;  
  
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.isLoggedin = false;
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
  }

  loginWithFacebook():void{
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

  this.socialAuthService.authState.subscribe((user)=>{
    this.socialUser = user;
    this.isLoggedin = (user != null);

  });

  }

  
  goToSignUp():void {

    this.router.navigate(['/signup-component']);
  }


  logOut(): void {
    this.socialAuthService.signOut();
  }


}
