import { Component } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';

import { SidenavComponent } from '../../components/sidenav/sidenav.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponent, SidenavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

}
