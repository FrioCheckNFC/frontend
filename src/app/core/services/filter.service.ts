import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChileLocationsService } from './chile-locations.service';

export interface FilterOption {
  label: string;
  key: string;
  type: 'select' | 'input' | 'date' | 'multiselect';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  isPrimary?: boolean; // True for primary filters, false/undefined for secondary
}

export interface FilterConfig {
  [viewName: string]: FilterOption[];
}

export interface FilterResults {
  filtered: number;
  total: number;
}

export interface ViewRoute {
  route: string;
  label: string;
  icon: string;
}

const VIEW_ROUTES: ViewRoute[] = [
  { route: '/dashboard', label: 'Panel', icon: 'home' },
  { route: '/tickets', label: 'Tickets', icon: 'alert-circle' },
  { route: '/visitas', label: 'Visitas', icon: 'map-pin' },
  { route: '/activos', label: 'Activos NFC', icon: 'layers' },
  { route: '/reportes', label: 'Reportes', icon: 'bar-chart' },
  { route: '/usuarios', label: 'Usuarios', icon: 'users' },
  { route: '/perfil', label: 'Mi Perfil', icon: 'user' },
  { route: '/pedidos', label: 'Pedidos', icon: 'package' },
  { route: '/locales', label: 'Locales', icon: 'store' },
  { route: '/configuracion', label: 'Configuración', icon: 'settings' },
];

