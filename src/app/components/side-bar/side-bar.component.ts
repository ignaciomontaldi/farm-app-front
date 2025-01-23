import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Category } from '../../../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './sideBar.component.css'
})
export class SideBarComponent implements OnInit {

  private _productService: ProductService = inject(ProductService);
  categories: string[] = [];
  ngOnInit(): void {
    this._productService.loadCategories();
   this._productService.productCategory$.subscribe({
    next: (categories) => {
      this.categories = categories;
    },
    error: (error) => {
      console.error('Error fetching categories:', error);
    }
   })
  }

}
