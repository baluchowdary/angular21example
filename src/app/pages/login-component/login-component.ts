import { Component, OnInit } from '@angular/core';
import { LoginServices } from '../../services/login-services';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginObject } from '../../model/class/login-object';

// Added FormsModule to enable ngModel binding
@Component({
  selector: 'app-login-component',
  imports: [FormsModule], 
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  
  loginObj: LoginObject = new LoginObject();
  

  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  getLoginDetails() {
    console.log('Login Details:', this.loginObj);
    if(this.loginObj.username === 'kollu' && this.loginObj.password === 'password') {
      this.router.navigateByUrl('/dashboard');
      localStorage.setItem('username_key', this.loginObj.username);
    } else {
      console.log('Invalid credentials. Please try again.');
    } 


  }



}