const VIEW_NAME_MAP: { [route: string]: string } = {
  '/dashboard': 'dashboard',
  '/tickets': 'tickets',
  '/visitas': 'visitas',
  '/activos': 'activos',
  '/reportes': 'reportes',
  '/usuarios': 'usuarios',
  '/perfil': 'perfil',
  '/pedidos': 'pedidos',
  '/locales': 'locales',
  '/configuracion': 'configuracion',
};

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterConfigMap: FilterConfig = {};
  private historyKey = 'viewHistory';
  private maxHistoryItems = 3;
  private historySubject = new BehaviorSubject<string[]>([]);
  public history$ = this.historySubject.asObservable();

  constructor(private chileLocations: ChileLocationsService) {
    this.initializeFilterConfig();
    this.loadHistory();
  }

  getViewRoute(viewName: string): ViewRoute | undefined {
    return VIEW_ROUTES.find((v) => v.route === viewName || VIEW_NAME_MAP[v.route] === viewName);
  }

  getRouteFromViewName(viewName: string): string | undefined {
    const route = VIEW_ROUTES.find((v) => VIEW_NAME_MAP[v.route] === viewName);
    return route?.route;
  }

  getRecentViews(): ViewRoute[] {
    const history = this.historySubject.value;
    return history
      .map((viewName) => this.getViewRoute(viewName))
      .filter((v): v is ViewRoute => v !== undefined);
  }

  addToHistory(viewName: string): void {
    if (viewName === 'none' || viewName === 'perfil' || viewName === 'configuracion') return;
    
    let history = this.historySubject.value.filter((v) => v !== viewName);
    history.unshift(viewName);
    history = history.slice(0, this.maxHistoryItems);
    
    this.historySubject.next(history);
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  private loadHistory(): void {
    const stored = localStorage.getItem(this.historyKey);
    if (stored) {
      try {
        this.historySubject.next(JSON.parse(stored));
      } catch {
        this.historySubject.next([]);
      }
    }
  }

  private initializeFilterConfig(): void {
    const regionesOptions = this.chileLocations.getRegionesSelect();
    const comunasOptions = this.chileLocations.getComunasSelect();

    this.filterConfigMap = {
      none: [],
      tickets: [
        {
          label: 'Generador',
          key: 'generator',
          type: 'select',
          placeholder: 'Selecciona quién genera',
          isPrimary: true,
          options: [
            { value: 'admin', label: 'Administrador' },
            { value: 'soporte', label: 'Soporte' },
            { value: 'cliente', label: 'Cliente' },
          ],
        },
        {
          label: 'Estado',
          key: 'status',
          type: 'select',
          placeholder: 'Selecciona estado',
          isPrimary: true,
          options: [
            { value: 'sin-resolver', label: 'Sin resolver' },
            { value: 'en-proceso', label: 'En proceso' },
            { value: 'resuelto', label: 'Resuelto' },
          ],
        },
        {
          label: 'Región',
          key: 'region',
          type: 'select',
          placeholder: 'Selecciona región',
          options: regionesOptions,
        },
        {
          label: 'Ciudad',
          key: 'city',
          type: 'select',
          placeholder: 'Selecciona ciudad',
          options: this.chileLocations.getCiudadesSelect(),
        },
        {
          label: 'Comuna',
          key: 'commune',
          type: 'select',
          placeholder: 'Selecciona comuna',
          options: comunasOptions,
        },
        {
          label: 'Prioridad',
          key: 'priority',
          type: 'select',
          placeholder: 'Selecciona prioridad',
          options: [
            { value: 'baja', label: 'Baja' },
            { value: 'media', label: 'Media' },
            { value: 'alta', label: 'Alta' },
          ],
        },
      ],
      visitas: [
        {
          label: 'Rol',
          key: 'role',
          type: 'select',
          placeholder: 'Selecciona rol',
          isPrimary: true,
          options: [
            { value: 'tecnico', label: 'Técnico' },
            { value: 'vendedor', label: 'Vendedor' },
            { value: 'reparto', label: 'Reparto' },
          ],
        },
        {
          label: 'Fecha',
          key: 'date',
          type: 'date',
          isPrimary: true,
          placeholder: 'Selecciona fecha',
        },
        {
          label: 'Región',
          key: 'region',
          type: 'select',
          placeholder: 'Selecciona región',
          options: regionesOptions,
        },
        {
          label: 'Comuna',
          key: 'commune',
          type: 'select',
          placeholder: 'Selecciona comuna',
          options: comunasOptions,
        },
      ],
      activos: [
        {
          label: 'Estado',
          key: 'status',
          type: 'select',
          placeholder: 'Selecciona estado',
          isPrimary: true,
          options: [
            { value: 'activo', label: 'Activo' },
            { value: 'inactivo', label: 'Inactivo' },
            { value: 'mantenimiento', label: 'Mantenimiento' },
          ],
        },
        {
          label: 'Sector',
          key: 'sector',
          type: 'select',
          placeholder: 'Selecciona sector',
          options: [
            { value: 'retail', label: 'Retail' },
            { value: 'industrial', label: 'Industrial' },
            { value: 'restaurantes', label: 'Restaurantes' },
          ],
        },
        {
          label: 'Región',
          key: 'region',
          type: 'select',
          placeholder: 'Selecciona región',
          options: regionesOptions,
        },
        {
          label: 'Comuna',
          key: 'commune',
          type: 'select',
          placeholder: 'Selecciona comuna',
          options: comunasOptions,
        },
      ],
    };
  }

  private filtersSubject = new BehaviorSubject<{ [key: string]: string }>({});
  public filters$ = this.filtersSubject.asObservable();

  private activeViewSubject = new BehaviorSubject<string>('dashboard');
  public activeView$ = this.activeViewSubject.asObservable();

  private resultsSubject = new BehaviorSubject<FilterResults>({ filtered: 100, total: 100 });
  public results$ = this.resultsSubject.asObservable();

  setActiveView(viewName: string): void {
    this.addToHistory(viewName);
    this.activeViewSubject.next(viewName);
    this.filtersSubject.next({});
    this.resultsSubject.next({ filtered: 100, total: 100 });
  }

  getFiltersForView(viewName: string): FilterOption[] {
    return this.filterConfigMap[viewName] || [];
  }

  updateFilters(filters: { [key: string]: string }): void {
    this.filtersSubject.next(filters);
    // Simular cálculo de resultados basado en filtros
    const filterCount = Object.values(filters).filter(
      (v) => v !== '' && v !== null && v !== undefined,
    ).length;
    const baseTotal = 100;
    const filtered = Math.max(10, baseTotal - filterCount * 15);
    this.resultsSubject.next({ filtered, total: baseTotal });
  }

  getActiveView(): string {
    return this.activeViewSubject.value;
  }

  getFilters(): { [key: string]: string } {
    return this.filtersSubject.value;
  }

  getResults(): FilterResults {
    return this.resultsSubject.value;
  }
}
