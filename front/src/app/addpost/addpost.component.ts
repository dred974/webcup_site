import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface addPost {
  title?: string,
  text?: string
}

@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  providers: [RouterLink],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.scss'
})
export class AddpostComponent {
  post: addPost = {}

  constructor(private router: Router) {}

  addingPost(): void {
    if (!this.post.title || !this.post.text) {
      alert("Tous les champs doivent être OBLIGATOIREMENT remplis")
      return
    }

    this.router.navigate(['/home'])
  }
}
