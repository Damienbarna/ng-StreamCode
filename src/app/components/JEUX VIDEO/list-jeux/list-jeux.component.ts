import { Component} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-list-jeux',
  standalone: true,
  imports: [],
  templateUrl: './list-jeux.component.html',
  styleUrls: ['./list-jeux.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1s ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
  
        
      
    ])
  ]

})
export class ListJeuxComponent {

  showContent = true;

  scrollRight() {
    this.showContent = false;
  }

  scrollLeft() {
    this.showContent = true;
  }

}
