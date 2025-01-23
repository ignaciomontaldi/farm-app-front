import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  _authService = inject(AuthService)
  constructor(private _localStorageService: LocalStorageService, private router : Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    this._authService.login(this.loginForm.value).subscribe(response => {
      this._authService.updateUserData()
      this.router.navigate(['/'])
    })
  }
}
