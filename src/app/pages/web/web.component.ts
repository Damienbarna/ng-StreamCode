import { Component } from '@angular/core';
import { ListWebComponent } from '../../components/WEB/list-web/list-web.component';


@Component({
  selector: 'app-web',
  standalone: true,
  imports: [ListWebComponent],
  templateUrl: './web.component.html',
  styleUrl: './web.component.scss'
})
export class WebComponent {

}
