import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeSwitcher],
  templateUrl: './configuracion.html',
  styleUrls: ['./configuracion.css'],
})
export class Configuracion {
  nombre = 'Administrador Principal';
  email = 'admin@friocheck.com';

  guardar() {
    // lógica de guardado
  }
}
