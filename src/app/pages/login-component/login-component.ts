import { Component, OnInit } from '@angular/core';
import { LoginServices } from '../../services/login-services';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginObject } from '../../model/class/login-object';
import { DbloginObject } from '../../model/class/dblogin-object';
import { CommonModule } from '@angular/common';
import { AuthResponceObject } from '../../model/class/auth-responce-object';
import { AuthRequestObject } from '../../model/class/auth-request-object';

// Added FormsModule to enable ngModel binding
@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule], 
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  
  loginObj: LoginObject = new LoginObject();

  dbLoginObj: DbloginObject = new DbloginObject();

  authResponceObject: AuthResponceObject = new AuthResponceObject();

  authRequestObject: AuthRequestObject = new AuthRequestObject();

  isRegistered: boolean = false;
  

  constructor(private router: Router, private loginServices: LoginServices) {}

  ngOnInit(): void {

  }

  // getLoginByUsername(username: string) {
  //   debugger; 
  //   this.loginServices.loadLoginService(username).subscribe((data: DbloginObject) => {
  //     this.dbLoginObj = data;
  //     console.log('3-Database Login Details:', this.dbLoginObj);
  //     const dbresponse = this.dbLoginObj;
  //     if(dbresponse === null || dbresponse === undefined) {
  //           console.log('No user found with the provided username.');
  //           alert('No user found with the provided username'); 

  //      } else {            
  //           if(this.loginObj.username === this.dbLoginObj.username && this.loginObj.password === this.dbLoginObj.password) {
  //           //debugger;
  //           console.log('Login Successful');
  //           this.router.navigateByUrl('/dashboard');
  //         } else {
  //           console.log('Login Failed: Invalid username or password');
  //           alert('Login Failed: Invalid username or password');
  //         }
  //     }

  //   });
  // }

  // getLoginDetails() {
  //  debugger;
  //   console.log('Login Details:', this.loginObj);

  //  const localCacheData = localStorage.getItem('loginUserData');

  //  if(localCacheData !== null) {
  //   debugger;
  //   console.log('Parsed localCacheData', JSON.parse(localCacheData!));
  //   const dataArray = JSON.parse(localCacheData!);
  //   const checkUsernameExists = dataArray.some((obj: { username: string; }) => obj.username === this.loginObj.username);
  //       if(!checkUsernameExists) {
  //         this.getLoginByUsername(this.loginObj.username);
  //       } else {
  //         const matchedUser = dataArray.find((obj: { username: string; }) => obj.username === this.loginObj.username);
  //             if(matchedUser) {  
  //               console.log('Login Successful');
  //               this.router.navigateByUrl('/dashboard');
  //             } else {
  //               console.log('Login Failed: Invalid username or password');
  //               alert('Login Failed: Invalid username or password');
  //             }

  //       } //else
        
  //     } //cache

  //   //this.getLoginByUsername(this.loginObj.username);
  // }
  
  getLoginUserDetails(authRequestObject: AuthRequestObject) {
    debugger;
    this.loginServices.loadLoginService(authRequestObject).subscribe((data: any) => {
      this.authResponceObject = data;
      console.log('3- Auth Responce Details:', this.authResponceObject.data);
      console.log('3- Auth Responce Status:', this.authResponceObject.status);
      console.log('3- Auth Responce Message:', this.authResponceObject.message);  
      const authResponse = this.authResponceObject; 
      if(authResponse.data === null || authResponse.data === undefined || authResponse.data === '') {
            console.log('No user found with the provided username.');
            alert('No user found with the provided username');
      } else {            
            if(authResponse.status) {
              localStorage.setItem('authdata', authResponse.data);
            //debugger;
            console.log('Login Successful');
            this.router.navigateByUrl('/dashboard');
          } else {
            console.log('Login Failed: Invalid username or password');
           // alert('Login Failed: Invalid username or password');
          }
        }

    });
    
  }



  getLoginDetails() {
   debugger;
    console.log('Login Details:', this.authRequestObject);
    this.getLoginUserDetails(this.authRequestObject);
  }


  


  saveLoginUser(loginObj: LoginObject) {
    debugger;
    this.loginServices.saveLoginService(loginObj).subscribe((data: DbloginObject) => {
      this.dbLoginObj = data;
      console.log('3-Saved Login Details:', this.dbLoginObj);
    });
  }

  saveLoginDetails() {
   debugger;
   console.log(' saveLoginDetails - this.loginObj:', this.loginObj);
   const localCacheData = localStorage.getItem('loginUserData');

   if(localCacheData !== null) {
    debugger;
    console.log('Parsed localCacheData', JSON.parse(localCacheData!));
    const dataArray = JSON.parse(localCacheData!);
    const checkUsernameExists = dataArray.some((obj: { username: string; }) => obj.username === this.loginObj.username);
        if(!checkUsernameExists) {
        dataArray.push(this.loginObj);
        localStorage.setItem('loginUserData', JSON.stringify(dataArray));
        this.saveLoginUser(this.loginObj);
        console.log('Registration Successful! You can now log in.');
        alert('Registration Successful! You can now log in.');
        } else {
          console.log('Username already exists. Please choose a different username.');
          alert('Username already exists. Please choose a different username.');
        }

  } else {
    debugger;
      console.log('No Local Storage Data Found -- else Block');
      const newDataArray = [];
      newDataArray.push(this.loginObj);
      localStorage.setItem('loginUserData', JSON.stringify(newDataArray));
      this.saveLoginUser(this.loginObj);
      console.log('Registration Successful! You can now log in.');
      alert('Registration Successful! You can now log in.');
  }
  
} //save

}

