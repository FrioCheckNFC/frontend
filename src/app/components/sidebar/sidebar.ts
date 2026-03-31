import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, type UserRole } from '../../core/services/auth.service';

interface NavItem {
  label?: string;
  route?: string;
  icon?: string;
  separator?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit {
  logoLight = '/imagenes/logos/FrioCheck.svg';
  logoDark = '/imagenes/logos/FrioCheckDark.svg';
  userRole: UserRole | null = null;
  navItems: NavItem[] = [];

  // Items para Soporte
  private supportItems: NavItem[] = [
    { label: 'Panel', route: '/dashboard', icon: 'home' },
    { label: 'Tickets', route: '/tickets', icon: 'alert-circle' },
    { label: 'Visitas', route: '/visitas', icon: 'map-pin' },
    { label: 'Activos NFC', route: '/activos', icon: 'layers' },
    { label: 'Reportes', route: '/reportes', icon: 'bar-chart' },
    { label: 'Usuarios', route: '/usuarios', icon: 'users' },
    { separator: true },
    { label: 'Mi Perfil', route: '/perfil', icon: 'user' },
  ];

  // Items para Admin
  private adminItems: NavItem[] = [
    { label: 'Panel', route: '/dashboard', icon: 'home' },
    { label: 'Activos NFC', route: '/activos', icon: 'layers' },
    { label: 'Visitas', route: '/visitas', icon: 'map-pin' },
    { label: 'Tickets', route: '/tickets', icon: 'alert-circle' },
    { label: 'Pedidos', route: '/pedidos', icon: 'package' },
    { label: 'Locales', route: '/locales', icon: 'store' },
    { label: 'Usuarios', route: '/usuarios', icon: 'users' },
    { label: 'Reportes', route: '/reportes', icon: 'bar-chart' },
    { separator: true },
    { label: 'Configuración', route: '/configuracion', icon: 'settings' },
    { label: 'Mi Perfil', route: '/perfil', icon: 'user' },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.updateNavItems();

    this.authService.role$.subscribe((role) => {
      this.userRole = role;
      this.updateNavItems();
    });
  }

  private updateNavItems(): void {
    if (this.userRole === 'soporte') {
      this.navItems = this.supportItems;
    } else if (this.userRole === 'admin') {
      this.navItems = this.adminItems;
    } else {
      this.navItems = [];
    }
  }
}
