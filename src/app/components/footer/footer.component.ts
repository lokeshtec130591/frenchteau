import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FooterLink, FooterSection } from '../../models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <footer>
      <div class="footer-content">
        <div class="footer-about">
          <h3>{{ 'FOOTER.COMPANY' | translate }}</h3>
          <p>{{ 'FOOTER.ABOUTTEXT' | translate }}</p>
          <p>{{ 'FOOTER.ABOUTTEXT1' | translate }}</p>
        </div>

        <div class="footer-section" *ngFor="let section of footerSections">
          <h4>{{ section.titleKey | translate }}</h4>
          <ul class="footer-links">
            <li *ngFor="let link of section.links">
              <a [href]="link.url" (click)="handleLinkClick($event, link.url)">{{ link.isTranslated ? (link.label | translate) : link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>{{ 'FOOTER.COPYRIGHT' | translate }}</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer-about p {
      margin-bottom: 0.75rem;
    }

    .footer-about p:last-of-type {
      margin-bottom: 0;
    }
  `]
})
export class FooterComponent {
  footerSections: FooterSection[] = [
    {
      titleKey: 'FOOTER.QUICKLINKS',
      links: [
        { label: 'FOOTER.HOME', url: '#home', isTranslated: true },
        { label: 'FOOTER.ABOUT', url: '#about', isTranslated: true },
        { label: 'FOOTER.SERVICES', url: '#services', isTranslated: true },
        { label: 'FOOTER.CONTACT', url: '#contact', isTranslated: true }
      ]
    },
    {
      titleKey: 'FOOTER.SERVICESTITLE',
      links: [
        { label: 'SERVICES.SYSTEMMANAGEMENT', url: '#services', isTranslated: true },
        { label: 'SERVICES.DATASOLUTIONS', url: '#services', isTranslated: true },
        { label: 'SERVICES.PAYMENTSYSTEMS', url: '#services', isTranslated: true },
        { label: 'SERVICES.ITCONSULTING', url: '#services', isTranslated: true }
      ]
    },
    {
      titleKey: 'FOOTER.CONTACTTITLE',
      links: [
        { label: '510 rue Main', url: '#', isTranslated: false },
        { label: 'Hudson, QC J0P 1H0', url: '#', isTranslated: false },
        { label: 'frenchteautechsolution@gmail.com', url: '#', isTranslated: false },
        { label: 'FOOTER.BUSINESSHOURS', url: '#', isTranslated: true }
      ]
    }
  ];

  handleLinkClick(event: Event, url: string): void {
    if (url.startsWith('#')) {
      event.preventDefault();
      const sectionId = url.substring(1);
      this.smoothScroll(sectionId);
    }
  }

  private smoothScroll(sectionId: string): void {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
