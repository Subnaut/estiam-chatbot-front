import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Auth } from './services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  auth = inject(Auth);
  notification = inject(MatSnackBar);
  router = inject(Router);

  onDeconnexion() {
    this.auth.logout();
    this.notification.open('Vous êtes déconnecté', '', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    this.router.navigateByUrl('/login');
  }
}
