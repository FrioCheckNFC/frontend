import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '@env/environment';
import { TenantsService, BackendTenant } from '@features/tenants/services/tenants.service';
import { UsersService, BackendUser } from '@features/users/services/users.service';
import { TicketsService, BackendTicket } from '@features/tickets/services/tickets.service';

export interface GlobalMetric {
  label: string;
  valor: string;
  icono: string;
  color: string;
}

export interface TenantActividad {
  id: string;
  nombre: string;
  tickets: number;
  usuarios: number;
  uptime: string;
  carga: number;
}

export interface GlobalMetricsData {
  metricas: GlobalMetric[];
  tenantActividad: TenantActividad[];
}

@Injectable({
  providedIn: 'root',
})
export class MetricasGlobalesService {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tenantsService: TenantsService,
    private usersService: UsersService,
    private ticketsService: TicketsService,
  ) {}

  getGlobalMetrics(): Observable<GlobalMetricsData> {
    return forkJoin({
      tenants: this.tenantsService.getTenants(),
      users: this.usersService.getUsers(),
      tickets: this.ticketsService.getTickets().pipe(
        map(tickets => tickets.filter((t: BackendTicket) => t.status !== 'RESOLVED' && t.status !== 'CLOSED' && t.status !== 'resolved' && t.status !== 'closed'))
      ),
    }).pipe(
      map(({ tenants, users, tickets }) => {
        const totalTenants = tenants.length;
        const activeTenants = tenants.filter((t: BackendTenant) => t.active !== false).length;
        const totalUsers = users.length;
        const openTickets = tickets.length;
        const avgUptime = this.calculateAvgUptime(activeTenants);

        const metricas: GlobalMetric[] = [
          { label: 'Total Tenants', valor: String(totalTenants), icono: '🏢', color: 'blue' },
          { label: 'Usuarios Globales', valor: String(totalUsers), icono: '👥', color: 'purple' },
          { label: 'Tickets Abiertos', valor: String(openTickets), icono: '🎫', color: 'red' },
          { label: 'Uptime Promedio', valor: avgUptime, icono: '📡', color: 'green' },
        ];

        const tenantActividad: TenantActividad[] = tenants.map((tenant: BackendTenant) => {
          const tenantUsers = users.filter((u: BackendUser) => u.tenantId === tenant.id).length;
          const tenantTickets = tickets.filter((t: BackendTicket) => {
            const tenantId = (t as any).tenantId;
            return tenantId === tenant.id;
          }).length;
          const carga = this.calculateLoad(tenantUsers, tenantTickets);

          return {
            id: tenant.id,
            nombre: tenant.name ?? tenant.nombre ?? 'Sin nombre',
            tickets: tenantTickets,
            usuarios: tenantUsers,
            uptime: this.calculateTenantUptime(tenant.active),
            carga,
          };
        });

        return { metricas, tenantActividad };
      })
    );
  }

  private calculateAvgUptime(activeTenants: number): string {
    if (activeTenants === 0) return '0%';
    const baseUptime = 99.0;
    const variance = Math.random() * 0.8;
    return (baseUptime + variance).toFixed(1) + '%';
  }

  private calculateTenantUptime(active?: boolean): string {
    if (active === false) return '—';
    const uptime = 95 + Math.random() * 4.5;
    return uptime.toFixed(1) + '%';
  }

  private calculateLoad(usuarios: number, tickets: number): number {
    const baseLoad = usuarios * 2;
    const ticketLoad = tickets * 5;
    const totalLoad = baseLoad + ticketLoad;
    return Math.min(Math.round(totalLoad / 2), 100);
  }
}



