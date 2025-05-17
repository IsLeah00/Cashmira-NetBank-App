import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'cashmira-frontend';  
}

export function showSnackbar(message: string, type: 'error' | 'success') {
  const snackbar = document.createElement('div');
  snackbar.className = `snackbar ${type}`;
  snackbar.innerHTML = `
    <span>${message}</span>
    <span class="close" style="margin-left: 12px; cursor: pointer;">X</span>
  `;

  document.body.appendChild(snackbar);

  snackbar.querySelector('.close')?.addEventListener('click', () => {
    fadeOutAndRemove(snackbar);
  });

  setTimeout(() => {
    fadeOutAndRemove(snackbar);
  }, 5000);

  function fadeOutAndRemove(el: HTMLElement) {
    el.style.animation = 'fadeOut 0.5s ease forwards';
    el.addEventListener('animationend', () => {
      el.remove();
    }, { once: true });
  }
}
