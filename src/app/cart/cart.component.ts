import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Cart[];

  constructor(  private sharedData: DataService) { }

  ngOnInit(): void {
    this.cartItems = this.sharedData.data;
    console.log(this.cartItems[0].Product);
  }

}
