import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

    constructor(private auth: UserService, private router: Router) {}
  
    canActivate(): boolean {
      const role = this.auth.getRole();
      console.log('rôle : ' + role);
      if (role && role=='ADMIN') {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }

  }