import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, Sidebar, Topbar],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // TODO: Tema oscuro desactivado temporalmente
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // const savedTheme = localStorage.getItem('theme');

    // if (savedTheme) {
    //   document.documentElement.setAttribute('data-theme', savedTheme);
    // } else if (prefersDark) {
    //   document.documentElement.setAttribute('data-theme', 'dark');
    // }

    // Forzar tema claro
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');

    if (current === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login' || this.router.url === '/';
  }
}
