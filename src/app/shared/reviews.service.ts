import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http:HttpClient) { }


  getReviewsById(id): Observable<response>{
    return this.http.get<response>(`https://localhost:44382/api/reviews/${id}`);
  }

}
