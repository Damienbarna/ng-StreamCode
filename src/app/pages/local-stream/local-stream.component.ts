import { Component, OnInit, OnDestroy } from '@angular/core';
import { StreamingService } from '../../services/streaming.service';
import { ChatService } from '../../services/chat.service';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
  selector: 'app-local-stream',
  templateUrl: './local-stream.component.html',
  styleUrls: ['./local-stream.component.scss'],
  standalone: true,
  imports: [ChatComponent]
})
export class LocalStreamComponent implements OnInit, OnDestroy {

  constructor(
    private streamingService: StreamingService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.streamingService.initialize();
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
    // Si vous avez une méthode pour arrêter le stream, décommentez la ligne suivante
    // this.streamingService.stopStream();
  }

  startStream(): void {
    this.streamingService.startStream().then(() => {
      const userId = this.streamingService.getUserId();
      if (userId) {
        this.chatService.joinChat(userId);
      } else {
        console.error('ID utilisateur non disponible pour rejoindre le chat.');
      }
    }).catch(error => {
      console.error('Erreur lors du démarrage du stream:', error);
    });
  }
}