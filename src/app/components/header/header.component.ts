import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  userLogged? : boolean;
  currentRoute: string = "";

  constructor(private _authService: AuthService, private router : Router) {
    
  }
  
  ngOnInit(): void {
    this.userLogged = this._authService.isLoggedIn() || false;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }
}
