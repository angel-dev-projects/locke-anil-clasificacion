import { Component, inject } from '@angular/core';
import { TableComponent } from "../../ui/table/table.component";
import { CommonModule } from '@angular/common';
import { MatchService } from '../../data-access/match.service';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './standings.component.html',
})
export default class StandingsComponent {
  matchService = inject(MatchService);
}
