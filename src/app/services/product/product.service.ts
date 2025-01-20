import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _localStoraresService = inject(LocalStorageService);
  cart = [];

  constructor() { }

  initializeCart() {
    const cart = this._localStoraresService.getItem('cart')
    if(!cart) {
      this._localStoraresService.setItem('cart', JSON.stringify([]))
    } else {
      this.cart = JSON.parse(cart);
    }
  }

}
