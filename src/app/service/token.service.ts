import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  saveToken(token: string): void{
    localStorage.setItem('token', token)    
    // this.router.navigate(['/'])
  }

  isLogged(): boolean{
    const token = localStorage.getItem('token')
    return !! token
  }

  clearToken(): void{
    localStorage.removeItem('token')
    localStorage.removeItem('UserId')
    this.router.navigate(['/'])
    window.location.reload()
  }

  clearTokenExpired(): void{
    // localStorage.removeItem('token')
    // localStorage.removeItem('UserId')
    // localStorage.removeItem('CanalId')
    //this.router.navigate(['/login'])
  }

  getToken(): string | null{
    return localStorage.getItem('token')
  }
}
