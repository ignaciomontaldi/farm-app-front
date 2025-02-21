import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  private _authService : AuthService = inject(AuthService);
  private _modalService : ModalService = inject(ModalService);
  private router : Router = inject(Router);
  private form : FormBuilder = inject(FormBuilder);

  loginForm: FormGroup;
  loading: boolean = false;

  constructor() {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if(this._authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }
  }

  hasErrors(controlName : string , errorType : string) {
    return this.loginForm.get(controlName)?.hasError(errorType) && this.loginForm.get(controlName)?.touched;
  }

  onSubmit() {
    this.loading = true;
    if(this.loginForm.invalid) {
      this.loading = false;
      this.loginForm.markAllAsTouched();
      this._modalService.openModal('error', 'Revisar los campos');
      this._modalService.hideModal();
    } else {
      this._authService.login(this.loginForm.value).subscribe(response => {
        this._authService.updateUserData()
        this.router.navigate(['/'])
        this.loading = false;
      }, (error) => {
        this._modalService.openModal('error', error);
        this._modalService.hideModal();
        this.loading = false;
      })
    }
  }
}

/*
 setTimeout(() => {
      this._authService.login(this.loginForm.value).subscribe(response => {
        this._authService.updateUserData()
        this.router.navigate(['/'])
      })
      this.loading = false;
    }, 3000)
*/
