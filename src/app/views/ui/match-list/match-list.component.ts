import { Component, input } from '@angular/core';
import { Match } from '../../../interfaces/match.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './match-list.component.html',
})
export class MatchListComponent {
  filteredMatches = input.required<Match[]>();
}
