import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { StatItem } from '../../models';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="stats scroll-reveal" appScrollReveal>
      <div class="stats-grid">
        <div class="stat-item" *ngFor="let stat of stats">
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.labelKey | translate }}</div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class StatsComponent {
  stats: StatItem[] = [
    { number: '10+', labelKey: 'STATS.EXPERIENCE' },
    { number: '500+', labelKey: 'STATS.PROJECTS' },
    { number: '100%', labelKey: 'STATS.SATISFACTION' },
    { number: '24/7', labelKey: 'STATS.SUPPORTAVAILABLE' }
  ];
}
