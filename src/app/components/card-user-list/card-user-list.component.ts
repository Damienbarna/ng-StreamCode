import { Component, Input, OnInit, inject } from '@angular/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { ModelProducts } from '../../utils/model-products';
import { ProductService } from '../../services/product.service';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-card-user-list',
  standalone: true,
  imports: [CardUserComponent],
  templateUrl: './card-user-list.component.html',
  styleUrl: './card-user-list.component.scss'
})
export class CardUserListComponent implements OnInit {

  private api = inject(ProductService);

  @Input() products: ModelProducts[] = [];
  @Output() productSelected = new EventEmitter<number>();

  ngOnInit(): void {
   this.api.getProducts().then(data => {
      this.products = data;
    });
  }

  

  deletedProduct(productId: number) {
    this.products = this.products.filter(product => product.id !== productId);
    this.api.deletedProduct(productId).then(() => {
      console.log('Produit supprimé avec succès');
    }).catch(error => {
      console.error('Erreur lors de la suppression du produit', error);
    });
  }
  
}