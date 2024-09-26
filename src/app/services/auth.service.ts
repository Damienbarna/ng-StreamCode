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
      catchError((error: any) => {
        console.error(error);
        return of(error);
      }),
      map((response: any) => {  
        if (response.token) {
          console.log("Token reçu après connexion:", response.token);
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }

  logout(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && !!window.localStorage;
    } catch (e) {
      return false;
    }
  }
  
  getCurrentUserId(): string | null {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage is not available');
      return null;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return null;
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Token payload:", payload);
      return payload.userId ? payload.userId.toString() : null;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID utilisateur :", error);
      return null;
    }
  }

  getPayLoad() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token == null) {
        throw new Error("Le token est null");
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      if (!payload.userId) {
        throw new Error("Le token ne contient pas d'userId");
      }
      return payload;
    }
    return null;
  }

  getUserProfile(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token non disponible. Veuillez vous connecter.');
    }

    return this.http.get(`http://localhost:3000/getname/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      catchError((error: any) => {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
        return of(null);
      })
    );
  }
}