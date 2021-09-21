import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public name: any;

  constructor(private router: ActivatedRoute,
    private rout: Router,
  ) {
    console.log(this.router.url);
  }

  ngOnInit(): void {}
}
