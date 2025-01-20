import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../types/user.types';
import { UserService } from '../../services/user/user.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private _userService: UserService = inject(UserService)
  private router: Router = inject(Router);
  private _localStorageService: LocalStorageService = inject(LocalStorageService);
  user?:User;

  ngOnInit(): void {
    const userId = this._localStorageService.getItem('userId')
    if(userId) {
      this._userService.getUserById(userId).subscribe(user => {
        this.user = user;
      })
    }
  }


  logout() {
    this._localStorageService.removeItem('userId');
    this._localStorageService.removeItem('userLogged');
    this.router.navigate(['/login'])
  }

}
