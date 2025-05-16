import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {

  constructor(private router: Router) {
  }

  toSignInPage(event: Event): void {
    // event.preventDefault()
    this.router.navigate(['/inscription'])
  }

  handleSubmit(event: Event): void {
    event.preventDefault()
    this.router.navigate(['/home'])
  }
}
