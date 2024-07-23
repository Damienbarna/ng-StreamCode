import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModelProducts } from '../../utils/model-products';
import { UpdateCardUserComponent } from '../update-card-user/update-card-user.component';


@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [UpdateCardUserComponent],
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent {


  products: ModelProducts[] = [];
 

  @Input({required:true}) product!: ModelProducts;
  @Output() productDeleted = new EventEmitter<number>();
  @Output() productUpdated = new EventEmitter<number>();
  
  
  

  deleteProduct() {
    this.productDeleted.emit(this.product.id);
  }

  onProductUpdated(updatedProduct: ModelProducts) {
    this.product = updatedProduct;
    this.productUpdated.emit(updatedProduct.id); 
  }

  

  
 

 
}