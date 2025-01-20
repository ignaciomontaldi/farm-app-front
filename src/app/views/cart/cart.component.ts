import { Component, inject, OnInit } from '@angular/core';
import { CardProductComponent } from "../../components/card-product/card-product.component";
import { CartProductComponent } from "../../components/cart-product/cart-product.component";
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartProductComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private _productService: ProductService = inject(ProductService)
  userCart = this._productService.cart;
  ngOnInit(): void {
    this._productService.initializeCart();
  }

}
