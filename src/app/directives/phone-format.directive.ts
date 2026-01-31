import { Directive, HostListener, ElementRef } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPhoneFormat]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: PhoneFormatDirective, multi: true }]
})
export class PhoneFormatDirective implements Validator {
  constructor(private elementRef: ElementRef) {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Empty is valid (required is separate validator)
    }

    // Extract only digits
    const digits = control.value.replace(/\D/g, '');

    // Must be exactly 10 digits
    if (digits.length !== 10) {
      return { invalidPhone: { value: control.value, requiredLength: 10, actualLength: digits.length } };
    }

    return null;
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove all non-digits

    if (value.length > 10) {
      value = value.slice(0, 10); // Limit to 10 digits
    }

    let formattedValue = '';
    if (value.length > 0) {
      if (value.length <= 3) {
        formattedValue = `(${value}`;
      } else if (value.length <= 6) {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
      }
    }

    input.value = formattedValue;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');

    // If already 10 digits and trying to add more, prevent it
    if (digits.length >= 10 && ![8, 9, 27, 13, 46].includes(event.keyCode) &&
        !(event.keyCode >= 35 && event.keyCode <= 40) &&
        !((event.keyCode === 65 || event.keyCode === 67 || event.keyCode === 86 || event.keyCode === 88) && 
          (event.ctrlKey === true || event.metaKey === true))) {
      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        return; // Not a number, allow non-numeric keys to be handled normally
      }
      event.preventDefault();
      return;
    }

    // Allow: backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Cmd+A, Cmd+C, Cmd+V, Cmd+X
        (event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
        (event.keyCode === 67 && (event.ctrlKey === true || event.metaKey === true)) ||
        (event.keyCode === 86 && (event.ctrlKey === true || event.metaKey === true)) ||
        (event.keyCode === 88 && (event.ctrlKey === true || event.metaKey === true)) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 40)) {
      return;
    }

    // If it's not a number, prevent the input
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }
}

