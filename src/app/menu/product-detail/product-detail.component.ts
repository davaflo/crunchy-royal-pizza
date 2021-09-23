import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart.model';
import { DataService } from 'src/app/shared/data.service';
import { ProductoService } from 'src/app/shared/producto.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private productService: ProductoService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private sharedData: DataService
  ) {}

  quantityForm: FormGroup;
  cartItems: Cart[] = [];

  ngOnInit(): void {
    let productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(productId).subscribe((data) => {
      this.product = data.data;
    });

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

    this.toastr.success(
      newItem.Product.nombre + ' has been added to your cart',
      'Success',
      {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      }
    );
  }
}
