import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService, type FilterOption } from '../../core/services/filter.service';
import { ChileLocationsService } from '../../core/services/chile-locations.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css'],
})
export class Topbar implements OnInit {
  allFilters: FilterOption[] = [];
  filterValues: { [key: string]: string } = {};
  ciudadesOptions: Array<{ value: string; label: string }> = [];
  comunasOptions: Array<{ value: string; label: string }> = [];
  showFiltersDropdown = false;
  private currentView = 'dashboard';

  constructor(
    private router: Router,
    private filterService: FilterService,
    private chileLocations: ChileLocationsService
  ) {}

  ngOnInit(): void {
    this.filterService.activeView$.subscribe((view) => {
      this.currentView = view;
      this.allFilters = this.filterService.getFiltersForView(view);
      this.filterValues = {};
      this.ciudadesOptions = this.chileLocations.getCiudadesSelect();
      this.comunasOptions = this.chileLocations.getComunasSelect();
    });
  }

  toggleFiltersDropdown(): void {
    this.showFiltersDropdown = !this.showFiltersDropdown;
  }

  closeFiltersDropdown(): void {
    this.showFiltersDropdown = false;
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
      // Limpiar ciudad si cambió la región
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

  logout() {
    this.router.navigate(['/login']);
  }
}
