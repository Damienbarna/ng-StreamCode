import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService{



  private isAuthenticated = false;
 

  constructor(private http: HttpClient) { }

  register(name: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/signup', { name, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', { name: username, password }).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticated = true;
        }
        return response;
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  setLoggedIn(isLoggedIn: boolean): void {
    this.isAuthenticated = isLoggedIn
  }

}