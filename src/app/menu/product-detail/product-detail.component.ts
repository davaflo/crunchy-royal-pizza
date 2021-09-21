import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/shared/producto.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product : any;


  constructor(private productService : ProductoService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    let productId = Number(this.route.snapshot.paramMap.get('id'));
   
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data.data;
    });

  }

}
