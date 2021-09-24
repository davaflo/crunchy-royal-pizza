import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, Routes } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { login } from '../models/login.model';
import { response } from '../models/response.model';
import { DataService } from '../shared/data.service';
import { UsuarioService } from '../shared/usuarios.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private userService: UsuarioService,
    private shared:DataService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  this.isLoggedin = false;
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.userService.userExists(user);
  
      console.log(user);
    });
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.userService.userExists(user);
    });
  }

  onFormSubmit() {
    let Email = this.loginForm.get('email').value;
    let Password = this.loginForm.get('password').value;

    this.isLoggedin = this.userService.login(Email, Password);
    // this.shared.data  =  this.isLoggedin;
    
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.isLoggedin = false;
  }
}
