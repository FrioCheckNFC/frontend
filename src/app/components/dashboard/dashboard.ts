import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../core/services/filter.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  constructor(private filterService: FilterService) {
    this.filterService.setActiveView('none');
  }
}
