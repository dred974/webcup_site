import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {

  constructor(private router: Router) {
  }

  toLogInPage(event: Event): void {
    // event.preventDefault()
    this.router.navigate([''])
  }

  handleSubmit(event: Event): void {
    event.preventDefault()
    this.router.navigate([''])
  }
}
