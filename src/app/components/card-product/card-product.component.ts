import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../types';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-card-product',
  imports: [RouterLink, CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() product! : Product
  private _productService: ProductService = inject(ProductService);
  constructor() {}

  addProduct(product:Product) {
    this._productService.addToCart(product)
  }
}
