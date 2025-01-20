import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { BehaviorSubject, Observable, pipe, tap } from 'rxjs';
import { Product, ProductCart } from '../../../types';
import { FAKE_API_URL } from '../../constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _localStorageService = inject(LocalStorageService);
  private http = inject(HttpClient);
  private productSubject = new BehaviorSubject<Product[]>([])
  product$ = this.productSubject.asObservable();
  cart:ProductCart[] = [];
  
  constructor() { }

  getCart():ProductCart[] {
    return this.cart;
  }

  loadProducts() {
    this.http.get<Product[]>(FAKE_API_URL).pipe(
      tap((products) => {
        this.productSubject.next(products);
      })
    ).subscribe()
  }

  getProducts() {
    return this.product$;
  }


  initializeCart() {
    const cart = this._localStorageService.getItem('cart')
    if(!cart) {
      this._localStorageService.setItem('cart', JSON.stringify([]))
    } else {
      this.cart = JSON.parse(cart);
    }
  }

  saveCart(cart:Product[]):void {
    this._localStorageService.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product:Product):void {
    const existingProduct = this.cart.find(p => p.id === product.id);
    if(existingProduct) {
      existingProduct.quantity +=1;
    } else {
      this.cart.push({...product, quantity:1});
    }
    this.saveCart(this.cart);
  }

  removeFromCart(productId: number):void {
    const product = this.cart.find(product => product.id === productId);

    if(product) {
      if(product.quantity > 1) {
        product.quantity -= 1;
      } else {
        this.cart = this.cart.filter(p => p.id!== productId);
      }
      this.saveCart(this.cart);
    }
  }

}
