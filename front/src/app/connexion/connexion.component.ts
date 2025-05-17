import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Login {
  email?: string,
  password?: string
}

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  user: Login = {}
  forgetPassword: boolean = false

  constructor(private router: Router) {
  }

  toSignInPage(): void {
    this.router.navigate(['/inscription'])
  }

  toForgetPasswordForm(b: boolean): void {
    this.forgetPassword = b
  }

  sendNewPassword(e: Event, b: boolean): void {
    e.preventDefault()
    if (!this.user.password) {
      alert("Le champ doit être OBLIGATOIREMENT rempli");
      return;
    }

    const hasRequiredLength = this.user.password!.length >= 8 && this.user.password!.length <= 40;
    const hasDigit = /\d/.test(this.user.password!);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(this.user.password!);

    if (!hasRequiredLength || !hasDigit || !hasSpecialChar) {
      alert("Le mot de passe doit contenir entre 8 et 40 caractères, au moins un chiffre et un caractère spécial.");
      return;
    }

    this.toForgetPasswordForm(b)
    this.user.password = ''
  }

  handleSubmit(event: Event): void {
    event.preventDefault();

    if (!this.user.email || !this.user.password) {
      alert("Tous les champs doivent être OBLIGATOIREMENT remplis.");
      return;
    }

    const hasRequiredLength = this.user.password!.length >= 8 && this.user.password!.length <= 40;
    const hasDigit = /\d/.test(this.user.password!);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(this.user.password!);


    if (!hasRequiredLength || !hasDigit || !hasSpecialChar) {
      alert("Le mot de passe doit contenir entre 8 et 40 caractères, au moins un chiffre et un caractère spécial.");
      return;
    }

    // Si tout est bon, on navigue
    this.router.navigate(['/home']);
  }
}
