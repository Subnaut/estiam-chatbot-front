import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CheckInput } from '../../components/check-input/check-input';

@Component({
  selector: 'app-register',
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, CheckInput],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  hasUppercaseChar = false;
  hasLowercaseChar = false;
  hasMinimumLength = false;

  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmitRegister() {
    console.log('tentative de connexion');

    if (this.formulaire.valid && this.hasMinimumLength && this.hasLowercaseChar && this.hasUppercaseChar) {
      this.httpClient
        .post('http://localhost:8080/register', this.formulaire.value, { responseType: 'text' })
        .subscribe((reponse) => console.log(reponse));
    }
  }

  checkPassword() {
    const value = this.formulaire.get('password')?.value;

    if (value) {
      this.hasMinimumLength = value.length >= 4;
      this.hasLowercaseChar = /[a-z]/.test(value);
      this.hasUppercaseChar = /[A-Z]/.test(value);
    }
  }
}
