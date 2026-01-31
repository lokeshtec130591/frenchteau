import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { PhoneFormatDirective } from '../../directives/phone-format.directive';
import { ContactInfo } from '../../models';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Custom validator for whitespace-only input
function noWhitespaceOnlyValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Empty is handled by required validator
  }

  const isWhitespaceOnly = control.value.trim().length === 0;
  return isWhitespaceOnly ? { whitespaceOnly: { value: control.value } } : null;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, ScrollRevealDirective, PhoneFormatDirective],
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
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>{{ 'CONTACT.NAMELABEL' | translate }} <span class="required">*</span></label>
              <input type="text" formControlName="name">
              <span class="error-message" *ngIf="isFieldInvalid('name')">
                <span *ngIf="contactForm.get('name')?.errors?.['required']">
                  {{ 'CONTACT.NAMEERROR' | translate }}
                </span>
                <span *ngIf="contactForm.get('name')?.errors?.['whitespaceOnly']">
                  {{ 'CONTACT.NAMEWHITESPACEERROR' | translate }}
                </span>
              </span>
            </div>
            <div class="form-group">
              <label>{{ 'CONTACT.EMAILLABEL' | translate }} <span class="required">*</span></label>
              <input type="email" formControlName="email">
              <span class="error-message" *ngIf="isFieldInvalid('email')">
                <span *ngIf="contactForm.get('email')?.errors?.['required']">
                  {{ 'CONTACT.EMAILERROR' | translate }}
                </span>
                <span *ngIf="contactForm.get('email')?.errors?.['email']">
                  {{ 'CONTACT.EMAILERROR' | translate }}
                </span>
                <span *ngIf="contactForm.get('email')?.errors?.['whitespaceOnly']">
                  {{ 'CONTACT.EMAILWHITESPACEERROR' | translate }}
                </span>
              </span>
            </div>
            <div class="form-group">
              <label>{{ 'CONTACT.PHONELABEL' | translate }} <span class="required">*</span></label>
              <input type="tel" 
                     formControlName="phone" 
                     appPhoneFormat 
                     placeholder="(XXX) XXX-XXXX"
                     >
              <span class="error-message" *ngIf="isFieldInvalid('phone')">
                <span *ngIf="contactForm.get('phone')?.errors?.['required']">
                  {{ 'CONTACT.PHONEERROR' | translate }}
                </span>
                <span *ngIf="contactForm.get('phone')?.errors?.['invalidPhone']">
                  {{ 'CONTACT.PHONEINVALIDERROR' | translate }}
                </span>
              </span>
            </div>
            <div class="form-group">
              <label>{{ 'CONTACT.MESSAGELABEL' | translate }} <span class="required">*</span></label>
              <textarea formControlName="message" ></textarea>
              <span class="error-message" *ngIf="isFieldInvalid('message')">
                <span *ngIf="contactForm.get('message')?.errors?.['required']">
                  {{ 'CONTACT.MESSAGEERROR' | translate }}
                </span>
                <span *ngIf="contactForm.get('message')?.errors?.['whitespaceOnly']">
                  {{ 'CONTACT.MESSAGEWHITESPACEERROR' | translate }}
                </span>
              </span>
            </div>
            <div class="form-message success" *ngIf="successMessage">
              {{ successMessage | translate }}
            </div>
            <div class="form-message error" *ngIf="errorMessage">
              {{ errorMessage | translate }}
            </div>
            <button type="submit" class="submit-btn" [disabled]="this.isSubmitting">
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
export class ContactComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  private destroy$ = new Subject<void>();

  contactInfo: ContactInfo[] = [
    {
      icon: '📍',
      labelKey: 'CONTACT.LOCATION',
      content: '510 rue Main<br>Hudson, Québec J0P 1H0<br>Canada'
    },
    {
      icon: '📧',
      labelKey: 'CONTACT.EMAIL',
      content: 'frenchteautechsolution@gmail.com<br>contact@frenchteautech.ca'
    },
    {
      icon: '🕒',
      labelKey: 'CONTACT.HOURS',
      contentKey: 'CONTACT.HOURSTEXT'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, noWhitespaceOnlyValidator]],
      email: ['', [Validators.required, Validators.email, noWhitespaceOnlyValidator]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required, noWhitespaceOnlyValidator]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  ngOnInit(): void {
    emailjs.init(environment.emailjs.publicKey);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {

    if (!this.contactForm.valid || this.isSubmitting) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const now = new Date();
    const formValue = this.contactForm.value;
    const templateParams = {
      to_email: environment.contact.toEmail,
      from_name: formValue.name,
      from_email: formValue.email,
      phone: formValue.phone,
      message: formValue.message,
      submitted_date: now.toLocaleDateString(),
      submitted_time: now.toLocaleTimeString(),
      domain_name: environment.contact.fromDomain,
      mail_subject: environment.contact.mailSubject
    };

    console.log('Sending email with params:', templateParams);

    emailjs.send(environment.emailjs.serviceId, environment.emailjs.templateId, templateParams)
      .then(() => {
        console.log('Email sent successfully');
        this.translateService.get('CONTACT.SUCCESS').pipe(takeUntil(this.destroy$)).subscribe(translated => {
          this.successMessage = translated;
        });
        this.resetForm();
        this.isSubmitting = false;
        setTimeout(() => { this.successMessage = ''; }, 3000);
      })
      .catch((error) => {
        console.error('Email send error:', error);
        this.translateService.get('CONTACT.ERROR').pipe(takeUntil(this.destroy$)).subscribe(translated => {
          this.errorMessage = translated;
        });
        this.isSubmitting = false;
      });
  }

  private resetForm(): void {
    this.contactForm.reset();
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsUntouched();
      this.contactForm.get(key)?.markAsPristine();
    });
  }
}
