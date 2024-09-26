import { Component, Input } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ModelProducts } from '../../utils/model-products';
import { ProductService } from '../../services/product.service';




@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  constructor(private productService: ProductService){}

 

  products: ModelProducts[] = [];
 

  

  ngOnInit(): void {
    this.productService.getProducts().then((data) => {
      this.products = data;
    });
  }
 
}
  


