import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {}

  // Méthode pour l'upload de produits
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:3001/upload', formData);
  }

  // Méthode pour l'upload des photos de profil
  uploadProfilePicture(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:3001/upload-profile', formData);
  }
}