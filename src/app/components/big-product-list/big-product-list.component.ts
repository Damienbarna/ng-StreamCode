import { Component, Input } from '@angular/core';
import { BigProductCardComponent } from '../big-product-card/big-product-card.component';
import { ModelProducts } from '../../utils/model-products';
import { ProductService } from '../../services/product.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-big-product-list',
  standalone: true,
  imports: [BigProductCardComponent],
  templateUrl: './big-product-list.component.html',
  styleUrls: ['./big-product-list.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(20%)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-20%)' }))
      ])
    ])
  ]
})
export class BigProductListComponent {

  constructor(private productService: ProductService, private auth: AuthService){}

  products: ModelProducts[] = [];
  selectedProduct: number = 0;

  ngOnInit(): void {
    const userId = this.auth.getCurrentUserId();
    this.productService.getProducts(userId).then((data) => {
      this.products = data;
    });
  }
  prevProduct() {
    if (this.selectedProduct > 0) {
      this.selectedProduct--;
    }
    
  }

  nextProduct() {
    if (this.selectedProduct < this.products.length - 1) {
      this.selectedProduct++;
    }
  }

}