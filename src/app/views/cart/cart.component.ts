import { Component } from '@angular/core';
import { CardProductComponent } from "../../components/card-product/card-product.component";
import { CartProductComponent } from "../../components/cart-product/cart-product.component";

@Component({
  selector: 'app-cart',
  imports: [CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
