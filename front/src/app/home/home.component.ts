import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { HeaderComponent } from "../header/header.component";

interface myPosts {
  title?: string
  text?: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  myPost: myPosts = { title: 'MY TITLE', text: 'Jzdezrezvrrezvrrz'}
  emojis = [
    { icon: '❤️', count: 0, selected: false },
    { icon: '💔', count: 0, selected: false },
    { icon: '😢', count: 0, selected: false },
    { icon: '😭', count: 0, selected: false },
    { icon: '😤', count: 0, selected: false },
    { icon: '😞', count: 0, selected: false },
  ];
  isButtonPostsActive: boolean = true

  constructor(private router: Router) {}

  toggleEmoji(index: number): void {
    const emoji = this.emojis[index];
    if (emoji.selected) {
      emoji.count--;
    } else {
      emoji.count++;
    }
    emoji.selected = !emoji.selected;
  }

  isPosts(b: boolean): void {
    this.isButtonPostsActive = b
  }

  downloadImage(): void {
    // 1. Récupère le titre & le texte
    const title = this.myPost.title ?? ''
    const text  = this.myPost.text ?? ''

    // 2. Configuration du canvas
    const padding       = 20;
    const spacingTitle  = 20;
    const fontSizeTitle = 32;
    const fontSizeText  = 24;
    const lineHeight    = 30;
    const maxWidth      = 600;

    // 3. Calcul des lignes de texte
    const textLines = this.wrapTextLines(text, fontSizeText, maxWidth - padding * 2);
    const height = padding * 2
                 + fontSizeTitle
                 + spacingTitle
                 + textLines.length * lineHeight;

    const canvas = document.createElement('canvas');
    canvas.width  = maxWidth;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // 4. Fond : dégradé radial
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.max(canvas.width, canvas.height) / 2;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, '#2a2a2a');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 5. Texte en blanc avec la même police
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'top';

    // Titre
    ctx.font = `${fontSizeTitle}px "Dancing Script", cursive`;
    ctx.fillText(title, padding, padding);

    // Corps de texte
    ctx.font = `${fontSizeText}px "Dancing Script", cursive`;
    let y = padding + fontSizeTitle + spacingTitle;
    for (const line of textLines) {
      ctx.fillText(line, padding, y);
      y += lineHeight;
    }

    // 6. Téléchargement
    const link = document.createElement('a');
    link.download = 'page-depart.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  /** Méthode privée pour couper le texte en lignes */
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
