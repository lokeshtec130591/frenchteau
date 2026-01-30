import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ContactInfo, FormData } from '../../models';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

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
                <p [innerHTML]="info.contentKey ? (info.contentKey | translate) : info.content"></p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
            <div class="form-group">
              <label>{{ 'CONTACT.NAMELABEL' | translate }} <span class="required">*</span></label>
              <input type="text" [(ngModel)]="formData.name" name="name" required>
              <span class="error-message" *ngIf="contactForm.submitted && contactForm.controls['name']?.invalid">
                {{ 'CONTACT.NAMEERROR' | translate }}
              </span>
            </div>
            <div class="form-group">
              <label>{{ 'CONTACT.EMAILLABEL' | translate }} <span class="required">*</span></label>
              <input type="email" [(ngModel)]="formData.email" name="email" required email>
              <span class="error-message" *ngIf="contactForm.submitted && contactForm.controls['email']?.invalid">
                {{ 'CONTACT.EMAILERROR' | translate }}
              </span>
            </div>
            <div class="form-group">
              <label>{{ 'CONTACT.PHONELABEL' | translate }} <span class="required">*</span></label>
              <input type="tel" [(ngModel)]="formData.phone" name="phone" required>
              <span class="error-message" *ngIf="contactForm.submitted && contactForm.controls['phone']?.invalid">
                {{ 'CONTACT.PHONEERROR' | translate }}
              </span>
            </div>
            <div class="form-group">
              <label>{{ 'CONTACT.MESSAGELABEL' | translate }} <span class="required">*</span></label>
              <textarea [(ngModel)]="formData.message" name="message" required></textarea>
              <span class="error-message" *ngIf="contactForm.submitted && contactForm.controls['message']?.invalid">
                {{ 'CONTACT.MESSAGEERROR' | translate }}
              </span>
            </div>
            <div class="form-message success" *ngIf="successMessage">
              {{ successMessage | translate }}
            </div>
            <div class="form-message error" *ngIf="errorMessage">
              {{ errorMessage | translate }}
            </div>
            <button type="submit" class="submit-btn" [disabled]="isSubmitting">
              {{ isSubmitting ? ('CONTACT.SENDING' | translate) : ('CONTACT.SUBMITBUTTON' | translate) }}
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
    styles: [`
      .required {
        color: red;
      }
      .error-message {
        color: red;
        font-size: 0.875rem;
        display: block;
        margin-top: 0.25rem;
      }
    `]
})
export class ContactComponent implements OnInit {
    @ViewChild('contactForm') form!: NgForm;

    formData: FormData = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };

    isSubmitting = false;
    successMessage = '';
    errorMessage = '';

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
            contentKey: 'CONTACT.HOURSTEXT'
        }
    ];

    constructor(private translateService: TranslateService) {}

    ngOnInit(): void {
        emailjs.init(environment.emailjs.publicKey);
    }

    onSubmit(form: NgForm): void {
        if (!form.valid || this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;
        this.successMessage = '';
        this.errorMessage = '';

        const now = new Date();
        const templateParams = {
            to_email: environment.contact.toEmail,
            from_name: this.formData.name,
            from_email: this.formData.email,
            phone: this.formData.phone,
            message: this.formData.message,
            submitted_date: now.toLocaleDateString(),
            submitted_time: now.toLocaleTimeString(),
            domain_name: environment.contact.fromDomain
        };

        console.log('Sending email with params:', templateParams);

        emailjs.send(environment.emailjs.serviceId, environment.emailjs.templateId, templateParams)
            .then(() => {
                console.log('Email sent successfully');
                this.translateService.get('CONTACT.SUCCESS').subscribe(translated => {
                    this.successMessage = translated;
                });
                this.resetForm();
                this.isSubmitting = false;
                form.resetForm();
            })
            .catch((error) => {
                console.error('Email send error:', error);
                this.translateService.get('CONTACT.ERROR').subscribe(translated => {
                    this.errorMessage = translated;
                });
                this.isSubmitting = false;
            });
    }

    private resetForm(): void {
        this.formData = { name: '', email: '', phone: '', message: '' };
        setTimeout(() => { this.successMessage = ''; }, 3000);
    }
}
