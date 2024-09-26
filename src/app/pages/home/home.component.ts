import { Component } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';

import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { BigProductListComponent } from '../../components/big-product-list/big-product-list.component';
import { ActiveStreamsComponent } from '../../components/active-streams/active-streams.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponent, SidenavComponent, BigProductListComponent, ActiveStreamsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

}
