import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { AboutFeature } from '../../models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="about scroll-reveal" id="about" appScrollReveal>
      <div class="about-container">
        <div class="about-content">
          <h2>{{ 'ABOUT.TITLE' | translate }} <span class="gradient-text">SFT</span></h2>
          <p><strong>{{ 'ABOUT.COMPANY' | translate }}</strong> {{ 'ABOUT.DESCRIPTION1' | translate }}</p>
          <p>{{ 'ABOUT.DESCRIPTION2' | translate }}</p>

          <div class="about-features">
            <div class="feature-item" *ngFor="let feature of aboutFeatures">
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="feature-text">
                <h4>{{ feature.titleKey | translate }}</h4>
                <p>{{ feature.descKey | translate }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about-image">
          <div class="about-image-content">🚀</div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent {
  aboutFeatures: AboutFeature[] = [
    {
      icon: '✓',
      titleKey: 'ABOUT.CERTIFIED',
      descKey: 'ABOUT.CERTIFIEDDESC'
    },
    {
      icon: '✓',
      titleKey: 'ABOUT.EXPERTISE',
      descKey: 'ABOUT.EXPERTISEDESC'
    },
    {
      icon: '✓',
      titleKey: 'ABOUT.TRACK',
      descKey: 'ABOUT.TRACKDESC'
    }
  ];
}
