import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';
import { SeoService } from './services/seo.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeroComponent } from './components/hero/hero.component';
import { StatsComponent } from './components/stats/stats.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ProcessComponent } from './components/process/process.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CtaComponent } from './components/cta/cta.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackgroundComponent } from './components/background/background.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationComponent,
    HeroComponent,
    StatsComponent,
    AboutComponent,
    ServicesComponent,
    BenefitsComponent,
    ProcessComponent,
    TestimonialsComponent,
    CtaComponent,
    ContactComponent,
    FooterComponent,
    BackgroundComponent,
    ScrollToTopComponent
  ],
  template: `
    <app-background></app-background>
    <app-navigation></app-navigation>
    <app-hero></app-hero>
    <app-stats></app-stats>
    <app-about></app-about>
    <app-services></app-services>
    <app-benefits></app-benefits>
    <app-process></app-process>
    <app-testimonials></app-testimonials>
    <app-cta></app-cta>
    <app-contact></app-contact>
    <app-footer></app-footer>
    <app-scroll-to-top></app-scroll-to-top>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'frenchteau-tech-solutions';

  constructor(
    public languageService: LanguageService,
    public themeService: ThemeService,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    // Initialize theme and language from storage
    const savedTheme = (localStorage.getItem('preferredTheme') || 'light') as 'light' | 'dark';
    this.themeService.setTheme(savedTheme);

    const savedLang = (localStorage.getItem('preferredLanguage') || 'en') as 'en' | 'fr';
    this.languageService.setLanguage(savedLang);

    // Initialize SEO
    this.seoService.setDefaultMetadata();
    this.seoService.addStructuredData(this.seoService.getOrganizationSchema());
    this.seoService.addStructuredData(this.seoService.getLocalBusinessSchema());
  }
}
