import { Component } from '@angular/core';
import { CardProductComponent } from "../card-product/card-product.component";

@Component({
  selector: 'app-product-list',
  imports: [CardProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
