import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubject = new BehaviorSubject<string | null>(null);

  storage$ = this.storageSubject.asObservable();

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.storageSubject.next(value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
