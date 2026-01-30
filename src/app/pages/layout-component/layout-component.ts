import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-component.html',
  styleUrls: ['./layout-component.css'],
})
export class LayoutComponent {

  constructor(private router: Router) {}
//router = inject(Router);


  redirectLogin() {
    debugger;
    console.log('Redirecting to login page');
    this.router.navigateByUrl('/login');
    //window.location.href = '/login';
  }

}

