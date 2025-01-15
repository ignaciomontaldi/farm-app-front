import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { checkEmail, checkName, checkPassword, checkValidNumber, isEmailRepeated } from '../../../utils/registerValidations';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../../types/user.types';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  usersList: User[] = [];

  constructor(private _authService: AuthService, private router:Router) {
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
    this._authService.loadUsers().subscribe();
    this._authService.getUsersList().subscribe((users: User[]) => {
      this.usersList = users;
    });
  }

  onSubmit() {
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
          throw new Error("Email repetido")
        }
        this._authService.registerUser(this.registerForm.value).subscribe(
          (response) => {
            this.router.navigate(['/login']);
          },
          (error) => {
            throw new Error("Algo malo ha sucedido, intentelo más tarde")
          }
        );
      } else {
        console.log("Hay errores en el formulario")
      }
    } else {
      console.log("Las contraseñas no coinciden")
    }
   
  }
}


