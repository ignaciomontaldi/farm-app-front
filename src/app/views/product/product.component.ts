import { Component, inject, OnInit } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../types';
import { HttpClient } from '@angular/common/http';
import { FAKE_API_URL } from '../../constants/apiUrl';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-product',
  imports: [SideBarComponent, RouterLink, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  private router : Router = inject(Router);
  private http : HttpClient = inject(HttpClient);
  private _productService : ProductService = inject(ProductService);
  private _loaderService : LoaderService = inject(LoaderService);
  product?:Product;

  constructor() { }

  ngOnInit(): void {
    const productId = parseInt(this.router.url.split('/')[2]);
    this._loaderService.showLoader();
    this.http.get<Product>(`${FAKE_API_URL}/${productId}`).subscribe(product => {
      this.product = product;
    })
    this._loaderService.hideLoader();
  }

  addProduct(product?:Product) {
    if(product){
      this._productService.addToCart(product);
    }
  }
}
