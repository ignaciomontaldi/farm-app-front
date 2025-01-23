import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators'
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  userLogged? : boolean;
  cartLength? : number;
  currentRoute: string = "";

  constructor(private _authService: AuthService, private router : Router, private _productService: ProductService) {
    
  }
  
  ngOnInit(): void {
    this._authService.updateUserData();
    this._productService.initializeCart();
    this._productService.cartItemCount$.subscribe(count => {
      this.cartLength = count;
    })
    this._authService.userLogged$.subscribe(isLoggedIn => {
      this.userLogged = isLoggedIn;
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }



  updateUserData() {
    this._authService.updateUserData();
  }

  updateItemCount() {
    this.cartLength = this._productService.getCartItemCount();
  }
}
