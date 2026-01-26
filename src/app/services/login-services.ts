import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EnvironmentConst } from '../../EnvironmentFolder/EnvironmentFile';
import { ConstantFile } from '../../ConstantFolder/ConstantFile';
import { Observable } from 'rxjs';
import { LoginObject } from '../model/class/login-object';
import { DbloginObject } from '../model/class/dblogin-object';


@Injectable({
  providedIn: 'root',
})
export class LoginServices {

  //http = Inject(HttpClient);
  constructor(private http: HttpClient) {}

  loadLoginService(username: string): Observable<DbloginObject> {
   // debugger;
    console.log('2-username in Service:', username);
    return this.http.get<DbloginObject>(EnvironmentConst.HOST_URL + ConstantFile.LOGIN_API_Methods.GET_LOGIN_DETAILS + `?username=${username}`);
  }
  saveLoginService(loginObj: LoginObject): Observable<DbloginObject> {
    //debugger;
    console.log('2- save Login Object in Service:', loginObj);
    return this.http.post<DbloginObject>(EnvironmentConst.HOST_URL + ConstantFile.LOGIN_API_Methods.SAVE_LOGIN_DETAILS, loginObj);
  }

}
