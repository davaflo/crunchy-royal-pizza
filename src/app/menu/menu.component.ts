import { Component, OnInit } from '@angular/core';
import { MenuService } from '../shared/service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private productoService: MenuService) { }

  ngOnInit(): void {
    console.log(this.productoService.getAllProductos());
  }


}
