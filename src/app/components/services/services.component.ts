import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ServiceCard } from '../../models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="services scroll-reveal" id="services" appScrollReveal>
      <h2 class="section-title">{{ 'SERVICES.TITLE' | translate }}</h2>
      <p class="section-subtitle">{{ 'SERVICES.SUBTITLE' | translate }}</p>

      <div class="services-grid">
        <div class="service-card" *ngFor="let service of services">
          <div class="service-emoji">{{ service.emoji }}</div>
          <h3>{{ service.titleKey | translate }}</h3>
          <p>{{ service.descKey | translate }}</p>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ServicesComponent {
  services: ServiceCard[] = [
    {
      emoji: '⚙️',
      titleKey: 'SERVICES.SYSTEMMANAGEMENT',
      descKey: 'SERVICES.SYSTEMMANAGEMENTDESC'
    },
    {
      emoji: '📊',
      titleKey: 'SERVICES.DATASOLUTIONS',
      descKey: 'SERVICES.DATASOLUTIONSDESC'
    },
    {
      emoji: '💳',
      titleKey: 'SERVICES.PAYMENTSYSTEMS',
      descKey: 'SERVICES.PAYMENTSYSTEMSDESC'
    },
    {
      emoji: '🔧',
      titleKey: 'SERVICES.TECHNICALSUPPORT',
      descKey: 'SERVICES.TECHNICALSUPPORTDESC'
    },
    {
      emoji: '🛡️',
      titleKey: 'SERVICES.ITCONSULTING',
      descKey: 'SERVICES.ITCONSULTINGDESC'
    },
    {
      emoji: '📝',
      titleKey: 'SERVICES.CONTRACTSERVICES',
      descKey: 'SERVICES.CONTRACTSERVICESDESC'
    }
  ];
}
