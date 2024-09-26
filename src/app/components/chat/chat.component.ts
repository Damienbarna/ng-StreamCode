import { Message } from './../../utils/model-message';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  public message: Message = {
    userId: "",
    content: "",
    timestamp: new Date()
  };

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    // Pas besoin de charger les messages ici, ils sont déjà chargés dans le service
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Erreur lors du défilement automatique :', err);
    }
  }

  sendMessage() {
    if (!this.message.content.trim()) {
      return; // Ne pas envoyer de message vide
    }
    this.chatService.sendMessage(this.message);
    this.message.content = "";
    this.scrollToBottom();
  }
}