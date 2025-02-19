import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CardProductComponent } from "../../components/card-product/card-product.component";
import { CartProductComponent } from "../../components/cart-product/cart-product.component";
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { ProductCart } from '../../../types';
import { LoaderService } from '../../services/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CartProductComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {

  private _productService: ProductService = inject(ProductService)
  private _loaderService: LoaderService = inject(LoaderService)
  userCart? : ProductCart[];
  totalPrice : number = 0;
  cartSubscriptions?: Subscription;

  ngOnInit(): void {
    this._productService.initializeCart();
    this._loaderService.showLoader();
    console.log(this._productService.cart$)
    this.cartSubscriptions = this._productService.cart$.subscribe(cart => {
      console.log(cart)
      this.userCart = cart;
      this.totalPrice = this.calculateTotalPrice(cart);
    })
    this._loaderService.hideLoader();
  }

  ngOnDestroy(): void {
    if(this.cartSubscriptions) {
      this.cartSubscriptions.unsubscribe();
    }
  }

  private calculateTotalPrice(cart: ProductCart[]): number {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

}
