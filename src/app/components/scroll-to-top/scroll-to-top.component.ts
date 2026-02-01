import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-scroll-to-top',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button
      *ngIf="isVisible()"
      (click)="scrollToTop()"
      class="scroll-to-top"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  `,
    styles: [`
    .scroll-to-top {
      position: relative;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: none;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      opacity: 0.9;
    }

    .scroll-to-top:hover {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
      opacity: 1;
    }

    .scroll-to-top:active {
      transform: translateY(0);
    }

    .scroll-to-top svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    /* Dark theme */
    [data-theme="dark"] .scroll-to-top {
      background: #444;
      color: #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }

    [data-theme="dark"] .scroll-to-top:hover {
      background: #555;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
    }

    @media (max-width: 768px) {
      .scroll-to-top svg {
        width: 1rem;
        height: 1rem;
      }
    }
  `]
})
export class ScrollToTopComponent implements OnInit {
    isVisible = signal(false);

    constructor(public themeService: ThemeService) { }

    ngOnInit(): void {
        // Initial check
        this.checkScroll();
    }

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        this.checkScroll();
    }

    private checkScroll(): void {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        this.isVisible.set(scrollTop > 300);
    }

    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}
