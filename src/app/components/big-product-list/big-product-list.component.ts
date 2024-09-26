import { Component,  } from '@angular/core';
import { BigProductCardComponent } from '../big-product-card/big-product-card.component';
import { ModelProducts } from '../../utils/model-products';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-big-product-list',
  standalone: true,
  imports: [BigProductCardComponent],
  templateUrl: './big-product-list.component.html',
  styleUrl: './big-product-list.component.scss'
})
export class BigProductListComponent {

  constructor(private productService: ProductService){}

   products: ModelProducts[] = [];
   page: number = 0;
   ngOnInit(): void {
    this.productService.getProducts().then((data) => {
      this.products = data;
    });
  }
  

  prevPage(): void {
    this.page--;
  }

  nextPage(): void {
    this.page++;
  }
}
