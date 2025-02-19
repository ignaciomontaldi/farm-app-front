import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../types';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-card-product',
  imports: [RouterLink, CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() product! : Product
  private _productService: ProductService = inject(ProductService);
  private _modalService: ModalService = inject(ModalService);
  constructor() {}

  addProduct(product:Product) {
    this._productService.addToCart(product);
    this._modalService.openModal("success", "Producto agregado al carrito");
    this._modalService.hideModal();
  }
}
