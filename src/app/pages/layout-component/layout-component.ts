import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet],
  templateUrl: './layout-component.html',
  styleUrls: ['./layout-component.css'],
})
export class LayoutComponent {

  constructor(private router: Router) { }

  logout() {
    debugger;
    console.log('Logging out and redirecting to login page');
    localStorage.removeItem('authdata');
    this.router.navigateByUrl('/login');
  }

}

