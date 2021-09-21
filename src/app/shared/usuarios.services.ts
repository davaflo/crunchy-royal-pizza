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
import { usuario } from '../models/usuario.model';
import { ToastrService } from 'ngx-toastr';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};
@Injectable()
export class UsuarioService {
  res: response;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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
          var formattedName = user.nombre.replace(' ', '-');
          this.router.navigateByUrl('menu/' + formattedName);
        } else {
          this.toastr.success(data.message, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-top-full-width',
          });
        }
      });
  }
}
