import { Component } from '@angular/core';

import { ListSecuriteComponent } from '../../components/SECURITE/list-securite/list-securite.component';

@Component({
  selector: 'app-securite',
  standalone: true,
  imports: [ListSecuriteComponent],
  templateUrl: './securite.component.html',
  styleUrl: './securite.component.scss'
})
export class SecuriteComponent {

}
