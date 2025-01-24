import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { checkEmail, checkName, checkPassword, checkValidNumber, isEmailRepeated } from '../../../utils/registerValidations';
import { User } from '../../../types/user.types';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  private _authService: AuthService = inject(AuthService)
  private router : Router = inject(Router);
  private _userService: UserService = inject(UserService);

  registerForm: FormGroup;
  usersList: User[] = [];
  loading: boolean = false;

  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      email: new FormControl(),
      dni: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  ngOnInit(): void {
    this._userService.loadUsers().subscribe();
    this._userService.getUsersList().subscribe((users: User[]) => {
      this.usersList = users;
    });
  }

  onSubmit() {
    this.loading = true;
    setTimeout(() => {
      const data = this.registerForm.value;
    if(data.password === data.confirmPassword) {
      const passwordValidated = checkPassword(data.password);
      const dniValidated = checkValidNumber(data.dni);
      const nameValidated = checkName(data.name);
      const surnameValidated = checkName(data.surname);
      const emailValidated = checkEmail(data.email);
      const inputs = [passwordValidated, dniValidated, nameValidated, surnameValidated, emailValidated];
      if(inputs.every(input => input)) {
        if(isEmailRepeated(data.email, this.usersList)){
          this.loading = false;
          throw new Error("Email repetido");
        }
        this._authService.registerUser(this.registerForm.value).subscribe(
          (response) => {
            this.loading = false;
            this.router.navigate(['/login']);
          },
          (error) => {
            this.loading = false;
            throw new Error("Algo malo ha sucedido, intentelo más tarde")
          }
        );
      } else {
        this.loading = false;
        console.log("Hay errores en el formulario")
      }
    } else {
      this.loading = false;
      console.log("Las contraseñas no coinciden")
    }
    this.loading = false;
    }, 3000)
  }
}


