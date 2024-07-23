import { Injectable } from '@angular/core';
import { ModelProducts } from '../utils/model-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  public async getProducts(limite: number = 20): Promise<ModelProducts[]> {
    return fetch(`http://localhost:3000/products/${limite}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Erreur lors de la récupération des produits :', error);
      throw error;
    });
  }

  public async getAllProducts(): Promise<ModelProducts[]> {
    return fetch(`http://localhost:3000/products/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Erreur lors de la récupération des produits :', error);
      throw error;
    });
  }


  public async addProduct(product: ModelProducts): Promise<ModelProducts> {
    console.log(JSON.stringify(product));
    return fetch(`http://localhost:3000/addproduct`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    })  
    .then(res => res.json())
    .catch(err => console.error('Erreur lors de la création du produit', err));
}


public async deletedProduct(id: number): Promise<ModelProducts> {
  return fetch(`http://localhost:3000/deleteproduct/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .catch(err => console.error('Erreur lors de la suppression du produit', err));
}

public async updateProduct(product: ModelProducts): Promise<ModelProducts> {
  console.log("Données envoyées à l'API:", product);
  return fetch(`http://localhost:3000/updateproduct/${product.id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers : new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json() as Promise<ModelProducts>)
  .catch(err => {
    console.error('Erreur lors de la mise à jour du produit', err);
    throw err;
  });

}
}
