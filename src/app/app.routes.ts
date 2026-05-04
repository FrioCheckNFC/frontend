import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Activos } from './pages/machines/activos';
import { Visitas } from './pages/visits/visitas';
import { Tickets } from './pages/tickets/tickets';
import { TicketDetail } from './pages/tickets/detail/ticket-detail';
import { Pedidos } from './pages/sales/pedidos';
import { Locales } from './pages/locales/locales';
import { Reportes } from './pages/reportes/reportes';
import { Usuarios } from './pages/users/usuarios';
import { Perfil } from './pages/perfil/perfil';
import { Tenants } from './pages/tenants/tenants';
import { TenantDetail } from './pages/tenants/detail/tenant-detail';
import { MetricasGlobales } from './pages/metricas-globales/metricas-globales';
import { Unauthorized } from './pages/auth/unauthorized/unauthorized';
import { roleGuard } from '@core/guards/role.guard';
import { authGuard, dashboardRedirectGuard, publicOnlyGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [publicOnlyGuard] },
  { path: 'unauthorized', component: Unauthorized, canActivate: [authGuard] },

  { path: 'dashboard', component: Dashboard, canActivate: [dashboardRedirectGuard] },
  { path: 'dashboard/admin', component: Dashboard, canActivate: [authGuard, () => roleGuard(['admin'])] },
  { path: 'dashboard/support', component: Dashboard, canActivate: [authGuard, () => roleGuard(['support'])] },
  { path: 'dashboard/superadmin', component: Dashboard, canActivate: [authGuard, () => roleGuard(['super-admin'])] },

  { path: 'activos', component: Activos, canActivate: [authGuard] },
  { path: 'visitas', component: Visitas, canActivate: [authGuard] },
  { path: 'tickets', component: Tickets, canActivate: [authGuard] },
  { path: 'tickets/:id', component: TicketDetail, canActivate: [authGuard] },
  { path: 'pedidos', component: Pedidos, canActivate: [authGuard] },
  { path: 'locales', component: Locales, canActivate: [authGuard] },
  { path: 'reportes', component: Reportes, canActivate: [authGuard] },
  { path: 'usuarios', component: Usuarios, canActivate: [authGuard] },
  { path: 'perfil', component: Perfil, canActivate: [authGuard] },

  { path: 'tenants', component: Tenants, canActivate: [authGuard, () => roleGuard(['super-admin'])] },
  { path: 'tenants/:id', component: TenantDetail, canActivate: [authGuard, () => roleGuard(['super-admin'])] },
  { path: 'metricas-globales', component: MetricasGlobales, canActivate: [authGuard, () => roleGuard(['super-admin'])] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];



