import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  auth = inject(Auth);
  notification = inject(MatSnackBar);
  router = inject(Router);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmitLogin() {
    console.log('tentative de connexion');

    if (this.formulaire.valid) {
      this.httpClient
        .post('http://localhost:8080/login', this.formulaire.value, { responseType: 'text' })
        .subscribe({
          next: (reponse) => {
            this.notification.open('Connexion réussie', '', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.router.navigateByUrl('/home');
            this.auth.login(reponse);
          },
          error: (err) => {
            this.notification.open('Mauvais email / mot de passe', '', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
        });
    }
  }
}
