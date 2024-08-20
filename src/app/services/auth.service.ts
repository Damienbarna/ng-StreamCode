import { Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(name: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/signup', { name, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', { name: username, password }).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
         
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getPayLoad() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token == null) {
        throw new Error("Le token est null");
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.userId) {
        throw new Error("Le token ne contient pas d'userId");
      }
      return payload;
    }
    return null;
  }

  getCurrentUser(): string {
    return this.getPayLoad().username;
  }

 
}