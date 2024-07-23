import { Component } from '@angular/core';
import { ListJeuxComponent } from '../../components/JEUX VIDEO/list-jeux/list-jeux.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-jeux-video',
  standalone: true,
  imports: [ListJeuxComponent, ProductListComponent],
  templateUrl: './jeux-video.component.html',
  styleUrl: './jeux-video.component.scss'
})
export class JeuxVideoComponent {

}
