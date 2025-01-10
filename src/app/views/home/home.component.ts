import { Component } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { ProductListComponent } from "../../components/product-list/product-list.component";

@Component({
  selector: 'app-home',
  imports: [SideBarComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
