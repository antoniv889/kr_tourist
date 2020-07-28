import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient:HttpClient) { }
  signup(username: string, email: string, password: string){
      return this.httpclient.post('http://kr.travel/api/user',
      {name:username, email:email, password:password},
      {headers:new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})}
      );
  }
  signin(email: string, password: string){
    return this.httpclient.post(
      'http://kr.travel/api/user/signin',
      {email:email, password:password},
      {headers:new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})}
    )

  }
}
