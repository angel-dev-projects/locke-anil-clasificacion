import { CommonModule } from '@angular/common';
import { Component, input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-matchweek',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matchweek-selector-component.html',
})
export class MatchWeekSelectorComponent {
  matchweeks = input.required<number[]>();
  selected: number = 1;

  @Output() matchweekSelected = new EventEmitter<number>();

  // Method to select a match week and emit the selected value
  selectMatchWeek(option: number) {
    this.selected = option;
    this.matchweekSelected.emit(option);
  }
}
