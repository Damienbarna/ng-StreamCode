import { Component } from '@angular/core';
import { ListSmartphoneComponent } from '../../components/SMARTPHONE/list-smartphone/list-smartphone.component';


@Component({
  selector: 'app-smartphone',
  standalone: true,
  imports: [ListSmartphoneComponent],
  templateUrl: './smartphone.component.html',
  styleUrl: './smartphone.component.scss'
})
export class SmartphoneComponent {

}
