import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ModelProducts } from '../../utils/model-products';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-card-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-card-user.component.html',
  styleUrl: './update-card-user.component.scss'
})
export class UpdateCardUserComponent {

  @Input({required: true}) product!: ModelProducts;
  @Output() productUpdated = new EventEmitter<ModelProducts>();

  userGroup = new FormGroup({
    langage: new FormControl(''),
    categorie: new FormControl(),
    image: new FormControl(''),
    description: new FormControl(''),
    name: new FormControl(''),
    id: new FormControl<number | null>(null),
    url: new FormControl('')
  });

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.userGroup.patchValue(this.product);
  }

  onSubmit() {
    const updatedProduct: ModelProducts = {
      userId: this.product.userId, 
      description: this.userGroup.value.description || '', 
      name: this.userGroup.value.name || '', 
      id: this.product.id, 
      url: this.userGroup.value.url || '',
      langage: this.userGroup.value.langage || '',
      categorie: this.userGroup.value.categorie || '',
      image: this.userGroup.value.image || ''
    };

    this.productService.updateProduct(updatedProduct).then(response => {
      this.productUpdated.emit(response);
    }).catch(error => {
      console.error('Erreur lors de la mise à jour du produit', error);
    });
  }
}