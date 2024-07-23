import { Component, OnInit, inject } from '@angular/core';
import { ModelProducts } from '../../utils/model-products';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { UploadCardComponent } from '../../components/upload-card/upload-card.component';
import { CardUserListComponent } from '../../components/card-user-list/card-user-list.component';
import { BigProductCardComponent } from "../../components/big-product-card/big-product-card.component";



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
  
  ngOnInit(): void {
    this.api.getProducts().then(data => {
      this.products = data;
    });
  }

  onAddProduct() {
    console.log('onAddProduct called');
    this.api.getProducts().then(data => {
      this.products = data;
    });
  }

  

  
}