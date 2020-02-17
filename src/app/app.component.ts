import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './globals';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'School Poll';
  isnavbar = false;
  isnavbarmanager = false;
  showLogo: boolean;
  public href: string = '';
  constructor(private router: Router, private globals: Globals) {
    router.events.subscribe(val => {
      if (localStorage.getItem('userName')) {
        this.globals.userName = localStorage.getItem('userName');
      }

      this.isnavbar =
        this.router.url === '/' ||
        this.router.url.startsWith('/?') ||
        this.router.url.startsWith('/#') ||
        this.router.url.startsWith('/manager')
          ? false
          : true;

      this.isnavbarmanager = this.router.url !== '/manager' ? false : true;
    });
  }
}
