import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<'light' | 'dark'>('light');
  public currentTheme$ = this.currentTheme.asObservable();

  constructor() {
    const savedTheme = (localStorage.getItem('preferredTheme') || 'light') as 'light' | 'dark';
    this.setTheme(savedTheme);
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme.next(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('preferredTheme', theme);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.currentTheme.value;
  }
}
