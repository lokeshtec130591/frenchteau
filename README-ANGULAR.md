# Frenchteau Tech Solutions - Angular Application

A modern, fully responsive Angular application for Frenchteau Tech Solutions, a professional IT services company in Québec. Built with the latest Angular 19, featuring bilingual support (English/French), dark/light theme toggle, and stunning animations.

## Features

✨ **Modern Design**
- Clean, professional UI with gradient accents
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Dark/Light theme toggle

🌍 **Bilingual Support**
- Full English/French language switching
- Persistent language preference (localStorage)
- Seamless language toggle in navigation

🎨 **Theme Support**
- Light and dark themes
- CSS custom properties for easy customization
- Persistent theme preference

📱 **Responsive Components**
- Hero section with animated SVG
- Services showcase
- Benefits and features
- Client testimonials
- Contact form
- Footer with multiple sections

⚡ **Performance**
- Angular 19 with standalone components
- No external UI library dependencies
- Optimized animations
- Lazy loading ready

## Tech Stack

- **Angular**: 19.0.0
- **TypeScript**: 5.6.0
- **RxJS**: 7.8.0
- **SCSS**: CSS3 with custom properties
- **Node.js**: 18+ recommended

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navigation/
│   │   ├── hero/
│   │   ├── stats/
│   │   ├── about/
│   │   ├── services/
│   │   ├── benefits/
│   │   ├── process/
│   │   ├── testimonials/
│   │   ├── cta/
│   │   ├── contact/
│   │   ├── footer/
│   │   └── background/
│   ├── services/
│   │   ├── language.service.ts
│   │   └── theme.service.ts
│   └── app.component.ts
├── assets/
├── index.html
├── main.ts
└── styles.scss
```

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone or download the project**
   ```bash
   cd frenchteau
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:4200/`

## Development

### Running the development server
```bash
npm start
```

### Building for production
```bash
npm run build
```
Output will be in `dist/frenchteau/`

### Building with watch mode
```bash
npm run watch
```

## Services

### LanguageService
Manages application language state (English/French)
- `setLanguage(lang: 'en' | 'fr')` - Set the current language
- `toggleLanguage()` - Toggle between EN and FR
- `getCurrentLanguage()` - Get current language
- `currentLanguage$` - Observable for language changes

### ThemeService
Manages application theme state (Light/Dark)
- `setTheme(theme: 'light' | 'dark')` - Set the current theme
- `toggleTheme()` - Toggle between light and dark
- `getCurrentTheme()` - Get current theme
- `currentTheme$` - Observable for theme changes

## Components

### Navigation Component
Fixed navigation bar with:
- Logo and site navigation
- Language toggle button
- Theme toggle button
- Scroll effect

### Hero Component
Landing section featuring:
- Animated SVG illustration
- Bilingual text with animations
- Feature banner with icons
- Call-to-action buttons

### Services Component
Displays 6 service offerings with:
- Service icons and descriptions
- Responsive grid layout
- Hover animations

### Testimonials Component
Client feedback section with:
- 3 testimonial cards
- Star ratings
- Author information with avatars
- Rotation effect on hover

### Contact Component
Contact form with:
- Bilingual labels
- Form validation
- Contact information
- Business hours

### Footer Component
Multi-section footer with:
- Company information
- Quick links
- Services list
- Contact details

## Customization

### Colors
Edit CSS variables in `src/styles.scss`:
```scss
:root {
    --primary: #6366f1;      // Main color
    --secondary: #a855f7;    // Secondary color
    --accent: #ec4899;       // Accent color
}
```

### Content
All bilingual content is managed in component files using LanguageService. Edit strings directly in component templates.

### Animations
Customize animations in `src/styles.scss` by modifying `@keyframes` definitions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

### Bundle Size
- Initial bundle: ~150-200KB (gzipped)
- Tree-shaking enabled for unused code removal

### Lighthouse Scores
Target:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 100

## Deployment

### Building for production
```bash
npm run build
```

### Deploying to production server
```bash
# The dist/frenchteau/ folder contains the production build
# Deploy the contents to your web server
```

## Dark Mode Persistence

The application automatically:
1. Saves the user's theme preference to localStorage
2. Loads the saved preference on app startup
3. Applies the correct CSS variables based on the `data-theme` attribute

## Language Persistence

The application automatically:
1. Saves the user's language preference to localStorage
2. Loads the saved preference on app startup
3. Updates all content based on the current language

## Contact Form

The contact form:
- Collects: Name, Email, Phone (optional), Message
- Shows success alert after submission
- Clears form after successful submission
- Shows different messages based on selected language

## Scroll Reveal Animation

Elements with `.scroll-reveal` class automatically:
- Start hidden and below their final position
- Animate into view when they enter the viewport
- Uses IntersectionObserver API for performance

## Future Enhancements

- [ ] Add backend API integration
- [ ] Implement actual form submission
- [ ] Add service carousel
- [ ] Add portfolio/case studies section
- [ ] Multi-language support beyond EN/FR
- [ ] Blog integration
- [ ] SEO optimization
- [ ] Analytics integration

## License

© 2026 Solutions Frenchteau Tech. All rights reserved.

## Support

For questions or issues, contact:
- Email: info@frenchteautech.com
- Phone: Available during business hours
- Location: 510 rue Main, Hudson, Québec J0P 1H0, Canada

---

**Built with Angular 19** | **Modern Web Technologies** | **Professional Design**
