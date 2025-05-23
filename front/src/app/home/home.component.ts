import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

interface Post {
  userId: number;
  postId: number;
  title: string;
  text: string;
  author: string;
  emojis?: Emojis;
}

interface Emojis {
  heart?: number;
  brokenheart?: number;
  sad: number;
  cry: number;
  angry: number;
  sadness: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allPosts: Post[] = [];
  myPosts: Post[] = [];
  isButtonPostsActive: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userIdStr = localStorage.getItem('current_user_id');
    if (!userIdStr) return;

    const userId = parseInt(userIdStr, 10);
    const postsRaw = localStorage.getItem('app_posts');
    const posts: Post[] = postsRaw ? JSON.parse(postsRaw) : [];

    this.allPosts = posts;
    this.myPosts = posts.filter(p => p.userId === userId);
  }

  getEmojiKey(index: number): keyof Emojis {
    const keys: (keyof Emojis)[] = ['heart', 'brokenheart', 'sad', 'cry', 'angry', 'sadness'];
    return keys[index];
  }

  isPosts(b: boolean): void {
    this.isButtonPostsActive = b;
  }

  toggleEmoji(post: Post, index: number): void {
    const keys = ['heart', 'brokenheart', 'sad', 'cry', 'angry', 'sadness'] as const;
    const key = keys[index];

    if (!post.emojis) post.emojis = { sad: 0, cry: 0, angry: 0, sadness: 0 };
    post.emojis[key] = (post.emojis[key] || 0) + 1;

    localStorage.setItem('app_posts', JSON.stringify(this.allPosts));
  }

  downloadImage(post: Post): void {
    const title = post.title;
    const text = post.text;

    const padding = 20;
    const spacingTitle = 20;
    const fontSizeTitle = 32;
    const fontSizeText = 24;
    const lineHeight = 30;
    const maxWidth = 600;

    const textLines = this.wrapTextLines(text, fontSizeText, maxWidth - padding * 2);
    const height = padding * 2 + fontSizeTitle + spacingTitle + textLines.length * lineHeight;

    const canvas = document.createElement('canvas');
    canvas.width = maxWidth;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.max(canvas.width, canvas.height) / 2;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, '#2a2a2a');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'top';
    ctx.font = `${fontSizeTitle}px "Dancing Script", cursive`;
    ctx.fillText(title, padding, padding);

    ctx.font = `${fontSizeText}px "Dancing Script", cursive`;
    let y = padding + fontSizeTitle + spacingTitle;
    for (const line of textLines) {
      ctx.fillText(line, padding, y);
      y += lineHeight;
    }

    const link = document.createElement('a');
    link.download = 'mon-post.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  private wrapTextLines(text: string, fontSize: number, maxWidth: number): string[] {
    const measureCanvas = document.createElement('canvas');
    const measureCtx = measureCanvas.getContext('2d')!;
    measureCtx.font = `${fontSize}px "Dancing Script", cursive`;

    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';

    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (measureCtx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }
}
