import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = signal<'en' | 'fr'>('en');

  constructor(private translateService: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLang = (localStorage.getItem('preferredLanguage') || 'en') as 'en' | 'fr';
    this.currentLanguage.set(savedLang);
    this.translateService.setDefaultLang(savedLang);
    this.translateService.use(savedLang);
  }

  setLanguage(lang: 'en' | 'fr'): void {
    this.currentLanguage.set(lang);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    localStorage.setItem('preferredLanguage', lang);
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage() === 'en' ? 'fr' : 'en';
    this.setLanguage(newLang);
  }

  getCurrentLanguage(): 'en' | 'fr' {
    return this.currentLanguage();
  }
}
