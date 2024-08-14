import { ApplicationRef, inject, Injectable, signal } from '@angular/core';
import { first, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Message } from '../utils/model-message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private baseUrl = 'http://localhost:3003';
  private auth = inject(AuthService);
  constructor(private http: HttpClient) {
    this.socket = io(this.baseUrl, {autoConnect:false});
    inject(ApplicationRef).isStable.pipe(
      first((isStable) => isStable)
    ).subscribe(() => { this.socket.connect() });

    this.socket.on('message', (message: Message) => {
      this.messages.update(messages=>[...messages, message]);
    });
  }

  sendMessage(text: string) {
    console.log(this.auth.getCurrentUser());

    const message : Message = {
      content: text,
      username: this.auth.getCurrentUser(),
      timestamp: new Date()
    }
    this.socket.emit('message', message);
  }

  messages = signal<Message[]>([]);

  getMessages(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (message: Message) => {
        observer.next(message);
      });
    });
  }

  fetchMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/messages`);
  }
}