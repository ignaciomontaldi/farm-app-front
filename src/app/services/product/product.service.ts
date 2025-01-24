import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { BehaviorSubject, map, Observable, pipe, tap } from 'rxjs';
import { Category, Product, ProductCart } from '../../../types';
import { FAKE_API_URL } from '../../constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _localStorageService = inject(LocalStorageService);
  private http = inject(HttpClient);
  private productSubject = new BehaviorSubject<Product[]>([])
  private productCategorySubject = new BehaviorSubject<string[]>([]);
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private productByCategorySubject = new BehaviorSubject<Product[]>([]);
  cartLength? : number = 0;
  product$ = this.productSubject.asObservable();
  productCategory$ = this.productCategorySubject.asObservable();
  productByCategory$ = this.productByCategorySubject.asObservable();
  cartItemCount$ = this.cartItemCountSubject.asObservable();
  cart:ProductCart[] = [];
  
  constructor() { }

  getCart():ProductCart[] {
    return this.cart;
  }

  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
  getProducts() {
    return this.product$;
  }

  getCategories() {
    return this.productCategory$;
  }

  fetchCategories(): Observable<Category[]> {
    return this.http.get<string[]>(`${FAKE_API_URL}/categories`).pipe(
      map((categories) => {
        return categories as Category[];
      })
    );
  }

  loadCategories(): void {
    this.fetchCategories().subscribe({
      next: (categories) => {
        this.productCategorySubject.next(categories);
      },
      error: (error) => {
        console.error('Error cargando categorías:', error);
      }
    })
  }

  loadProducts() {
    this.http.get<Product[]>(FAKE_API_URL).pipe(
      tap((products) => {
        this.productSubject.next(products);
      })
    ).subscribe()
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
    this.updateCartItemCount();
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
      this.updateCartItemCount();
    }
  }

  updateCartItemCount() {
    const itemCount = this.getCartItemCount();
    this.cartItemCountSubject.next(itemCount);
  }

}
