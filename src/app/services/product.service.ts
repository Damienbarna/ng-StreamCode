import { Injectable } from '@angular/core';
import { ModelProducts } from '../utils/model-products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private http: HttpClient, private authService: AuthService) {}

  public async getProducts(limite: number = 20): Promise<ModelProducts[]> {
    return fetch(`http://localhost:3000/products/${limite}`, {
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

  async getAllProducts(): Promise<ModelProducts[]> {
    const products = await firstValueFrom(this.http.get<ModelProducts[]>('http://localhost:3000/products'));
    
    const productsWithUserInfo = await Promise.all(products.map(async (product: ModelProducts) => {
      const userProfile = await firstValueFrom(this.authService.getUserProfile(product.userId.toString()));
      return {
        ...product,
        user: {
          imageUrl: userProfile.imageUrl,
          name: userProfile.name
        }
      };
    }));
    
    return productsWithUserInfo;
  }


  public async getProductById(id: number): Promise<ModelProducts> {
    return fetch(`http://localhost:3000/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Erreur lors de la récupération du produit :', error);
      throw error;
    });
  }

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  public async getUserProducts(): Promise<ModelProducts[]> {
    
    // Récupérer le token JWT depuis le localStorage (ou sessionStorage)
    if(this.isLocalStorageAvailable){
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      throw new Error('Token non disponible. Veuillez vous connecter.');
    }
  
    return fetch(`http://localhost:3000/user/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erreur HTTP : ' + response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des produits :', error);
      throw error;
    });
    
  }
return[]
}

  public async addProduct(product: ModelProducts): Promise<ModelProducts> {
    console.log(JSON.stringify(product));
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // Récupérez le token JWT
    if (!userId) {
      throw new Error('User ID non disponible. Veuillez vous connecter.');
    }
    const productWithUserId = { ...product, userId: parseInt(userId) };
    return fetch(`http://localhost:3001/addproduct`, { // Assurez-vous que le port est 3001
      method: 'POST',
      body: JSON.stringify(productWithUserId),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Ajoutez le token JWT dans les en-têtes
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
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json() as Promise<ModelProducts>)
  .catch(err => {
    console.error('Erreur lors de la mise à jour du produit', err);
    throw err;
  });

}

likeProduct(productId: number): Observable<ModelProducts> {
  return this.http.post<ModelProducts>(`http://localhost:3000/likeproduct/${productId}/like`, {});
}

public async getUserProfile(userId: string): Promise<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token non disponible. Veuillez vous connecter.');
  }

  return fetch(`http://localhost:3000/user/profile/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur HTTP : ' + response.statusText);
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    throw error;
  });
}

}