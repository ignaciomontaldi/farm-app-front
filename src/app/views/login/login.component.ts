import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private _localStorageService: LocalStorageService) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this._localStorageService.setItem('userLogged', "true")
    
  }
}
