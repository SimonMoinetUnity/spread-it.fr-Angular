import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: UserService, private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const role = this.auth.getRole();
      if (role) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }

  }