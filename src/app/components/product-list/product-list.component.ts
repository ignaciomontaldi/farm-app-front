import { Component } from '@angular/core';
import { CardProductComponent } from "../card-product/card-product.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-product-list',
  imports: [CardProductComponent, SearchBarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
