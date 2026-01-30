# Frenchteau Tech Solutions - AI Coding Instructions

## Project Overview
This is a standalone Angular 19 website for Frenchteau Tech Solutions, a professional IT services company based in Québec. The application is a single-page website (not a multi-page app) with:
- 12 modular section components displayed vertically on a single page
- Dual-language support (English/French) with ngx-translate
- Light/dark theme toggling with localStorage persistence
- Scroll-based reveal animations using Intersection Observer

**Key files**: [src/app/app.component.ts](src/app/app.component.ts) (component composition), [src/app/app.config.ts](src/app/app.config.ts) (DI setup), [angular.json](angular.json) (build config)

## Architecture Patterns

### Standalone Components & Modular Sections
- **All components are standalone** (no NgModule structure). Each imports only what it needs.
- **App structure**: [AppComponent](src/app/app.component.ts) is the root with 12 child components arranged in template order (matches page scroll order: navigation → hero → stats → about → services → benefits → process → testimonials → cta → contact → footer, plus background overlay).
- **Component locations**: Each major section lives in `src/app/components/{section-name}/` with a `.component.ts` file (no separate `.html` or separate `.scss` files—styles are inline or global).
- When adding a new section: create folder in `components/`, add component with inline template/styles, import it in [AppComponent](src/app/app.component.ts), and add translation keys to both i18n JSON files.

### Global Services (Observables & Signals)
- **LanguageService** ([src/app/services/language.service.ts](src/app/services/language.service.ts)): Uses Angular Signals (`signal<'en' | 'fr'>`) for reactive state. Persists to localStorage. Provide to root; inject everywhere language switching is needed.
- **ThemeService** ([src/app/services/theme.service.ts](src/app/services/theme.service.ts)): Uses RxJS BehaviorSubject for observables (legacy pattern, don't change). Sets `data-theme` attribute on document root; components subscribe via `.currentTheme$`. Persists to localStorage.
- **Pattern difference**: Language uses signals (modern), theme uses observables (legacy). Maintain both approaches as-is.

### Internationalization (i18n)
- Uses `@ngx-translate/core` with HTTP loader pointing to `src/assets/i18n/{en,fr}.json`.
- Translation keys follow UPPERCASE dot-notation: `NAV.HOME`, `HERO.TITLE1`, `STATS.EXPERIENCE`, etc.
- **Critical**: Every translatable string must have matching keys in both `en.json` and `fr.json`. Missing keys will break the UI.
- **Usage in components**: `{{ 'KEY.PATH' | translate }}` in templates. For dynamic keys, use `{{ dynamicKey | translate }}`.
- When adding features: always add i18n keys to BOTH language files before testing.

### Scroll-Based Animations
- **ScrollRevealDirective** ([src/app/directives/scroll-reveal.directive.ts](src/app/directives/scroll-reveal.directive.ts)): Uses Intersection Observer (threshold: 0.1, rootMargin: -100px bottom). Add `appScrollReveal` to elements that should animate on scroll.
- CSS class `.visible` is added when element enters viewport. Pair with CSS animations in `src/styles.scss` (not yet visible—likely using `.visible { animation: ... }`).

### Styling
- **Global styles**: [src/styles.scss](src/styles.scss) (currently shown as empty in editor—check actual file for theme variables, animations, component baseline styles).
- **Theme system**: Components read theme via ThemeService; CSS uses `data-theme` attribute selector (`[data-theme="dark"]`) for conditional styling.
- **Framework**: No CSS framework detected (no Bootstrap, Tailwind). Styles are custom SCSS.

## Critical Developer Workflows

### Build & Serve
```bash
npm start           # ng serve - local dev at http://localhost:4200
npm build           # ng build - production bundle to dist/frenchteau
npm watch           # ng build --watch --config development
```

### Testing
```bash
npm test            # ng test (configured in angular.json, but implementation details may vary)
```

### Production Build
- Output: `dist/frenchteau/` with budget constraints (500KB initial, 1MB error threshold per component style 4KB error).
- Output hashing enabled for cache-busting.

## Code Conventions

### Component Structure
```typescript
import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { [Service] } from '../../services/...';

@Component({
  selector: 'app-[feature]',
  standalone: true,
  imports: [CommonModule, TranslateModule, ...],
  template: `...`, // Inline template
  styles: []       // Inline styles or empty if using global
})
export class [Feature]Component implements OnInit {
  // Prefer signals for local state, observables for services
  isActive = signal(false);
  
  constructor(private service: Service) {}
  ngOnInit() { ... }
  ngOnDestroy() { ... } // Always unsubscribe with destroy$ subject if using RxJS
}
```

### Reactive Patterns
- **Modern (new code)**: Use Angular Signals + `takeUntil()` with destroy subject for unsubscribes (see [NavigationComponent](src/app/components/navigation/navigation.component.ts)).
- **Legacy (existing)**: ThemeService uses BehaviorSubject—do not refactor unless requested.
- Always cleanup: implement `OnDestroy` and complete `destroy$` subject when using RxJS.

### CSS Class Naming
- BEM-style or feature-based: `.hero-banner`, `.hero-content`, `.nav-container`.
- State classes: `.scrolled`, `.visible` (for scroll reveal).
- Utility classes: `.btn`, `.btn-primary`, `.btn-outline`, `.gradient-text`.

### File Organization
```
src/
  app/
    components/          # 12 section components, each in a folder
    services/            # LanguageService, ThemeService (root-provided)
    directives/          # ScrollRevealDirective
    models/              # index.ts exports interfaces
    app.component.ts     # Root component (no folder)
    app.config.ts        # DI providers
  assets/
    i18n/               # en.json, fr.json
  styles.scss           # Global styles
  main.ts               # Bootstrap
  index.html            # Entry point
```

## Integration Points & External Dependencies

- **@angular/core ^19.0.0**: Standalone API, signals, animations, HTTP client.
- **@ngx-translate/core ^15.0.0**: i18n with HTTP loader.
- **RxJS ^7.8.0**: Observables, BehaviorSubject, Subject, takeUntil.
- **No external UI framework**: All styling is custom.
- **No backend API calls visible**: i18n loads from static JSON. Forms (contact) may POST data—check component implementations.

## Common Tasks & Tips

1. **Add a new translatable string**: Add key to `en.json` AND `fr.json` in same structure. Test both languages.
2. **Add scroll animation**: Apply `appScrollReveal` directive to element, ensure CSS `.visible { animation: ... }` exists in global styles.
3. **Theme-aware styling**: Use `[data-theme="dark"] .class { ... }` in SCSS.
4. **Update navigation links**: Edit link hrefs in [NavigationComponent](src/app/components/navigation/navigation.component.ts) `template` property.
5. **Debug language/theme**: Check localStorage keys: `preferredLanguage` and `preferredTheme`.

## TypeScript Configuration

- **Target**: ES2022, module: ES2022 (Angular 19 default).
- **Strict mode**: Likely enabled—types required.
- **Standalone apps**: No NgModule analysis. Import Components directly in standalone component imports arrays.

---

**Last Updated**: January 2026 | **Angular Version**: 19.0.0
