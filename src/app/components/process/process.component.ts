import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ProcessStep } from '../../models';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="process scroll-reveal" appScrollReveal>
      <h2 class="section-title">{{ 'PROCESS.TITLE' | translate }}</h2>
      <p class="section-subtitle">{{ 'PROCESS.SUBTITLE' | translate }}</p>

      <div class="process-steps">
        <div class="step-card" *ngFor="let step of steps">
          <div class="step-number">{{ step.number }}</div>
          <h3>{{ step.titleKey | translate }}</h3>
          <p>{{ step.descKey | translate }}</p>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ProcessComponent {
  steps: ProcessStep[] = [
    { number: 1, titleKey: 'PROCESS.CONSULTATION', descKey: 'PROCESS.CONSULTATIONDESC' },
    { number: 2, titleKey: 'PROCESS.STRATEGY', descKey: 'PROCESS.STRATEGYDESC' },
    { number: 3, titleKey: 'PROCESS.IMPLEMENTATION', descKey: 'PROCESS.IMPLEMENTATIONDESC' },
    { number: 4, titleKey: 'PROCESS.SUPPORT', descKey: 'PROCESS.SUPPORTDESC' }
  ];
}
