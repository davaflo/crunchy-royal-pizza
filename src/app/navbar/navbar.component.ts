import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { DataService } from '../shared/data.service';
import { UsuarioService } from '../shared/usuarios.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name: any;
  socialUser: SocialUser;
  isLoggedin: boolean;  
  email:any;

  constructor(private router: ActivatedRoute,
    private rout: Router,
    private socialAuthService: SocialAuthService,
    private userService :UsuarioService,
    private shared:DataService
  ) {

    console.log(this.router.snapshot.paramMap.get('id'));
    if(this.router.snapshot.paramMap.get('id') !=''){
      this.isLoggedin = this.shared.data;   
    }
  }

  ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);   
      this.name = user.name;
      this.email = user.email;
      this.userService.userExists(this.socialUser);
    });

  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.isLoggedin = false;
    this.rout.navigateByUrl("menu/");
  }
}
