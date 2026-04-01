import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';
import { FilterService } from '../../core/services/filter.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeSwitcher],
  templateUrl: './configuracion.html',
  styleUrls: ['./configuracion.css'],
})
export class Configuracion implements OnInit {
  nombre = 'Administrador Principal';
  email = 'admin@friocheck.com';

  constructor(
    private filterService: FilterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const viewName = this.route.snapshot.url[0]?.path === 'perfil' ? 'perfil' : 'configuracion';
    this.filterService.setActiveView(viewName);
  }

  guardar() {
    // lógica de guardado
  }
}
