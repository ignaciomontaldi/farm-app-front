import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  checkEmail,
  checkName,
  checkPassword,
  checkValidNumber,
  isEmailRepeated,
} from '../../../utils/registerValidations';
import { User } from '../../../types/user.types';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private _authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private _userService: UserService = inject(UserService);
  private _modalService: ModalService = inject(ModalService);

  registerForm: FormGroup;
  usersList: User[] = [];
  loading: boolean = false;

  constructor(private form: FormBuilder) {
    this.registerForm = this.form.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dni: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this._userService.loadUsers().subscribe();
    this._userService.getUsersList().subscribe((users: User[]) => {
      this.usersList = users;
    });
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.registerForm.get(controlName)?.hasError(errorType) &&
      this.registerForm.get(controlName)?.touched
    );
  }

  onSubmit() {
    this.loading = true;
    if (this.registerForm.invalid) {
      // Reviso si el formulario recibe datos inválidos
      this.loading = false;
      this.registerForm.markAllAsTouched();
      this._modalService.openModal('error', 'Revisar los campos');
      this._modalService.hideModal();
      return;
    } else {
      // Verifíco que los campos sean válidos;
      const nameInput = this.registerForm.get('name')?.value;
      const surnameInput = this.registerForm.get('surname')?.value;
      const emailInput = this.registerForm.get('email')?.value;
      const dniInput = this.registerForm.get('dni')?.value;
      const passwordInput = this.registerForm.get('password')?.value;
      const confirmPasswordInput =
        this.registerForm.get('confirmPassword')?.value;
      const validatedInputs: boolean[] = [
        checkName(nameInput),
        checkName(surnameInput),
        checkEmail(emailInput),
        checkValidNumber(dniInput),
        checkPassword(passwordInput),
        confirmPasswordInput === passwordInput,
      ];
      if(confirmPasswordInput !== passwordInput) {
        this.loading = false;
        this._modalService.openModal('error', 'Las contraseñas no coinciden');
        this._modalService.hideModal();
        return;
      } else {
        if (
          validatedInputs.every((input) => input) &&
          !isEmailRepeated(emailInput, this.usersList)
        ) {
          this._authService.registerUser(this.registerForm.value).subscribe(
            () => {
              this.loading = false;
              this.router.navigate(['/login']);
            },
            (error) => {
              this.loading = false;
              this._modalService.openModal('error', 'Se ha producido un error, intente de nuevo')
              this._modalService.hideModal();
            }
          );
        } else {
            if(isEmailRepeated(emailInput, this.usersList)) {
              this.loading = false;
              this._modalService.openModal('error', "Email repetido")
              this._modalService.hideModal();
            } else {
              this.loading = false;
              this._modalService.openModal('error', 'Revisar los campos');
              this._modalService.hideModal();
            }
        }
      }
    }
  }
}
