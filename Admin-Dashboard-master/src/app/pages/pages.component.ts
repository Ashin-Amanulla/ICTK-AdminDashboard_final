import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MENU_ITEMS } from './pages-menu';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  constructor(
    public _auth: AuthService,
    private _router: Router) {

  }

  menu = MENU_ITEMS;
}
