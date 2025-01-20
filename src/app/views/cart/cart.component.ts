import { Component, inject, OnInit } from '@angular/core';
import { CardProductComponent } from "../../components/card-product/card-product.component";
import { CartProductComponent } from "../../components/cart-product/cart-product.component";
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { ProductCart } from '../../../types';

@Component({
  selector: 'app-cart',
  imports: [CartProductComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private _productService: ProductService = inject(ProductService)
  userCart? : ProductCart[];
  totalPrice : number = 0;

  ngOnInit(): void {
    this._productService.initializeCart();
    this.userCart = this._productService.getCart();
    this.userCart.forEach(product => {
      this.totalPrice += product.price * product.quantity;
    });
  }

}
