import { Component, inject, OnInit } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../types';
import { ProductService } from '../../services/product/product.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { ProductComponent } from '../product/product.component';
import { CardProductComponent } from "../../components/card-product/card-product.component";

@Component({
  selector: 'app-search',
  imports: [SideBarComponent, CommonModule, SearchBarComponent, CardProductComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  private router : ActivatedRoute = inject(ActivatedRoute);
  private _productService : ProductService = inject(ProductService);
  private _loaderService : LoaderService = inject(LoaderService);
  searchQuery : string = "";
  filteredProducts : Product[] = [];

  ngOnInit(): void {
    this._loaderService.showLoader();
    this.router.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.filterProducts();
    })
    this._loaderService.hideLoader();
  }

  filterProducts() {
    this._productService.loadProducts();
    this._productService.product$.subscribe(products => {
       this.filteredProducts = products.filter(product => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    })
  }
}
