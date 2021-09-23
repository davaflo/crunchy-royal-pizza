import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { review } from 'src/app/models/review.model';
import { ReviewsService } from 'src/app/shared/reviews.service';

@Component({
  selector: 'app-review-thumbnail',
  template: `
    <div class="list container">
      <h3 *ngIf="listReviews?.length > 0" class="text-center">Reviews</h3>

      <ul *ngFor="let review of listReviews">
        <li  style="margin-bottom: 10px;">
          <div class="card">
            <h5 class="card-header">{{ review.emailUsuario }}</h5>
            <div class="card-body">
              <!-- <h5 class="card-title">Special title treatment</h5> -->
              <p class="card-text">{{ review.descripcion }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
  li{
	list-style: none;
}`],
})
export class ReviewThumbnailComponent implements OnInit {
  listReviews: review[] = [];
  @Input() product_id: any;

  constructor(
    private reviewService: ReviewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let prod_id = this.route.snapshot.params.id;

    console.log(prod_id);

    this.reviewService.getReviewsById(prod_id).subscribe((data) => {
      this.listReviews = data.data;
      console.log(data);
    });
  }
}
