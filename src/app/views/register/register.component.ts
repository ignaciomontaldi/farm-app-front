import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

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

  onSubmit() {
    console.log(this.registerForm.value);
    // Send the form data to the server.
  }
}
