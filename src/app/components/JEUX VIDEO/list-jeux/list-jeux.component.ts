import { Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-list-jeux',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './list-jeux.component.html',
  styleUrls: ['./list-jeux.component.scss'],
   // Désactive l'encapsulation des styles
})
export class ListJeuxComponent {

}
