import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { RoleSelector } from './features/role-selector/role-selector';
import { Dashboard } from './components/dashboard/dashboard';
import { Activos } from './components/activos/activos';
import { Visitas } from './components/visitas/visitas';
import { Tickets } from './components/tickets/tickets';
import { Pedidos } from './components/pedidos/pedidos';
import { Locales } from './components/locales/locales';
import { Reportes } from './components/reportes/reportes';
import { Usuarios } from './components/usuarios/usuarios';
import { Configuracion } from './components/configuracion/configuracion';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'role-selector', component: RoleSelector },
  { path: 'dashboard', component: Dashboard },
  { path: 'activos', component: Activos },
  { path: 'visitas', component: Visitas },
  { path: 'tickets', component: Tickets },
  { path: 'pedidos', component: Pedidos },
  { path: 'locales', component: Locales },
  { path: 'reportes', component: Reportes },
  { path: 'usuarios', component: Usuarios },
  { path: 'configuracion', component: Configuracion },
  { path: 'perfil', component: Configuracion },
  { path: '', redirectTo: '/role-selector', pathMatch: 'full' },
  { path: '**', redirectTo: '/role-selector' },
];
