import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface AddPost {
  userId: number,
  postId: number,
  title: string,
  text: string
}
@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  providers: [RouterLink],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.scss'
})
export class AddpostComponent implements OnInit {
  post: Partial<AddPost> = {}

  constructor(private router: Router) {}

  ngOnInit(): void {}

  addingPost(): void {
    if (!this.post.title || !this.post.text) {
      alert("Tous les champs doivent être OBLIGATOIREMENT remplis");
      return;
    }

    const userIdStr = localStorage.getItem('current_user_id');
    if (!userIdStr) {
      alert("Utilisateur non connecté.");
      return;
    }

    const userId = parseInt(userIdStr, 10);

    const postsRaw = localStorage.getItem('app_posts');
    const posts: AddPost[] = postsRaw ? JSON.parse(postsRaw) : [];

    const nextPostId = posts.length > 0 ? Math.max(...posts.map(p => p.postId)) + 1 : 1;

    const newPost: AddPost = {
      userId,
      postId: nextPostId,
      title: this.post.title!,
      text: this.post.text!
    };

    posts.push(newPost);
    localStorage.setItem('app_posts', JSON.stringify(posts));

    this.router.navigate(['/home']);
  }

}
