import { Message } from './../utils/model-message';
import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages = signal<Message[]>([]);
  private socket!: Socket;
  private roomId!: string;

  // Définissez l'URL du serveur de chat ici
  private readonly CHAT_URL: string = "http://localhost:3005";

  constructor(private http: HttpClient) { }

  joinChat(roomId: string) {
    this.roomId = roomId;
    this.socket = io(this.CHAT_URL || "http://localhost:3005");
    
    this.socket.on("connect", () => {
      console.log("Connecté au serveur de chat");
      this.socket.emit("join_chat", roomId);
      
      this.socket.on("receive_message", (message: Message) => {
        this.messages.update(pastValue => [...pastValue, message]);
      });
      
      console.log(`Rejoint la salle de chat : ${roomId}`);
      
      // Charger les messages précédents après avoir rejoint la salle
      this.loadPreviousMessages();
    });

    this.socket.on("error", (error) => {
      console.error("Erreur Socket :", error);
    });
  }

  private loadPreviousMessages() {
    this.http.get<Message[]>(`http://localhost:3000/messages`, {
      params: { roomId: this.roomId }
    }).subscribe({
      next: (msgs) => {
        this.messages.set(msgs);
        console.log(`Messages chargés pour la salle ${this.roomId}:`, msgs);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des messages précédents:', err);
      }
    });
  }

  sendMessage(message: Message) {
    if (!this.socket || !this.roomId) {
      console.error("Socket non connectée ou roomId non défini");
      return;
    }
    this.socket.emit("send_message", { roomId: this.roomId, message });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}