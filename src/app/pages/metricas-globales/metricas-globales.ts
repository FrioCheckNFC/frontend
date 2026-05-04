import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService } from '@core/config/filter.service';
import { MetricasGlobalesService, type GlobalMetric, type TenantActividad } from '@features/metricas-globales/services/metricas-globales.service';

@Component({
  selector: 'app-metricas-globales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metricas-globales.html',
  styleUrls: ['./metricas-globales.css']
})
export class MetricasGlobales implements OnInit {
  metricas: GlobalMetric[] = [];
  tenantActividad: TenantActividad[] = [];
  isLoading = true;
  loadError: string | null = null;

  constructor(
    private filterService: FilterService,
    private metricasService: MetricasGlobalesService,
  ) {}

  ngOnInit(): void {
    this.filterService.setActiveView('metricas-globales');
    this.loadMetrics();
  }

  private loadMetrics(): void {
    this.isLoading = true;
    this.loadError = null;

    this.metricasService.getGlobalMetrics().subscribe({
      next: (data) => {
        this.metricas = data.metricas;
        this.tenantActividad = data.tenantActividad;
        this.isLoading = false;
      },
      error: (err) => {
        this.loadError = 'No fue posible cargar las métricas globales. Intenta nuevamente.';
        this.isLoading = false;
      },
    });
  }

  getCargaClass(carga: number): string {
    if (carga >= 80) return 'carga-alta';
    if (carga >= 50) return 'carga-media';
    return 'carga-baja';
  }

  reload(): void {
    this.loadMetrics();
  }
}




