import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EnvironmentConst } from '../../EnvironmentFolder/EnvironmentFile';
import { ConstantFile } from '../../ConstantFolder/ConstantFile';
import { Observable } from 'rxjs';
import { LoginObject } from '../model/class/login-object';
import { DbloginObject } from '../model/class/dblogin-object';
import { AuthRequestObject } from '../model/class/auth-request-object';
import { DashBoardData } from '../model/class/dash-board-data';


@Injectable({
  providedIn: 'root',
})
export class LoginServices {

  //http = Inject(HttpClient);
  constructor(private http: HttpClient) {}

  loadLoginService(authRequestObject: AuthRequestObject): Observable<AuthRequestObject> {
   debugger;
    console.log('2-username in Service:', authRequestObject.username);
    return this.http.post<AuthRequestObject>(EnvironmentConst.HOST_URL + ConstantFile.LOGIN_API_Methods.GET_LOGIN_DETAILS, authRequestObject);
  }
  saveLoginService(loginObj: LoginObject): Observable<DbloginObject> {
    debugger;
    console.log('2- save Login Object in Service:', loginObj);
    return this.http.post<DbloginObject>(EnvironmentConst.HOST_URL + ConstantFile.LOGIN_API_Methods.SAVE_LOGIN_DETAILS, loginObj);
  }

  loadAllUsers(): Observable<DashBoardData[]> {
    debugger;
    return this.http.get<DashBoardData[]>(EnvironmentConst.HOST_URL + ConstantFile.LOGIN_API_Methods.GET_ALL_USERS);
  }
  
}
