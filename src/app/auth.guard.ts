import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private route: Router){

  }
  token:any;
  canActivate(){
    this.token = localStorage.getItem('token');
    if(this.token){
      return true;
    } else {
        this.route.navigate(['login'])
    }
  }

}
