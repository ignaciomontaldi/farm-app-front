import { Component, inject, Input } from '@angular/core';
import { ProductCart } from '../../../types';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-cart-product',
  imports: [CommonModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent {
  @Input() product!: ProductCart;
  private _productService : ProductService = inject(ProductService);
  private _modalService : ModalService = inject(ModalService);

  removeProduct(product:ProductCart) {
      this._productService.removeFromCart(product.id);
      this._modalService.openModal("success", "Producto quitado con éxito");
      this._productService.updateCartItemCount();
      this._productService.refreshCart();
      this._modalService.hideModal()
  }

}