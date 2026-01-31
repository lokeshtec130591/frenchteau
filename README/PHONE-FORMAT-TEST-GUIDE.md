# Phone Format Directive - Test Guide

## Quick Test Scenarios

### ✅ Valid Input (Should Accept)
```
User types:  4165551234
Displays:    (416) 555-1234
Status:      ✓ Valid (10 digits)
```

### ❌ Invalid Input (Should Reject or Show Error)

**Too Few Digits:**
```
User types:  41655512
Displays:    (416) 555-12
Status:      ✗ Invalid (only 8 digits)
Error:       "Phone must be 10 digits"
```

**Too Many Digits:**
```
User types:  41655512340123
Displays:    (416) 555-1234
Status:      ✓ Valid (extra digits automatically removed)
```

**Letters/Special Characters:**
```
User types:  416-ABC-5512D4
Displays:    (416) 555-1234
Status:      ✓ Valid (letters automatically removed)
```

**Empty Field:**
```
User types:  (empty)
Status:      ✗ Invalid if required
Error:       "Phone is required"
```

## Real-World Test Cases

### Test 1: Basic Typing
```
Type: 4
Result: (4 - Not yet valid

Type: 41
Result: (41 - Not yet valid

Type: 416
Result: (416) - Not yet valid

Type: 4165
Result: (416) 5 - Not yet valid

Type: 41655
Result: (416) 55 - Not yet valid

Type: 416555
Result: (416) 555- - Not yet valid

Type: 4165551
Result: (416) 555-1 - Not yet valid

Type: 41655512
Result: (416) 555-12 - Not yet valid

Type: 416555123
Result: (416) 555-123 - Not yet valid

Type: 4165551234
Result: (416) 555-1234 - ✓ VALID
```

### Test 2: Pasting Value
```
Paste: 4165551234
Result: (416) 555-1234 - ✓ VALID

Paste: 416-555-1234
Result: (416) 555-1234 - ✓ VALID

Paste: (416) 555-1234
Result: (416) 555-1234 - ✓ VALID
```

### Test 3: Backspace Behavior
```
Start:  (416) 555-1234
Delete last digit (4): (416) 555-123 - ✗ Invalid
Delete another (3): (416) 555-12 - ✗ Invalid
Continue deleting all digits - Shows empty field
```

### Test 4: Copy/Paste
```
Copy: (416) 555-1234
Paste: (416) 555-1234 - ✓ VALID
```

### Test 5: Form Submission
```
All fields valid:     Button ENABLED
Phone empty:          Button DISABLED
Phone 9 digits:       Button DISABLED
Phone 10 digits:      Button ENABLED
```

## Manual Testing Steps

1. **Start local dev:**
   ```bash
   npm start
   ```

2. **Navigate to contact form:**
   - Go to http://localhost:4200
   - Scroll to contact section

3. **Test phone input field:**
   - Click on phone input
   - Type: `4165551234`
   - Should show: `(416) 555-1234`
   - Form submit button should be enabled

4. **Test validation error:**
   - Clear field
   - Type: `41655` (only 5 digits)
   - Click submit button
   - Should show error: "Phone must be 10 digits"

5. **Test auto-formatting:**
   - Clear field
   - Type: `4 1 6 5 5 5 1 2 3 4` (with spaces)
   - Should display: `(416) 555-1234`
   - Should still be valid (spaces ignored)

6. **Test max limit:**
   - Try typing more than 10 digits
   - Should only allow 10
   - Extra digits are ignored

## Expected Error Messages

| Scenario | Error Message |
|----------|---------------|
| Empty required field | *depends on form* |
| Less than 10 digits | Phone must be 10 digits (e.g., (416) 555-1234) |
| Invalid characters | *automatically removed* |

## Browser DevTools Testing

Open DevTools (F12) and check:

```javascript
// In Console, to test the validator
const directive = new PhoneFormatDirective(null);
const control = { value: '(416) 555-1234' };
console.log(directive.validate(control)); // Should return null (valid)

const control2 = { value: '(416) 555-123' };
console.log(directive.validate(control2)); // Should return error object (invalid)
```

## Mobile Testing

Test on mobile browsers:
- ✅ iOS Safari
- ✅ Chrome Mobile
- ✅ Android Browser

All should:
- Auto-format as user types
- Reject non-numeric input
- Show placeholder text
- Display errors on form submission

## No Errors Expected

The directive:
- ✅ Prevents user from entering invalid data
- ✅ Formats automatically
- ✅ Validates on form submission
- ✅ Shows specific error messages
- ✅ Never throws runtime errors
- ✅ Handles edge cases (copy/paste, backspace, etc.)

---

**Ready to Test!** 🚀

Run `npm start` and try the contact form phone input.
