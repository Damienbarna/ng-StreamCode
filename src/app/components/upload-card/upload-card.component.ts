import { Component, Output, EventEmitter } from '@angular/core';
import { ModelProducts } from '../../utils/model-products';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-upload-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upload-card.component.html',
  styleUrl: './upload-card.component.scss'
})
export class UploadCardComponent {

  selectedFile: File | null = null;

  @Output() productCreated = new EventEmitter<ModelProducts>();

  constructor(private productService: ProductService, private uploadService: UploadService) {}  

  userGroup = new FormGroup({
    langage: new FormControl(''),
    categorie: new FormControl(),
    image: new FormControl(''),
    description: new FormControl(''),
    name: new FormControl(''),
    id: new FormControl(''),
    url: new FormControl('')
  });

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
        const productData: ModelProducts = {
            name: this.userGroup.value.name ?? '',
            description: this.userGroup.value.description ?? '',
            url: this.userGroup.value.url ?? '',
            langage: this.userGroup.value.langage ?? '',
            categorie: this.userGroup.value.categorie ?? '',
            id: Number(this.userGroup.value.id) ?? 0,
            image: '' // L'URL de l'image sera ajoutée par le backend
        };

        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('productData', JSON.stringify(productData));

        this.uploadService.uploadFile(formData).subscribe({
            next: (response) => {
                console.log('Produit créé avec succès', response);
                this.productCreated.emit(response);
                this.userGroup.reset();
            },
            error: (error) => {
                console.error('Erreur lors de la création du produit', error);
            }
        });
    } else {
        console.error('Aucun fichier sélectionné');
    }
  }

}