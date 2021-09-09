import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { producto } from '../models/producto.model';
import { response } from '../models/response.model';

@Injectable()
export class ProductoService {
  constructor(private http: HttpClient) {}

  

  getAllProductos(): Observable<response> {
    return this.http.get<response>('https://localhost:44314/api/producto');
   
  }

  
}
