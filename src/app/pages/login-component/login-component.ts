import { Component, OnInit } from '@angular/core';
import { LoginServices } from '../../services/login-services';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginObject } from '../../model/class/login-object';
import { DbloginObject } from '../../model/class/dblogin-object';

// Added FormsModule to enable ngModel binding
@Component({
  selector: 'app-login-component',
  imports: [FormsModule], 
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  
  loginObj: LoginObject = new LoginObject();

  dbLoginObj: DbloginObject = new DbloginObject();
  

  constructor(private router: Router, private loginServices: LoginServices) {}

  ngOnInit(): void {

  }

  getLoginByUsername(username: string) {
    //debugger;
    this.loginServices.loadLoginService(username).subscribe((data: DbloginObject) => {
      this.dbLoginObj = data;
      console.log('3-Database Login Details:', this.dbLoginObj);

      if(this.loginObj.username === this.dbLoginObj.username && this.loginObj.password === this.dbLoginObj.password) {
       //debugger;
        console.log('Login Successful');
        this.router.navigateByUrl('/login');
      } else {
        console.log('Login Failed: Invalid username or password');
        alert('Login Failed: Invalid username or password');
      }
    });
}

  getLoginDetails() {
   // debugger;
    console.log('1-Login Details:', this.loginObj);
    this.getLoginByUsername(this.loginObj.username);
  }

}

