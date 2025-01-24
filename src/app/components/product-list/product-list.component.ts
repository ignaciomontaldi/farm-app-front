import { Component, inject, OnInit } from '@angular/core';
import { CardProductComponent } from "../card-product/card-product.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../types';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-product-list',
  imports: [CardProductComponent, SearchBarComponent, CommonModule, CardProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  private _productService: ProductService = inject(ProductService)
  private _loaderService: LoaderService = inject(LoaderService);

  productList?:Product[];

  ngOnInit(): void {
    this._loaderService.showLoader();
    setTimeout(() => {
      this._productService.loadProducts()
      this._productService.product$.subscribe({
        next: (products) => {
          this.productList = products;
          this._loaderService.hideLoader();
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this._loaderService.hideLoader();
        }
      })
    }, 2000) 
  }
}
