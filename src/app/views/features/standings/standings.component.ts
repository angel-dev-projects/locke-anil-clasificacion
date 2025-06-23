import { Component, inject } from '@angular/core';
import { PlayerService } from '../../data-access/player.service';
import { TableComponent } from "../../ui/table/table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './standings.component.html',
})
export default class StandingsComponent {
  playerService = inject(PlayerService);
}
