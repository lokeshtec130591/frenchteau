import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="cta scroll-reveal" appScrollReveal>
      <h2>{{ 'CTA.TITLE' | translate }}</h2>
      <p>{{ 'CTA.DESCRIPTION' | translate }}</p>
      <a href="#contact" class="btn-white">{{ 'CTA.BUTTON' | translate }}</a>
    </section>
  `,
  styles: []
})
export class CtaComponent {}
