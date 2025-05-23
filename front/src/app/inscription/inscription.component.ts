import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

interface SignIn {
  name?: string,
  email?: string,
  password?: string
}

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  user: SignIn = {}
  

  constructor(private router: Router) {
  }

  toLogInPage(): void {
    this.router.navigate(['/connexion'])
  }

  handleSubmit(event: Event): void {
    event.preventDefault();

    if (!this.user.name || !this.user.email || !this.user.password) {
      alert("Tous les champs doivent être OBLIGATOIREMENT remplis.");
      return;
    }

    const hasRequiredLength = this.user.password.length >= 8 && this.user.password.length <= 40;
    const hasDigit = /\d/.test(this.user.password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(this.user.password);

    if (!hasRequiredLength || !hasDigit || !hasSpecialChar) {
      alert("Le mot de passe doit contenir entre 8 et 40 caractères, au moins un chiffre et un caractère spécial.");
      return;
    }

    let userIdCounter = parseInt(localStorage.getItem('user_id_counter') || '0', 10);
    userIdCounter += 1;
    localStorage.setItem('user_id_counter', userIdCounter.toString());

    const usersRaw = localStorage.getItem('app_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const newUser = {
      id: userIdCounter,
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      posts: []
    };

    users.push(newUser);
    localStorage.setItem('app_users', JSON.stringify(users));

    localStorage.setItem('current_user_id', userIdCounter.toString());

    alert("Inscription réussie !");
    this.router.navigate(['/connexion']);
  }
}
