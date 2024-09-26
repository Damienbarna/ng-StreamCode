import { Component, Input } from '@angular/core';
import { ModelProducts } from '../../utils/model-products';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: ModelProducts;

  constructor(private http: HttpClient, private router: Router) {}

 

  navigateToVideo(){
    this.router.navigate(['/video', this.product.id]);
  }
  
}
