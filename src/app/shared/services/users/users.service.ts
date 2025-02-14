import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../base/enviroment';
import {
  changePassword,
  LoginData,
  UserData,
} from '../../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

 public loginState=new BehaviorSubject<string |null>(localStorage.getItem('socialToken'));
 loginState$=this.loginState.asObservable();


  constructor(private _HttpClient: HttpClient) {}

  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  sendRegister(userDate: UserData): Observable<UserData> {
    return this._HttpClient.post<UserData>(
      `${environment.baseUrl}users/signup`,
      userDate
    );
    
  }

  sendLogin(userData: LoginData): Observable<LoginData> {
    return this._HttpClient.post<LoginData>(
      `${environment.baseUrl}users/signin`,
      userData
    ).pipe(tap((res:any)=>{
      localStorage.setItem('socialToken', res.token);
      this.loginState.next(res.token);
    }));
  }

  changePassword(pass: object): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseUrl}users/change-password`,
      pass
    );
  }

  UploadProfilePhoto(photo: any): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}users/upload-photo`,
      photo
    );
  }

  GetLoggedUserData(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}users/profile-data`);
  }

  logout(){
    localStorage.removeItem('socialToken');
    this.loginState.next(null);
    
  }
}
