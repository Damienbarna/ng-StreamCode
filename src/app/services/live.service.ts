import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  private baseUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) { }

  joinRoom(roomId: string, userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/join-room`, { roomId, userId });
  }
}
