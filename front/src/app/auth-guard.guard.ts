import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private loginService : LoginService,
    private router : Router
    ){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');

    return this.loginService.estaAutenticado(token).pipe(
      map((autenticado : boolean)=>{
        if(autenticado){
          return true;
        }else{
          this.router.navigate(['login'])
          return false;
        }
      })
    );
  }
  
}
