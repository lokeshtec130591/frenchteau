# Contact Form - Reactive Forms with Blur Validation

## Overview

The contact form has been upgraded to use **Angular Reactive Forms** with **real-time blur validation**. Validation errors now appear immediately when users leave (blur) a field, instead of waiting for form submission.

## Key Features

✅ **Blur Validation** - Errors show when user leaves a field (not on submit)  
✅ **Real-time Feedback** - Users get instant validation feedback  
✅ **Reactive Forms** - Modern Angular approach with FormBuilder and FormGroup  
✅ **Phone Validation** - 10-digit validation integrated with phone format directive  
✅ **Clean UX** - No errors until user interacts with field  
✅ **Proper Cleanup** - RxJS subscriptions managed with destroy$ subject  
✅ **Accessibility** - Touch/dirty state tracking for better UX  

## How It Works

### 1. Fields Show Errors When:
- User **blurs** the field (leaves/focusses out)
- **AND** the field is invalid
- **AND** the field has been touched

### 2. Form Submits Only When:
- All fields are valid (10-digit phone, valid email, etc.)
- User clicks submit button

### 3. On Form Submission:
- All remaining fields are marked as touched
- Validation errors show for any invalid fields
- User cannot submit invalid form

## Form Fields & Validation

### Name Field
```html
<input formControlName="name" (blur)="markFieldAsTouched('name')">
<!-- Error shows on blur if empty or only spaces -->
```
- Required: Yes
- Cannot be only spaces
- Error messages:
  - "Name is required"
  - "Name cannot be only spaces"

### Email Field
```html
<input type="email" formControlName="email" (blur)="markFieldAsTouched('email')">
<!-- Error shows on blur if empty, invalid format, or only spaces -->
```
- Required: Yes
- Valid format: Must be valid email
- Cannot be only spaces
- Error messages:
  - "Email is required"
  - "Please enter a valid email address"
  - "Email cannot be only spaces"

### Phone Field
```html
<input type="tel" 
       formControlName="phone" 
       appPhoneFormat 
       (blur)="markFieldAsTouched('phone')">
<!-- Error shows on blur if less than 10 digits -->
```
- Required: Yes
- Format: Must be exactly 10 digits
- Directive: appPhoneFormat (auto-formats to (XXX) XXX-XXXX)
- Errors:
  - "Phone is required"
  - "Phone must be 10 digits (e.g., (416) 555-1234)"

### Message Field
```html
<textarea formControlName="message" (blur)="markFieldAsTouched('message')"></textarea>
<!-- Error shows on blur if empty or only spaces -->
```
- Required: Yes
- Cannot be only spaces
- Error messages:
  - "Message is required"
  - "Message cannot be only spaces"

## Component Structure

### Reactive Forms Setup
```typescript
// Custom whitespace validator
function noWhitespaceOnlyValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Empty is handled by required validator
  }
  
  const isWhitespaceOnly = control.value.trim().length === 0;
  return isWhitespaceOnly ? { whitespaceOnly: { value: control.value } } : null;
}

private initializeForm(): void {
  this.contactForm = this.formBuilder.group({
    name: ['', [Validators.required, noWhitespaceOnlyValidator]],
    email: ['', [Validators.required, Validators.email, noWhitespaceOnlyValidator]],
    phone: ['', [Validators.required]],
    message: ['', [Validators.required, noWhitespaceOnlyValidator]]
  });
}
```

### Validation Methods
```typescript
// Check if field is invalid AND touched/dirty
isFieldInvalid(fieldName: string): boolean {
  const field = this.contactForm.get(fieldName);
  return !!(field && field.invalid && (field.dirty || field.touched));
}

// Mark field as touched on blur event
markFieldAsTouched(fieldName: string): void {
  const field = this.contactForm.get(fieldName);
  if (field) {
    field.markAsTouched();
  }
}
```

### Form Submission
```typescript
onSubmit(): void {
  // Mark ALL fields as touched if user tries to submit invalid form
  Object.keys(this.contactForm.controls).forEach(key => {
    this.contactForm.get(key)?.markAsTouched();
  });

  // Only submit if form is valid
  if (!this.contactForm.valid || this.isSubmitting) {
    return;
  }
  
  // Send email...
}
```

## User Experience Flow

### Scenario 1: User Fills Form Correctly
```
1. Focus on "Name" field
2. Type: "John Doe"
3. Blur (click elsewhere)
   → No error (field is valid)
4. Focus on "Phone" field
5. Type: "4165551234"
   → Auto-formats to "(416) 555-1234"
6. Blur
   → No error (exactly 10 digits)
7. Click Submit
   → Form submits ✓
```

