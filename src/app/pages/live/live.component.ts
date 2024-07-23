import { Component } from '@angular/core';
import { LiveSessionComponent } from '../../components/live-session/live-session.component';

@Component({
  selector: 'app-live',
  standalone: true,
  imports: [LiveSessionComponent],
  templateUrl: './live.component.html',
  styleUrl: './live.component.scss'
})
export class LiveComponent {
  

}
