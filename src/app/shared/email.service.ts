import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import email from '../models/email.model.js';
import { response } from '../models/response.model.js';
import './../../assets/smtp.js';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root',
})
export class EmailService {
  Email: any;
  constructor(private http:HttpClient) {}

  sendEmail(email:email) {
    this.http.post<response>('https://localhost:44382/api/email', email).subscribe();
  }
}
