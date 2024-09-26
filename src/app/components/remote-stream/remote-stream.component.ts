import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StreamingService } from '../../services/streaming.service';
import { ChatService } from '../../services/chat.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-remote-stream',
  templateUrl: './remote-stream.component.html',
  styleUrls: ['./remote-stream.component.scss'],
  imports: [ChatComponent],
  standalone: true,
})
export class RemoteStreamComponent implements OnInit, OnDestroy {
  userIdToJoin: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private streamingService: StreamingService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.streamingService.initialize();
    this.route.paramMap.subscribe(params => {
      this.userIdToJoin = params.get('id');
    });
  }

  joinStream(): void {
    if (this.userIdToJoin) {
      this.streamingService.joinStream(this.userIdToJoin);
      this.chatService.joinChat(this.userIdToJoin); // Rejoindre la salle de chat spécifique
    } else {
      console.error('Aucun ID utilisateur à rejoindre');
    }
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
    // Déconnecter également le streaming si nécessaire
  }
}