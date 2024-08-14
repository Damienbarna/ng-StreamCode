import { Component, OnInit } from '@angular/core';
import { ChatComponent } from '../../components/chat/chat.component';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../utils/model-message';


@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
  standalone: true,
  imports: [ChatComponent]
})
export class LiveComponent implements OnInit {


  public messages: Message[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe((message: Message) => {
      this.messages.push(message);
    });
  }
}