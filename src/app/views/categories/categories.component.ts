import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../types';
import { HttpClient } from '@angular/common/http';
import { FAKE_API_URL } from '../../constants/apiUrl';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";

@Component({
  selector: 'app-categories',
  imports: [CommonModule, CardProductComponent, SideBarComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private http : HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private route : ActivatedRoute = inject(ActivatedRoute);
  productsByCategory?: any[];
  routeParams: string|null = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.routeParams = params.get('category')
      this.updateProductsByCategory();
    })
    }
    updateProductsByCategory(): void {
      if (this.routeParams) {
        this.http
          .get<Product[]>(`${FAKE_API_URL}/category/${this.routeParams}`)
          .subscribe(products => {
            this.productsByCategory = products;
          });
      } else {
        this.productsByCategory = []; // Manejo en caso de que no haya categoría
      }
    }
  }

