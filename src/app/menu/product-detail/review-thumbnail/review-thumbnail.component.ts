import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { review } from 'src/app/models/review.model';
import { ReviewsService } from 'src/app/shared/reviews.service';

@Component({
  selector: 'app-review-thumbnail',
  template: `
    <div class="list container">
      <h3 *ngIf="listReviews?.length > 0" class="text-center">Reviews</h3>

      <ul *ngFor="let review of listReviews">
        <li style="margin-bottom: 10px;">
          <div class="card">
            <h5 class="card-header">{{ review.emailUsuario }}</h5>
            <div class="card-body">
              <!-- <h5 class="card-title">Special title treatment</h5> -->
              <p class="card-text">{{ review.descripcion }}</p>
            </div>
          </div>
        </li>
      </ul>

      <div class="card">
        <h5 class="card-header">Create Review</h5>
        <div class="card-body">
          <div class="form-group container"></div>
          <form [formGroup]="reviewForm" (ngSubmit)="onFormSubmit()">
          <p>
            <label for="email">Email: </label>&nbsp;
            <input class="form-control" type="text" id="email" name="email" formControlName="email">

          </p>

          <div
          *ngIf="!email?.valid && (email?.dirty || email?.touched )">
          <small [hidden]="!email.errors.required" style="color: red;">
            Email is required
          </small>
           </div>

           <p>
            <label for="direccion">Descipcion: </label>&nbsp;
            <input class="form-control" type="text" id="direccion" name="direccion" formControlName="descripcion" >

          </p>

          <div
          *ngIf="!descripcion?.valid && (descripcion?.dirty || descripcion?.touched )">
          <small [hidden]="!descripcion.errors.required" style="color: red;">
            Descripcion es obligatoria
          </small>
           </div>

           <p>
             <button class="container btn btn-success" type="submit" [disabled]="!reviewForm" >Submit Review</button>
           </p>

        </form>


        </div>
      </div>
    </div>
  `,
  styles: [
    `
      li {
        list-style: none;
      }
    `,
  ],
})
export class ReviewThumbnailComponent implements OnInit {
  listReviews: review[] = [];
  reviewForm: FormGroup;
  @Input() product_id: any;

  constructor(
    private reviewService: ReviewsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    
  ) {}

  ngOnInit(): void {
    let prod_id = this.route.snapshot.params.id;

    console.log(prod_id);

    this.reviewForm = this.formBuilder.group({
      email: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.reviewService.getReviewsById(prod_id).subscribe((data) => {
      this.listReviews = data.data;
      console.log(data);
    });
  }

  get email(): any {
    return this.reviewForm.get('email');
  }

  get descripcion(): any {
    return this.reviewForm.get('descripcion');
  }
  onFormSubmit(){
    let model = new review();
    model.Id_Producto = Number(this.route.snapshot.params.id);
    model.Email_Usuario = this.reviewForm.get('email').value;
    model.Descripcion = this.reviewForm.get('descripcion').value;

    console.log(model);
    this.reviewService.addReview(model);

  }
}
