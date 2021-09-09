import { Component, OnInit } from '@angular/core';
import { producto } from 'src/app/models/producto.model';
import { response } from 'src/app/models/response.model';
import { ProductoService } from 'src/app/shared/producto.service';

@Component({
  selector: 'app-menu-thumbnail',
  template: `
    <div class="row">
      <div class="card col-md-3" *ngFor="let product of listProductos">
        <img
          class="card-img-top mx-auto"
          src="{{ product.urlimg }}"
          alt="Card image cap"
        />
        <div class="card-body">
          <div class="nombre-details">
            <h5 class="card-title">{{ product.nombre }}</h5>

            <p class="card-text">
              {{ product.descripcion }}
            </p>
          </div>
        </div>
        <div class="card-footer">
          <div class="wrap"></div>
          <button class="btn btn-success my-btn container">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        margin: 6px;
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
  constructor(private productoService: ProductoService) {}

  listProductos: producto[];

  ngOnInit(): void {
    this.productoService.getAllProductos().subscribe((data) => {
      this.listProductos = data.data;
    });
  }
}
