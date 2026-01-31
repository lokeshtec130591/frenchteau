import { Component, signal, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <nav [class.scrolled]="isScrolled()" class="navbar">
      <div class="nav-container">
        <div class="logo">
          <img src="assets/images/logo.png" alt="Frenchteau Tech Solutions" class="logo-img">
        </div>
        <ul class="nav-links">
          <li><a href="#home" (click)="smoothScroll($event, 'home')">{{ 'NAV.HOME' | translate }}</a></li>
          <li><a href="#about" (click)="smoothScroll($event, 'about')">{{ 'NAV.ABOUT' | translate }}</a></li>
          <li><a href="#services" (click)="smoothScroll($event, 'services')">{{ 'NAV.SERVICES' | translate }}</a></li>
          <li><a href="#contact" (click)="smoothScroll($event, 'contact')">{{ 'NAV.CONTACT' | translate }}</a></li>
        </ul>
        <div class="nav-buttons">
          <button class="theme-toggle" (click)="toggleTheme()" aria-label="Toggle theme">
            <span class="theme-icon">{{ currentTheme() === 'dark' ? '☀️' : '🌙' }}</span>
          </button>
          <button class="lang-btn" (click)="toggleLanguage()">{{ languageService.currentLanguage() === 'en' ? 'FR' : 'EN' }}</button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .logo-img {
      height: 50px;
      width: auto;
      object-fit: contain;
    }

    .navbar {
      transition: all 0.3s ease;
    }

    .navbar.scrolled {
      padding: 10px 0;
    }

    [data-theme="dark"] .navbar.scrolled {
      background: rgba(20, 20, 20, 0.95);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
  `]
})
export class NavigationComponent implements OnInit, OnDestroy {
  isScrolled = signal(false);
  currentTheme = signal<'light' | 'dark'>('light');
  private destroy$ = new Subject<void>();

  constructor(
    public languageService: LanguageService,
    public translateService: TranslateService,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.initializeTheme();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeTheme(): void {
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme.set(theme);
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset;
    this.isScrolled.set(scrollPosition > 100);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
    this.translateService.use(this.languageService.getCurrentLanguage());
  }

  smoothScroll(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
