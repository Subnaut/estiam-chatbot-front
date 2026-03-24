import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly role: WritableSignal<'user' | 'admin' | null> = signal(null);

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.role.set(this.getRoleToken(token));
    }
  }

  login(jwt: string) {
    localStorage.setItem('token', jwt);
    this.role.set(this.getRoleToken(jwt));
  }

  logout() {
    localStorage.removeItem('token');
    this.role.set(null);
  }

  getRoleToken(token: string) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const role = JSON.parse(decodedPayload).role;
    return role;
  }
}
