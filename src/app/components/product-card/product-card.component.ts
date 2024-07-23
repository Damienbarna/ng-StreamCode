import { Component, Input } from '@angular/core';
import { ModelProducts } from '../../utils/model-products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  products : ModelProducts[] = [];

  @Input({required:true}) product!:ModelProducts;





}
