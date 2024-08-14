import { AuthService } from './../../services/auth.service';
import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../utils/model-message';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public messages = signal<Message[]>([]);
  public messageContent: string = '';
  

  // private changeDetector = inject(ChangeDetectorRef);

  constructor(
    public chatService: ChatService,
   
  ) {}

  ngOnInit() {
   


    // this.chatService.fetchMessages().pipe(tap((messages=>{
    //   this.messages.set(messages);
    
    // })));

    // this.chatService.getMessages().subscribe((message: Message) => {
    //   console.log(message);
    //   this.messages.update(messages=>[...messages, message]);
    // });
  }



  sendMessage() {
  
    
    this.chatService.sendMessage(this.messageContent);
    this.messageContent = '';

    
  }

  
}