import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

interface Login {
  email?: string,
  password?: string
}

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  user: Login = {}
  forgetPassword: boolean = false

  constructor(private router: Router, private authService: AuthService) {
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


    this.authService.login({ email: this.user.email, password: this.user.password }).subscribe({
      next: res => {
        console.log("Connecté!", res);
        // par exemple, stocker le user id et token (si token reçu)
        localStorage.setItem('user_id', res.user_id?.toString());
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        this.router.navigate(['/home']); // ou autre page après connexion
      },
      error: err => {
        console.error("Erreur de connexion", err);
        alert("Email ou mot de passe incorrect");
      }
    });

  }
}
