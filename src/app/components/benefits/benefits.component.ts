import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { BenefitCard } from '../../models';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="why-choose scroll-reveal" appScrollReveal>
      <h2 class="section-title">{{ 'BENEFITS.TITLE' | translate }}</h2>
      <p class="section-subtitle">{{ 'BENEFITS.SUBTITLE' | translate }}</p>

      <div class="benefits-grid">
        <div class="benefit-card" *ngFor="let benefit of benefits">
          <div class="benefit-icon">{{ benefit.icon }}</div>
          <div class="benefit-content">
            <h3>{{ benefit.titleKey | translate }}</h3>
            <p>{{ benefit.descKey | translate }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class BenefitsComponent {
  benefits: BenefitCard[] = [
    { icon: '🎯', titleKey: 'BENEFITS.TAILORED', descKey: 'BENEFITS.TAILOREDDESC' },
    { icon: '⚡', titleKey: 'BENEFITS.RAPID', descKey: 'BENEFITS.RAPIDDESC' },
    { icon: '🔐', titleKey: 'BENEFITS.SECURITY', descKey: 'BENEFITS.SECURITYDESC' },
    { icon: '💰', titleKey: 'BENEFITS.COST', descKey: 'BENEFITS.COSTDESC' },
    { icon: '📈', titleKey: 'BENEFITS.SCALABLE', descKey: 'BENEFITS.SCALABLEDESC' },
    { icon: '🤝', titleKey: 'BENEFITS.PARTNERSHIP', descKey: 'BENEFITS.PARTNERSHIPDESC' }
  ];
}
