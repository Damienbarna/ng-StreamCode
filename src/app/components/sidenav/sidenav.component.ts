import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ModelProducts } from '../../utils/model-products';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule,],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  showMenu: boolean = false;
  products: ModelProducts[] = [];
  
}
