import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from '../../services/loader/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  private _authService = inject(AuthService)
  private router : Router = inject(Router);

  loginForm: FormGroup;
  loading: boolean = false;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
    if(this._authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }
  }

  onSubmit() {
    this.loading = true;
    setTimeout(() => {
      this._authService.login(this.loginForm.value).subscribe(response => {
        this._authService.updateUserData()
        this.router.navigate(['/'])
      })
      this.loading = false;
    }, 3000)
  }
}
