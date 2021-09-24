import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import orden from '../models/orden.model';
import { response } from '../models/response.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private shared: DataService
  ) {}

  addOrder(model: orden) {
    this.http
      .post<response>('https://localhost:44382/api/ordencompra', model)
      .subscribe((data) => {
        if (data.success === 1) {
          console.log(data);
          this.toastr.success(
            'Your order has been placed, please check your email for further details...',
            'Success',
            {
              timeOut: 5000,
              positionClass: 'toast-bottom-full-width',
            }
          );
          this.router.navigateByUrl('menu/' + model.Email);
          this.shared.data = true;
        } else {
          this.toastr.error(data.message, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-full-width',
          });
        }
      });
  }
}
