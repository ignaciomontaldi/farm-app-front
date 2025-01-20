import { Component, inject, OnInit } from '@angular/core';
import { CardProductComponent } from "../card-product/card-product.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../types';

@Component({
  selector: 'app-product-list',
  imports: [CardProductComponent, SearchBarComponent, CommonModule, CardProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  private _productService: ProductService = inject(ProductService)
  productList?:Product[];

  ngOnInit(): void {
    this._productService.loadProducts()
    this._productService.product$.subscribe(products => {
      this.productList = products;
    })
  }
}
