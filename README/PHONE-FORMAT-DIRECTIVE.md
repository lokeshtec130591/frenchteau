# Phone Format Directive with Validation

## Overview

The `PhoneFormatDirective` automatically formats phone number input as users type, converting raw digits into a formatted North American phone number format: **(XXX) XXX-XXXX**

It also validates that the phone number contains exactly **10 digits**, preventing any invalid input errors.

## Key Features

✅ **Automatic Formatting** - Formats as user types (e.g., 4165551234 → (416) 555-1234)  
✅ **10-Digit Validation** - Ensures exactly 10 digits, no more, no less  
✅ **No Invalid Input** - Prevents users from entering more than 10 digits  
✅ **Non-Numeric Filtering** - Automatically removes letters and special characters  
✅ **Smart Backspace** - Handles backspace/delete properly  
✅ **Keyboard Shortcuts** - Allows Ctrl+A, Ctrl+C, Ctrl+V, etc.  
✅ **Navigation Keys** - Home, End, Arrow keys work normally  
✅ **Mobile Friendly** - Works on all browsers and mobile devices  
✅ **Built-in Validator** - Implements Angular's Validator interface for form validation  

## Usage

### Import the Directive
```typescript
import { PhoneFormatDirective } from '../../directives/phone-format.directive';

@Component({
  imports: [PhoneFormatDirective, ...]
})
export class MyComponent { }
```

### Add to Input Field
```html
<input type="tel" 
       [(ngModel)]="phoneNumber" 
       appPhoneFormat
       placeholder="(XXX) XXX-XXXX"
       required>
```

## Validation Behavior

| Scenario | Result |
|----------|--------|
| Empty input | Valid (if not required) |
| 1-9 digits | Invalid - "Phone must be 10 digits" |
| Exactly 10 digits | Valid ✓ |
| More than 10 digits | Automatically limited to 10 |
| Letters/symbols | Automatically removed |

## Input Examples

| User Typing | Display | Valid? |
|-------------|---------|--------|
| 4 | (4 | ✗ |
| 41 | (41 | ✗ |
| 416 | (416) | ✗ |
| 4165551234 | (416) 555-1234 | ✓ |
| 416 555 1234 | (416) 555-1234 | ✓ |
| 416-555-1234 | (416) 555-1234 | ✓ |
| 4165551234567 | (416) 555-1234 | ✓ (extra digits ignored) |

## Error Handling

The directive provides specific error messages:

```html
<input type="tel" [(ngModel)]="formData.phone" name="phone" appPhoneFormat required>

<span *ngIf="form.submitted && form.controls['phone']?.invalid">
  <span *ngIf="form.controls['phone']?.errors?.['required']">
    Phone is required
  </span>
  <span *ngIf="form.controls['phone']?.errors?.['invalidPhone']">
    Phone must be 10 digits (e.g., (416) 555-1234)
  </span>
</span>
```

## Implementation in Contact Form

The directive is integrated into the contact form with full validation:

```html
<div class="form-group">
  <label>Phone <span class="required">*</span></label>
  <input type="tel" 
         [(ngModel)]="formData.phone" 
         name="phone" 
         appPhoneFormat 
         required 
         placeholder="(XXX) XXX-XXXX">
  <span class="error-message" *ngIf="form.submitted && form.controls['phone']?.invalid">
    <span *ngIf="form.controls['phone']?.errors?.['required']">
      Phone is required
    </span>
    <span *ngIf="form.controls['phone']?.errors?.['invalidPhone']">
      Phone must be 10 digits (e.g., (416) 555-1234)
    </span>
  </span>
</div>
```

## Reactive Forms Example

```typescript
import { FormBuilder, Validators } from '@angular/forms';

export class MyComponent {
  form = this.fb.group({
    phone: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}
}
```

With the directive on the input, validation automatically works:

```html
<input type="tel" 
       formControlName="phone" 
       appPhoneFormat
       placeholder="(XXX) XXX-XXXX">

<span *ngIf="form.get('phone')?.invalid && form.submitted">
  <span *ngIf="form.get('phone')?.errors?.['required']">Phone is required</span>
  <span *ngIf="form.get('phone')?.errors?.['invalidPhone']">Phone must be 10 digits</span>
</span>
```

## Data Processing

The formatted value `(416) 555-1234` is stored in the form. When submitting:

```typescript
onSubmit(form: NgForm): void {
  if (form.valid) {
    const phone = form.value.phone; // "(416) 555-1234"
    
    // Optional: Remove formatting for API
    const cleanPhone = phone.replace(/\D/g, ''); // "4165551234"
    
    // Send to backend...
  }
}
```

## Keyboard Support

The directive intelligently handles:
- **Numbers**: 0-9 on main keyboard and numpad
- **Navigation**: Arrow keys, Home, End, Page Up/Down
- **Edit Keys**: Backspace, Delete, Tab, Escape, Enter
- **Shortcuts**: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X (and Cmd variants for Mac)
- **Max 10 digits**: After 10 digits, number input is blocked

## Browser Compatibility

✅ Chrome/Edge  
✅ Firefox  
✅ Safari  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  

## Files

- **Location**: `src/app/directives/phone-format.directive.ts`
- **Used in**: Contact component (`src/app/components/contact/contact.component.ts`)
- **Type**: Standalone Angular Directive implementing Validator
- **Dependencies**: None (uses native Angular APIs)

## Customization

To change the format, edit `PhoneFormatDirective`:

```typescript
// Current format: (XXX) XXX-XXXX
// To change to: XXX-XXX-XXXX
formattedValue = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
```

To change digit limit:

```typescript
// Current: 10 digits
// To change to 11 digits:
if (value.length > 11) {
  value = value.slice(0, 11);
}
// Update validator too:
if (digits.length !== 11) {
  return { invalidPhone: { value, requiredLength: 11 } };
}
```

---

**Version**: 2.0 (with validation)  
**Created**: January 31, 2026  
**Angular Version**: 19.0.0  
**Status**: Production Ready
