import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatchService } from '../../data-access/match.service';
import { MatchWeekSelectorComponent } from '../../ui/matchweek-selector/matchweek-selector-component';
import { MatchListComponent } from '../../ui/match-list/match-list.component';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, MatchWeekSelectorComponent, MatchListComponent],
  templateUrl: './matches.component.html',
})
export default class MatchesComponent {
  matchService = inject(MatchService);

  selectedWeek = signal<number>(1);

  filteredMatches = this.matchService.filteredMatches(this.selectedWeek);

  onMatchWeekChange(week: number) {
    this.selectedWeek.set(week);
  }
}
