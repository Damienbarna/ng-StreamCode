
import { Component } from '@angular/core';

import { CardCategoriesComponent } from '../../components/CATEGORIES/card-categories/card-categories.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';





@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ CardCategoriesComponent, ProductListComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

}
