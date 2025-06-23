import { Component, input } from '@angular/core';
import { Player } from '../../../interfaces/player.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
})
export class TableComponent {
  players = input.required<Player[]>();
}
