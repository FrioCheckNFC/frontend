import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService, type UserRole } from '../../core/services/auth.service';
import { FilterService } from '../../core/services/filter.service';

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
  @Input() collapsed = false;
  @Output() collapseChange = new EventEmitter<boolean>();

  logoLight = '/imagenes/logos/FrioCheck.svg';
  logoDark = '/imagenes/logos/FrioCheckDark.svg';
  userRole: UserRole | null = null;
  navItems: NavItem[] = [];

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.updateNavItems();

    this.authService.role$.subscribe((role) => {
      this.userRole = role;
      this.updateNavItems();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      const viewName = this.getViewNameFromUrl(url);
      if (viewName) {
        this.filterService.addToHistory(viewName);
      }
    });
  }

  private getViewNameFromUrl(url: string): string | null {
    const urlToViewName: { [key: string]: string } = {
      '/dashboard': 'dashboard',
      '/tickets': 'tickets',
      '/visitas': 'visitas',
      '/activos': 'activos',
      '/reportes': 'reportes',
      '/usuarios': 'usuarios',
      '/pedidos': 'pedidos',
      '/locales': 'locales',
      '/configuracion': 'configuracion',
      '/perfil': 'perfil',
    };
    return urlToViewName[url] || null;
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

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapseChange.emit(this.collapsed);
  }
}
