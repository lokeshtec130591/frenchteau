# SEO Service - Implementation Examples

This file provides practical examples of how to implement SEO in the Frenchteau Tech Solutions components.

## Example 1: Basic Meta Tag Update (Hero Component)

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="hero">
      <h1>{{ 'HERO.TITLE' | translate }}</h1>
      <p>{{ 'HERO.SUBTITLE' | translate }}</p>
    </section>
  `
})
export class HeroComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Professional IT Solutions | Frenchteau Tech',
      description: 'Award-winning IT solutions in Québec. Cloud infrastructure, cybersecurity, and network management.',
      keywords: 'IT solutions, cloud infrastructure, cybersecurity, Québec',
      image: 'https://www.frenchteau.com/assets/images/hero-bg.jpg'
    });
  }
}
```

## Example 2: Services Component with Breadcrumb Schema

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section class="services">
      <h2>Our Services</h2>
      <!-- Services content -->
    </section>
  `
})
export class ServicesComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Update meta tags
    this.seoService.setPageMetadata({
      title: 'IT Services | Cloud, Cybersecurity & Network Management',
      description: 'Comprehensive IT services including cloud infrastructure, cybersecurity solutions, and network management.',
      keywords: 'IT services, cloud services, cybersecurity, network management'
    });

    // Add breadcrumb schema
    this.seoService.addStructuredData(
      this.seoService.getBreadcrumbSchema([
        { name: 'Home', url: 'https://www.frenchteau.com' },
        { name: 'Services', url: 'https://www.frenchteau.com/#services' }
      ])
    );
  }
}
```

## Example 3: Individual Service Page with Rich Snippet

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cloud-services',
  standalone: true,
  template: `
    <section class="service-detail">
      <h1>Cloud Infrastructure Services</h1>
      <p>Professional cloud migration and management services...</p>
      <!-- Service details -->
    </section>
  `
})
export class CloudServicesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Cloud Infrastructure Services | AWS, Azure, Hybrid Cloud',
      description: 'Professional cloud infrastructure services including AWS, Azure, and hybrid cloud solutions for enterprise businesses.',
      keywords: 'cloud infrastructure, cloud migration, AWS, Azure, cloud management, Québec'
    });

    // Add Service schema for rich snippets
    this.seoService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Cloud Infrastructure Services',
      description: 'Professional cloud migration, management, and optimization services',
      provider: {
        '@type': 'Organization',
        name: 'Frenchteau Tech Solutions',
        url: 'https://www.frenchteau.com'
      },
      areaServed: 'CA',
      serviceType: 'Cloud Computing',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'CAD',
        description: 'Custom cloud solutions with flexible pricing'
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Example 4: Testimonials/Reviews with Rating Schema

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  template: `
    <section class="testimonials">
      <h2>Client Testimonials</h2>
      <!-- Testimonials list -->
    </section>
  `
})
export class TestimonialsComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Client Testimonials | Frenchteau Tech Solutions',
      description: 'Read what our clients say about our IT services and solutions.'
    });

    // Add AggregateRating schema
    this.seoService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      '@id': 'https://www.frenchteau.com/#testimonials',
      ratingValue: '4.8',
      reviewCount: '24',
      bestRating: '5',
      worstRating: '1'
    });
  }
}
```

## Example 5: Contact Page with Form Schema

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="contact">
      <h1>Contact Us</h1>
      <form>
        <!-- Contact form fields -->
      </form>
    </section>
  `
})
export class ContactComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Contact Frenchteau Tech Solutions',
      description: 'Get in touch with our IT solutions team. Request a consultation or ask questions about our services.',
      keywords: 'contact IT services, IT consultation, Québec IT support'
    });

    // Add FAQPage schema for contact-related FAQs
    this.seoService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I get started with Frenchteau Tech?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Contact our team using the form below or call us directly.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you offer free consultations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we offer free initial consultations for new clients.'
          }
        }
      ]
    });
  }
}
```

## Example 6: About Company Component

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="about">
      <h2>About Frenchteau Tech Solutions</h2>
      <!-- About content -->
    </section>
  `
})
export class AboutComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'About Frenchteau Tech Solutions | IT Excellence in Québec',
      description: 'Learn about Frenchteau Tech Solutions - a leading IT services company delivering cloud, security, and network solutions.'
    });

    // Add Company/Organization About schema
    this.seoService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      mainEntity: {
        '@type': 'Organization',
        name: 'Frenchteau Tech Solutions',
        description: 'Professional IT solutions company in Québec',
        foundingDate: '2015',
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: '50+'
        },
        areaServed: 'CA'
      }
    });
  }
}
```

## Best Practices When Using SeoService

1. **Always call in ngOnInit**: Ensure meta tags are set when component loads
2. **Use proper descriptions**: Keep descriptions 150-160 characters
3. **Include focus keywords**: Primary keyword should appear in title/description
4. **Schema for every page**: Add appropriate structured data for content type
5. **Unique content**: Each page should have unique meta tags
6. **Image alt text**: Always add `alt` attributes to images (accessibility + SEO)

```typescript
// Example: Image with alt text
<img src="service-image.jpg" alt="Cloud infrastructure deployment in progress" />
```

7. **Semantic HTML**: Use proper heading hierarchy

```html
<!-- ✅ Good -->
<h1>Main Page Title</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>

<!-- ❌ Avoid -->
<h1>Main Page Title</h1>
<h1>Another H1</h1>
<h3>Skipped H2</h3>
```

## SEO Testing Tools

After implementing these changes, test with:

1. **Schema Testing**: https://schema.org/validator/
2. **Meta Tags**: https://www.seoptimer.com/meta-tags-analyzer/
3. **OG Tags**: https://www.opengraph.xyz/
4. **Mobile Friendly**: https://search.google.com/test/mobile-friendly
5. **Page Speed**: https://pagespeed.web.dev/
6. **Accessibility**: https://www.wave.webaim.org/

## Common Schema Types to Use

- **Organization**: For company/homepage
- **LocalBusiness**: For location-specific content
- **Service**: For service offerings
- **BreadcrumbList**: For navigation
- **FAQPage**: For FAQs/contact pages
- **AggregateRating**: For reviews/testimonials
- **NewsArticle** or **BlogPosting**: For blog posts
