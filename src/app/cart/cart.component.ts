import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../models/cart.model';
import email from '../models/email.model';
import orden, { oxp } from '../models/orden.model';
import { DataService } from '../shared/data.service';
import { EmailService } from '../shared/email.service';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Cart[];
  total: any = 0;

  orderForm: FormGroup;

  constructor(
    private sharedData: DataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private emailService: EmailService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.sharedData.data;
    this.getTotalNeto();
    this.orderForm = this.formBuilder.group({
      email: [this.route.snapshot.params.id, Validators.required],
      direccion: ['', Validators.required],
    });
  }

  get email(): any {
    return this.orderForm.get('email');
  }

  get direccion(): any {
    return this.orderForm.get('direccion');
  }

  deleteProduct(e) {
    let row = e.target.parentNode.parentNode;
    let id = Number(row.children[0].innerHTML);

    console.log(id);

    let index = this.getIndex(this.cartItems, id);

    console.log(index);

    this.cartItems.forEach((value, index) => {
      if (value.Product.idProducto == id) this.cartItems.splice(index, 1);
    });

    console.log(this.cartItems);

    row.style.display = 'none';
    this.total = 0;
    this.getTotalNeto();
  }

  getIndex(arr: any[], id) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].Product.idProducto == id) {
        return i;
      }
    }
    return -1;
  }

  onFormSubmit() {
    let emailData: email = new email();
    emailData.to = this.orderForm.get('email').value;
    emailData.body = 'Your order is coming!!';
    emailData.subject = 'Order Placed';
    emailData.html = `
        
     <div class="card">
        <h5 class="card-header"><h2>Thanks for your order!</h2></h5>
        <div class="card-body">
          <div class="form-group container"></div>
          <p style="text-align:center">
          The order is on its way to ${this.orderForm.get('direccion').value}, you will be paying L ${this.total} 
        </p>


        </div>
      </div>`;
    
    this.emailService.sendEmail(emailData);
    
    let listaProductos:oxp[] = [];
    this.cartItems.forEach((item, index)=>{
      
      let new_oxp = new oxp();
      
      new_oxp.Id_Producto = item.Product.idProducto;
      new_oxp.Cantidad = item.Quantity;
      listaProductos.push(new_oxp);
    });
    
    let orderReq = new orden();
    orderReq.Email = emailData.to;
    orderReq.Direccion = this.orderForm.get('direccion').value;
    emailData.html = `Your order has been to ${orderReq.Direccion} 
                      and your total amount to pay ${this.total}`;
    
    orderReq.productos = listaProductos;
    console.log(orderReq);
    
    this.orderService.addOrder(orderReq);
    this.cartItems=[];
  }

  getTotalNeto() {
    this.cartItems.forEach((item, index) => {
      let mult = item.Product.precio * item.Quantity;
      this.total += mult;
      console.log(this.total);
    });
  }

}
