import { Component, inject, Input } from '@angular/core';
import { ProductCart } from '../../../types';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-cart-product',
  imports: [],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent {
  @Input() product!: ProductCart;
  private _productService : ProductService = inject(ProductService);

  removeProduct(product:ProductCart) {
      this._productService.removeFromCart(product.id);
  }

}