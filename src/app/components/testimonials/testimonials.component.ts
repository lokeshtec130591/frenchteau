import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { Testimonial } from '../../models';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="testimonials scroll-reveal" appScrollReveal>
      <h2 class="section-title">{{ 'TESTIMONIALS.TITLE' | translate }}</h2>
      <p class="section-subtitle">{{ 'TESTIMONIALS.SUBTITLE' | translate }}</p>

      <div class="testimonials-grid">
        <div class="testimonial-card" *ngFor="let testimonial of testimonials">
          <div class="testimonial-stars">{{ getStarRating(testimonial.rating) }}</div>
          <p class="testimonial-text">{{ testimonial.clientKey | translate }}</p>
          <div class="testimonial-author">
            <div class="author-avatar">{{ testimonial.avatar }}</div>
            <div class="author-info">
              <h4>{{ testimonial.name }}</h4>
              <p>{{ testimonial.roleKey | translate }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      avatar: 'JD',
      name: 'Jean Dubois',
      clientKey: 'TESTIMONIALS.CLIENT1',
      roleKey: 'TESTIMONIALS.CLIENT1ROLE',
      rating: 5
    },
    {
      avatar: 'ML',
      name: 'Marie Lavoie',
      clientKey: 'TESTIMONIALS.CLIENT2',
      roleKey: 'TESTIMONIALS.CLIENT2ROLE',
      rating: 5
    },
    {
      avatar: 'PT',
      name: 'Pierre Tremblay',
      clientKey: 'TESTIMONIALS.CLIENT3',
      roleKey: 'TESTIMONIALS.CLIENT3ROLE',
      rating: 5
    }
  ];

  getStarRating(rating: number): string {
    return '★'.repeat(rating);
  }
}
