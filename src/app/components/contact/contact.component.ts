import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ContactInfo, FormData } from '../../models';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, TranslateModule, FormsModule, ScrollRevealDirective],
    template: `
    <section class="contact scroll-reveal" id="contact" appScrollReveal>
      <div class="contact-container">
        <div class="contact-left">
          <h2>{{ 'CONTACT.TITLE' | translate }}</h2>
          <p>{{ 'CONTACT.DESCRIPTION' | translate }}</p>

          <div class="contact-info-list">
            <div class="contact-info-item" *ngFor="let info of contactInfo">
              <div class="contact-info-icon">{{ info.icon }}</div>
              <div class="contact-info-text">
                <h4>{{ info.labelKey | translate }}</h4>
                <p [innerHTML]="info.content"></p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>{{ 'CONTACT.NAMELABEL' | translate }}</label>
              <input type="text" [(ngModel)]="formData.name" name="name" required>
            </div>
            <div class="form-group">
              <label>{{ 'CONTACT.EMAILLABEL' | translate }}</label>
              <input type="email" [(ngModel)]="formData.email" name="email" required>
            </div>
            <div class="form-group">
              <label>{{ 'CONTACT.PHONELABEL' | translate }}</label>
              <input type="tel" [(ngModel)]="formData.phone" name="phone">
            </div>
            <div class="form-group">
              <label>{{ 'CONTACT.MESSAGELABEL' | translate }}</label>
              <textarea [(ngModel)]="formData.message" name="message" required></textarea>
            </div>
            <button type="submit" class="submit-btn">
              {{ 'CONTACT.SUBMITBUTTON' | translate }}
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
    styles: []
})
export class ContactComponent {
    formData: FormData = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };

    contactInfo: ContactInfo[] = [
        {
            icon: '📍',
            labelKey: 'CONTACT.LOCATION',
            content: '510 rue Main<br>Hudson, Québec J0P 1H0<br>Canada'
        },
        {
            icon: '📧',
            labelKey: 'CONTACT.EMAIL',
            content: 'info&#64;frenchteautech.com<br>support&#64;frenchteautech.com'
        },
        {
            icon: '🕒',
            labelKey: 'CONTACT.HOURS',
            content: '{{ \'CONTACT.HOURSTEXT\' | translate }}'
        }
    ];

    onSubmit(): void {
        console.log('Form submitted:', this.formData);
        this.resetForm();
    }

    private resetForm(): void {
        this.formData = { name: '', email: '', phone: '', message: '' };
    }
}
