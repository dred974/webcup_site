import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  providers: [RouterLink],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.scss'
})
export class AddpostComponent {

  constructor(private router: Router) {}

  addingPost(): void {
    this.router.navigate(['/home'])
  }
}
