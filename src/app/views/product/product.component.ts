import { Component } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [SideBarComponent, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
