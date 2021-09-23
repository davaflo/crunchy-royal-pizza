import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { producto } from 'src/app/models/producto.model';
import { response } from 'src/app/models/response.model';
import { ProductoService } from 'src/app/shared/producto.service';
import { DataService } from 'src/app/shared/data.service';
import { Cart } from 'src/app/models/cart.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-thumbnail',
  template: `

    
    <div class="row">
      <div class="card col-md-3" *ngFor="let product of listProductos">
        <img
          class="card-img-top mx-auto"
          src="{{ product.urlimg }}"
          alt="Card image cap"
          style="margin-top:10px; border-radius: 10px;"
        />
        <div class="card-body">
          <div class="nombre-details">
            <h5 class="card-title">
              <a style="text-decoration: none; color:black;" routerLink="/products/{{product.idProducto}}" routerLinkActive="active">{{ product.nombre}}</a>
            </h5>

            <p class="card-text">
              {{ product.descripcion }}
            </p>
            <p class="card-text">
              Precio: L. {{product.precio}}
            </p>
          </div>
        </div>
        <div class="card-footer">
          <div class="form-group ">
            <form class="row" [formGroup]="quantityForm" (ngSubmit)="cart(product)">

           <label class="col-sm-3 container" style="">Quantity: </label>
              <input
                class="col form-control"
                type="number"
                name="quantity"
                id="quantity"
                style="margin-right: 10px; max-width: 100px; border-style: none; border-radius: 2%;"
                formControlName="quantity"
              />
              <button
              type="submit"
              class="btn btn-success my-btn container col"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        margin: 15px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
        padding-left: 0.1rem;
      }

      .card:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 1);
      }

      .my-btn {
        border-radius: 0.5rem;
      }

      img {
        height: 250px;
        width: 250px;
      }

      .nombre-details {
        text-align: center;
      }

      .row > div[class*='col-'] {
        display: flex;
        flex: 1 0 auto;
      }
    `,
  ],
})
export class MenuThumbnailComponent {
  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private sharedData : DataService,
    private toastr : ToastrService
  ) {}

  listProductos: producto[];

  quantityForm: FormGroup;
  cartItems:Cart[]=[];

  ngOnInit(): void {
    this.productoService.getAllProductos().subscribe((data) => {
      this.listProductos = data.data;
    }
    
    );

    this.quantityForm = this.formBuilder.group({
      quantity: ['', Validators.required],
    });

    this.quantityForm.get('quantity').setValue(1);
  }

  cart(producto: any): void {
 

    let newItem = new Cart();
    newItem.Product = producto;
    newItem.Quantity = Number(this.quantityForm.get('quantity').value);

    this.sharedData.data.push(newItem);

    this.toastr.success(newItem.Product.nombre + ' has been added to your cart', 'Success', {
      timeOut: 2000,
      positionClass: 'toast-top-right',
    });
    
  }
}

