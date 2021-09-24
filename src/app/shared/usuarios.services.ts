import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink, Routes } from '@angular/router';
import { producto } from '../models/producto.model';
import { response } from '../models/response.model';
import { login } from '../models/login.model';
import { usuario } from '../models/usuario.model';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { DataService } from './data.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};
@Injectable()
export class UsuarioService {
  res: response;
  isLoggedin : boolean;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private shared:DataService
  ) {}

  addUserForm(user: usuario) {
    user.esSocial = 0;
    user.id_tipo = 2;

    this.http
      .post<response>('https://localhost:44382/api/usuarios', user)
      .subscribe((data) => {
        if (data.success === 1) {
          console.log(data);
          this.toastr.success(data.message, 'Success', {
            timeOut: 1000,
            positionClass: 'toast-top-full-width',
          });

          this.router.navigateByUrl('menu/' + user.email);
        } else {
          this.toastr.error(data.message, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-top-full-width',
          });
        }
      });
  }

  addSocialUser(socialUser: SocialUser) {
    let user: usuario = new usuario();

    user.esSocial = 1;
    user.id_tipo = 2;

    user.hash_password = null;
    user.email = socialUser.email;
    user.nombre = socialUser.name;
    console.log(user);

    this.http
      .post<response>('https://localhost:44382/api/usuarios', user)
      .subscribe((data) => {
        if (data.success === 1) {
          this.toastr.success(data.message, 'Success', {
            timeOut: 2000,
            positionClass: 'toast-top-full-width',
          });
          this.router.navigateByUrl('menu/'+ user.email);
       
        }else{

        }
      });
  }


  userExists(social:SocialUser):boolean{
    
    this.http.get<response>(`https://localhost:44382/api/usuarios/${social.email}`).subscribe(data => {
     if(data.data === null){
       this.toastr.error('This email is not registered...','Error', {
        timeOut: 2000,
        positionClass: 'toast-top-full-width',
       })
     }else {
      this.router.navigateByUrl('menu/'+ data.data.eMail);
    
      return true;
     }
    });
    return false;
  }


  login(email:string, password:string){
    let log = new login();
    log.Email = email;
    log.Password = password;

    this.http
    .post<response>('https://localhost:44382/api/login',log).subscribe((data) =>{
      if(data.success === 1){
        this.toastr.success(data.message , 'Success', {
          timeOut: 1000,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl('menu/'+ email);
        this.shared.data = true;
        return true;
      }else{
        this.toastr.error(data.message, 'Error', {
          timeOut:3000,
          positionClass:'toast-top-full-width',
        });

      }
    });
    return false;
  }

  }

