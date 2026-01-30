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
    <nav id="navbar" [class.scrolled]="isScrolled()">
      <div class="nav-container">
        <div class="logo">Frenchteau Tech Solutions</div>
        <ul class="nav-links">
          <li><a href="#home">{{ 'NAV.HOME' | translate }}</a></li>
          <li><a href="#about">{{ 'NAV.ABOUT' | translate }}</a></li>
          <li><a href="#services">{{ 'NAV.SERVICES' | translate }}</a></li>
          <li><a href="#contact">{{ 'NAV.CONTACT' | translate }}</a></li>
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
  styles: []
})
export class NavigationComponent implements OnInit, OnDestroy {
  isScrolled = signal(false);
  currentTheme = signal<'light' | 'dark'>('light');
  private destroy$ = new Subject<void>();

  constructor(
    public languageService: LanguageService,
    public translateService: TranslateService,
    public themeService: ThemeService
  ) {}

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
    this.isScrolled.set(window.pageYOffset > 100);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
    this.translateService.use(this.languageService.getCurrentLanguage());
  }
}
