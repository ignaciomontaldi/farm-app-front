import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../types/user.types';
import { UserService } from '../../services/user/user.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private router: Router = inject(Router);
  private _userService: UserService = inject(UserService)
  private _authService: AuthService = inject(AuthService)
  private _localStorageService: LocalStorageService = inject(LocalStorageService);
  private _loaderService: LoaderService = inject(LoaderService);
  private _modalService: ModalService = inject(ModalService);
  user?:User;

  ngOnInit(): void {
    const userId = this._localStorageService.getItem('userId')
    this._loaderService.showLoader()
    if(userId) {
      this._userService.getUserById(userId).subscribe(user => {
        this.user = user;
      })
    }
    this._loaderService.hideLoader()
  }


  logout() {
    this._localStorageService.removeItem('userId');
    this._localStorageService.removeItem('userLogged');
    this._authService.updateUserData();
    this._modalService.openModal("success", "Usted se ha deslogeado");
    this.router.navigate(['/login'])
    this._modalService.hideModal();
  }

}
