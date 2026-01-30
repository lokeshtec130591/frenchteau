import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { FeatureBannerItem } from '../../models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="hero-banner" id="home" appScrollReveal>
      <div class="hero-content">
        <div class="hero-text">
          <div class="lang-section active">
            <h1>
              <span class="word">{{ 'HERO.TITLE1' | translate }}</span>
              <span class="word gradient-text">{{ 'HERO.TITLE2' | translate }}</span>
              <span class="word gradient-text">{{ 'HERO.TITLE3' | translate }}</span><br>
              <span class="word">{{ 'HERO.TITLE4' | translate }}</span>
            </h1>
            <p>{{ 'HERO.DESCRIPTION' | translate }}</p>
            <div class="hero-buttons">
              <a href="#services" class="btn btn-primary">{{ 'HERO.BUTTONSERVICES' | translate }}</a>
              <a href="#contact" class="btn btn-outline">{{ 'HERO.BUTTONSTART' | translate }}</a>
            </div>
          </div>

          <div class="feature-banner">
            <div class="feature-banner-grid">
              <div class="feature-banner-item" *ngFor="let feature of featureItems">
                <div class="feature-banner-icon">{{ feature.icon }}</div>
                <div class="feature-banner-text">{{ feature.labelKey | translate }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-svg-container">
            <div class="particles">
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
            </div>

            <svg width="100%" height="100%" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.3">
                <circle cx="300" cy="300" r="250" fill="none" stroke="url(#grad1)" stroke-width="2">
                  <animate attributeName="r" values="250;260;250" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="300" cy="300" r="200" fill="none" stroke="url(#grad2)" stroke-width="2">
                  <animate attributeName="r" values="200;210;200" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="300" cy="300" r="150" fill="none" stroke="url(#grad3)" stroke-width="2">
                  <animate attributeName="r" values="150;160;150" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>

              <g class="main-device">
                <rect x="220" y="220" width="160" height="160" rx="20" fill="url(#deviceGrad)" stroke="#6366f1" stroke-width="4">
                  <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite" />
                </rect>
                <rect x="240" y="240" width="120" height="80" rx="5" fill="#0f172a" />
                <g class="code-lines">
                  <rect x="250" y="250" width="60" height="6" rx="3" fill="#6366f1">
                    <animate attributeName="width" values="60;90;60" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <rect x="250" y="265" width="80" height="6" rx="3" fill="#a855f7">
                    <animate attributeName="width" values="80;100;80" dur="2.5s" repeatCount="indefinite" />
                  </rect>
                  <rect x="250" y="280" width="70" height="6" rx="3" fill="#ec4899">
                    <animate attributeName="width" values="70;95;70" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <rect x="250" y="295" width="90" height="6" rx="3" fill="#6366f1">
                    <animate attributeName="width" values="90;110;90" dur="2.2s" repeatCount="indefinite" />
                  </rect>
                </g>
                <circle cx="250" cy="345" r="5" fill="#10b981">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="270" cy="345" r="5" fill="#10b981">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="290" cy="345" r="5" fill="#10b981">
                  <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
                </circle>
              </g>

              <defs>
                <linearGradient id="grad1">
                  <stop offset="0%" stop-color="#6366f1" />
                  <stop offset="100%" stop-color="#a855f7" />
                </linearGradient>
                <linearGradient id="grad2">
                  <stop offset="0%" stop-color="#a855f7" />
                  <stop offset="100%" stop-color="#ec4899" />
                </linearGradient>
                <linearGradient id="grad3">
                  <stop offset="0%" stop-color="#ec4899" />
                  <stop offset="100%" stop-color="#6366f1" />
                </linearGradient>
                <linearGradient id="deviceGrad">
                  <stop offset="0%" stop-color="#ffffff" />
                  <stop offset="100%" stop-color="#f0f4ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent implements OnInit {
  featureItems: FeatureBannerItem[] = [
    { icon: '⚡', labelKey: 'FEATURES.SUPPORT' },
    { icon: '🔒', labelKey: 'FEATURES.SECURE' },
    { icon: '24/7', labelKey: 'FEATURES.AVAILABLE' },
    { icon: '✓', labelKey: 'FEATURES.RELIABLE' }
  ];

  circularIcons = ['🏢', '🔒', '⚙️', '⚡', '💰', '📊', '🎯', '🤝'];

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    this.translateService.use(savedLang);
  }
}
