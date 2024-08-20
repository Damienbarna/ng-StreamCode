import { Component, OnInit, inject } from '@angular/core';
import { ModelProducts } from '../../utils/model-products';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { UploadCardComponent } from '../../components/upload-card/upload-card.component';
import { CardUserListComponent } from '../../components/card-user-list/card-user-list.component';
import { BigProductCardComponent } from "../../components/big-product-card/big-product-card.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vod',
  standalone: true,
  imports: [ProductListComponent, UploadCardComponent, CardUserListComponent, BigProductCardComponent], 
  templateUrl: './vod.component.html',
  styleUrls: ['./vod.component.scss'] 
})
export class VodComponent implements OnInit {
  products: ModelProducts[] = [];
  private api = inject(ProductService);
  selectedProduct: ModelProducts | null = null;
  private authService = inject(AuthService);
  
  ngOnInit(): void {
    try {
      const userId = this.authService.getPayLoad();
      this.api.getAllProducts(userId).then((data) => {
        this.products = data;
      }).catch((error) => {
        console.error("Erreur lors de la récupération des produits de l'utilisateur :", error);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID utilisateur :", error);
    }
  }

  onAddProduct() {
    console.log('onAddProduct called');
    this.api.getProducts().then(data => {
      this.products = data;
    });
  }
}