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
          <h3>SFT</h3>
          <p>{{ 'FOOTER.ABOUTTEXT' | translate }}</p>
        </div>

        <div class="footer-section" *ngFor="let section of footerSections">
          <h4>{{ section.titleKey | translate }}</h4>
          <ul class="footer-links">
            <li *ngFor="let link of section.links">
              <a [href]="link.url">{{ link.isTranslated ? (link.label | translate) : link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>{{ 'FOOTER.COPYRIGHT' | translate }}</p>
      </div>
    </footer>
  `,
  styles: []
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
        { label: 'info&#64;frenchteautech.com', url: '#', isTranslated: false },
        { label: 'FOOTER.BUSINESSHOURS', url: '#', isTranslated: true }
      ]
    }
  ];
}
