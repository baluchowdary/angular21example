import { Component } from '@angular/core';
import { RouterOutlet } from "../../../../node_modules/@angular/router/types/_router_module-chunk";
import { LoginServices } from '../../services/login-services';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {

  allUsers: any[] = [];

  constructor(private loginServices: LoginServices) {} 

  ngOnInit() {
    // this.loginServices.loadAllUsers().subscribe((data: any[]) => {
    //   this.allUsers = data;
    // });
    this.getAllUsers();
  } 


  getAllUsers() {
    this.loginServices.loadAllUsers().subscribe((data: any[]) => {
      console.log('All Users Data:', data);
      this.allUsers = data;
    });
  }

}
