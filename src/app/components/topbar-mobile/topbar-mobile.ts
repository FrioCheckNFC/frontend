import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterService, type FilterOption, type ViewRoute } from '../../core/services/filter.service';
import { ChileLocationsService } from '../../core/services/chile-locations.service';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'success' | 'info';
  read: boolean;
}

@Component({
  selector: 'app-topbar-mobile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './topbar-mobile.html',
  styleUrls: ['./topbar-mobile.css'],
})
export class TopbarMobile implements OnInit {
  @Output() closeMenu = new EventEmitter<void>();

  allFilters: FilterOption[] = [];
  filterValues: { [key: string]: string } = {};
  ciudadesOptions: Array<{ value: string; label: string }> = [];
  comunasOptions: Array<{ value: string; label: string }> = [];
  showFilters = false;
  showNotifications = false;
  recentViews: ViewRoute[] = [];

  notifications: Notification[] = [
    {
      id: 1,
      title: 'Alerta de temperatura',
      message: 'El.local "Supermercado Central" supera los 8°C',
      time: 'Hace 5 minutos',
      type: 'alert',
      read: false,
    },
    {
      id: 2,
      title: 'Ticket resuelto',
      message: 'El ticket #1234 ha sido resuelto',
      time: 'Hace 1 hora',
      type: 'success',
      read: false,
    },
    {
      id: 3,
      title: 'Nueva visita programada',
      message: 'Se programó visita para mañana a las 10:00',
      time: 'Hace 2 horas',
      type: 'info',
      read: true,
    },
  ];

  constructor(
    private filterService: FilterService,
    private chileLocations: ChileLocationsService
  ) {}

  ngOnInit(): void {
    this.filterService.activeView$.subscribe((view) => {
      this.allFilters = this.filterService.getFiltersForView(view);
      this.filterValues = {};
      this.ciudadesOptions = this.chileLocations.getCiudadesSelect();
      this.comunasOptions = this.chileLocations.getComunasSelect();
    });

    this.filterService.history$.subscribe((history) => {
      this.recentViews = this.filterService.getRecentViews();
    });

    this.recentViews = this.filterService.getRecentViews();
  }

  onClose(): void {
    this.closeMenu.emit();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAllRead(): void {
    this.notifications.forEach((n) => (n.read = true));
  }

  getActiveFiltersCount(): number {
    return Object.values(this.filterValues).filter(
      (v) => v !== '' && v !== null && v !== undefined
    ).length;
  }

  clearFilters(): void {
    this.filterValues = {};
    this.filterService.updateFilters({});
  }

  onRegionChange() {
    const regionId = this.filterValues['region'];
    if (regionId) {
      this.ciudadesOptions = this.chileLocations.getCiudadesSelect(regionId);
      this.comunasOptions = this.chileLocations.getComunasSelect(regionId);
      if (this.filterValues['city']) this.filterValues['city'] = '';
    } else {
      this.ciudadesOptions = this.chileLocations.getCiudadesSelect();
      this.comunasOptions = this.chileLocations.getComunasSelect();
    }
    this.applyFilters();
  }

  getFilterOptions(filter: FilterOption): Array<{ value: string; label: string }> {
    if (filter.key === 'city') {
      return this.ciudadesOptions;
    }
    if (filter.key === 'commune') {
      return this.comunasOptions;
    }
    return filter.options || [];
  }

  applyFilters() {
    const activeFilters = Object.entries(this.filterValues)
      .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as { [key: string]: string },
      );
    this.filterService.updateFilters(activeFilters);
  }
}