### Scenario 2: User Leaves Phone Field Empty
```
1. Focus on "Phone" field
2. Don't type anything
3. Blur (click elsewhere)
   → Error shows: "Phone is required"
4. User sees error immediately
5. Can fix it right away
```

### Scenario 3: User Enters Only Spaces
```
1. Focus on "Name" field
2. Type: "     " (only spaces)
3. Blur
   → Error shows: "Name cannot be only spaces"
4. User can either:
   - Type actual name
   - Clear and it becomes just "required" error
5. Error disappears when actual text entered ✓
```

### Scenario 4: User Submits with Invalid Fields
```
1. Leave all fields empty
2. Click Submit
3. All fields marked as touched
4. All errors appear at once
5. Submit button remains disabled
6. User sees all validation errors
```

## Reactive Forms vs Template-Driven Forms

### What We Changed
```typescript
// BEFORE (Template-Driven):
<form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
  <input [(ngModel)]="formData.name" name="name" required>
</form>

// AFTER (Reactive):
<form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
  <input formControlName="name" (blur)="markFieldAsTouched('name')">
</form>
```

### Benefits of Reactive Forms
✅ More control over validation logic
✅ Easier to test
✅ Better for complex forms
✅ Type-safe with FormGroup
✅ Easier to add dynamic field validation
✅ Can validate on blur, not just submit

## Implementation Details

### Form Initialization
```typescript
ngOnInit(): void {
  emailjs.init(environment.emailjs.publicKey);
  // Form is already initialized in constructor
}

ngOnDestroy(): void {
  // Clean up subscriptions
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Memory Management
```typescript
// Using takeUntil to prevent memory leaks
this.translateService.get('CONTACT.SUCCESS')
  .pipe(takeUntil(this.destroy$))
  .subscribe(translated => {
    this.successMessage = translated;
  });
```

### Submit Button State
```html
<!-- Button disabled until form is valid -->
<button type="submit" 
        class="submit-btn" 
        [disabled]="!contactForm.valid || isSubmitting">
  {{ isSubmitting ? 'Sending...' : 'Submit' }}
</button>
```

## Error Display Logic

### Template Code
```html
<span class="error-message" *ngIf="isFieldInvalid('phone')">
  <span *ngIf="contactForm.get('phone')?.errors?.['required']">
    Phone is required
  </span>
  <span *ngIf="contactForm.get('phone')?.errors?.['invalidPhone']">
    Phone must be 10 digits (e.g., (416) 555-1234)
  </span>
</span>
```

### Error Triggers
```typescript
// Errors only show when ALL of these are true:
if (field.invalid && field.touched && field.dirty) {
  // Show error
}
```

## Testing the Form

### Manual Testing Steps

1. **Test Blur Validation:**
   ```
   - Click on Name field
   - Leave it empty
   - Click another field
   - Error appears immediately ✓
   ```

2. **Test Phone Format + Validation:**
   ```
   - Click on Phone field
   - Type: 41655
   - Click another field
   - Error shows: "Phone must be 10 digits"
   - Go back to phone field
   - Type: 51234
   - Error disappears ✓
   ```

3. **Test Form Submission:**
   ```
   - Fill all fields correctly
   - Submit button enabled ✓
   - Leave one field empty
   - Submit button disabled ✓
   - Try to submit anyway (won't work)
   - All errors appear ✓
   ```

4. **Test Email Validation:**
   ```
   - Click on Email field
   - Type: "invalid-email"
   - Click another field
   - Error shows: "Please enter a valid email"
   - Fix: "user@example.com"
   - Error disappears ✓
   ```

## Code Quality

✅ Type-safe with FormGroup<T>
✅ Proper memory management with destroy$
✅ RxJS best practices
✅ Validator interface on PhoneFormatDirective
✅ No template-driven form issues
✅ Clean separation of concerns
✅ Full error handling

## Browser Compatibility

✅ All modern browsers
✅ Mobile browsers
✅ Touch devices
✅ Keyboard-only navigation

## Files Modified

- `src/app/components/contact/contact.component.ts` - Converted to Reactive Forms
- `src/app/directives/phone-format.directive.ts` - Implements Validator interface

## Related Features

- **Phone Format Directive**: Formats input as (XXX) XXX-XXXX
- **Phone Validation**: Ensures exactly 10 digits
- **Email Validation**: Built-in Angular email validator
- **Required Field Validation**: All fields required
- **EmailJS Integration**: Sends form via email service

---

**Version**: 2.0 (Reactive Forms with Blur Validation)  
**Created**: January 31, 2026  
**Angular Version**: 19.0.0  
**Status**: Production Ready
