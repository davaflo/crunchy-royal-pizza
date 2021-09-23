import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink, Routes } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { usuario } from '../models/usuario.model';
import { UsuarioService } from '../shared/usuarios.services';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  title = 'frontend';

  useRegistrationForm: FormGroup;
  formSubmitted: boolean;
  socialUser: SocialUser;
  isLoggedin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private userService: UsuarioService,
    private sharedData :DataService
  ) {}

  ngOnInit() {
    this.useRegistrationForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      hash_password: ['', Validators.required],
    });
    this.isLoggedin = false;
  }

  get nombre(): any {
    return this.useRegistrationForm.get('nombre');
  }

  get email(): any {
    return this.useRegistrationForm.get('email');
  }

  get hash_password(): any {
    return this.useRegistrationForm.get('hash_password');
  }

  signUpWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.sharedData.data  = this.isLoggedin;
      this.userService.addSocialUser(user);
      console.log(this.socialUser);
    });
  }
  onFormSubmit(): void {
    this.formSubmitted = true;
    if (this.useRegistrationForm.valid) {
      this.userService.addUserForm(this.useRegistrationForm.value);
      this.isLoggedin = true;
      this.sharedData.data = this.isLoggedin;
    } else {
      this.formSubmitted = false;
    }
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.isLoggedin = false;
    this.sharedData.data = this.isLoggedin;
  }
}
