import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EnvironmentConst } from '../../EnvironmentFolder/EnvironmentFile';
import { ConstantFile } from '../../ConstantFolder/ConstantFile';
import { Observable } from 'rxjs';
import { LoginObject } from '../model/class/login-object';


@Injectable({
  providedIn: 'root',
})
export class LoginServices {

  //http = Inject(HttpClient);
  constructor(private http: HttpClient) {}


  loadLoginService(): Observable<LoginObject> {
    return this.http.get<LoginObject>(EnvironmentConst.HOST_URL + ConstantFile.LOGIN_API_Methods.GET_LOGIN_DETAILS);
  }
  
}
