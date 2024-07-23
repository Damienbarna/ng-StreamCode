import { Component } from '@angular/core';
import { ListLogicielComponent } from '../../components/LOGICIEL/list-logiciel/list-logiciel.component';


@Component({
  selector: 'app-logiciel',
  standalone: true,
  imports: [ListLogicielComponent],
  templateUrl: './logiciel.component.html',
  styleUrl: './logiciel.component.scss'
})
export class LogicielComponent {

}
