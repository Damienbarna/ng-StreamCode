import { Component, Input } from '@angular/core';
import { ModelProducts } from '../../utils/model-products';

@Component({
  selector: 'app-big-product-card',
  standalone: true,
  imports: [],
  templateUrl: './big-product-card.component.html',
  styleUrl: './big-product-card.component.scss'
})
export class BigProductCardComponent {

  products : ModelProducts[] = [];

  @Input({required:true}) product!:ModelProducts;

}
