import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatchService } from '../../data-access/match.service';
import { MatchWeekSelectorComponent } from '../../ui/matchweek-selector/matchweek-selector-component';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, MatchWeekSelectorComponent],
  templateUrl: './matches.component.html',
})
export default class MatchesComponent {
  matchService = inject(MatchService);

  selectedWeek = signal<number>(1);

  onMatchWeekChange(week: number) {
    this.selectedWeek.set(week);
  }
}
