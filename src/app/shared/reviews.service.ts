import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { response } from '../models/response.model';
import { review } from '../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  getReviewsById(id): Observable<response> {
    return this.http.get<response>(`https://localhost:44382/api/reviews/${id}`);
  }

  addReview(model: review) {
    this.http
      .post<response>('https://localhost:44382/api/reviews', model)
      .subscribe((data) => {
        if (data.success === 1) {
          this.toastr.success(
            'Your review has been added...',
            'Success',
            {
              timeOut: 5000,
              positionClass: 'toast-bottom-full-width',
            }
          );
          this.router.navigateByUrl(`products/${model.Id_Producto}`);
        } else {
          this.toastr.error(data.message, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-full-width',
          });
        }
      });
  }
}
