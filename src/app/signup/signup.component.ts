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
    private formBuilder:FormBuilder,
    private socialAuthService: SocialAuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.useRegistrationForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      password: ['',Validators.required]

    });
    this.isLoggedin = false;
  }

  get name():any{
    return this.useRegistrationForm.get('name');
  }

  get email():any{
    return this.useRegistrationForm.get('email')
  }

  get password():any{
    return this.useRegistrationForm.get('password');
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }
  onFormSubmit(): void {
    this.formSubmitted = true;
    if (this.useRegistrationForm.valid) {
      console.log(this.useRegistrationForm);
    } else {
      this.formSubmitted = false;
    }
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }
}
