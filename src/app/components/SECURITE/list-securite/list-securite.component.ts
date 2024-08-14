import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-list-securite',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './list-securite.component.html',
  styleUrls: ['./list-securite.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1s ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
  
        
      
    ])
  ]
})
export class ListSecuriteComponent {
  showContent = true;

  scrollRight() {
    this.showContent = false;
  }

  scrollLeft() {
    this.showContent = true;
  }
}