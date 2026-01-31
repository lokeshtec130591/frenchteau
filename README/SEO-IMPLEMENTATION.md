# SEO Implementation Guide - Frenchteau Tech Solutions

## Overview
This document outlines the SEO enhancements implemented for the Frenchteau Tech Solutions website and provides guidelines for maintaining and improving SEO performance.

---

## Implemented SEO Features

### 1. **Meta Tags** (index.html)
✅ **Page Title**: Optimized with primary keyword and brand name
✅ **Meta Description**: Compelling 160-character description for search results
✅ **Meta Keywords**: Relevant keywords for the business
✅ **Robots Meta Tag**: Controls indexing (index, follow)
✅ **Theme Color**: Defines browser UI color for mobile
✅ **Charset & Viewport**: UTF-8 encoding and responsive design meta tags

### 2. **Open Graph Tags** (Social Media Sharing)
✅ **og:type**: Set to "website"
✅ **og:title**, **og:description**: Optimized for social sharing
✅ **og:image**: Define image dimensions (1200x630px)
✅ **og:url**: Canonical URL for the page
✅ **og:image:width/height**: Recommended dimensions

### 3. **Twitter Card Tags**
✅ **twitter:card**: Set to "summary_large_image"
✅ **twitter:title**, **twitter:description**, **twitter:image**
✅ Optimized for Twitter/X sharing

### 4. **Canonical URL**
✅ Prevents duplicate content issues
✅ Consolidates indexing authority to main domain

### 5. **Language Alternates (hreflang)**
✅ **hreflang="en"**: English version (primary)
✅ **hreflang="x-default"**: Default language fallback

### 6. **Structured Data (JSON-LD)**
Implemented in `SeoService`:

#### Organization Schema
```json
{
  "@type": "Organization",
  "name": "Frenchteau Tech Solutions",
  "url": "https://www.frenchteau.com",
  "logo": "...",
  "sameAs": ["LinkedIn", "Twitter", "Facebook"]
}
```

#### Local Business Schema
```json
{
  "@type": "LocalBusiness",
  "name": "Frenchteau Tech Solutions",
  "address": "Québec, CA"
}
```

### 7. **Robots.txt** (public/robots.txt)
✅ Guides search engine crawlers
✅ Specifies sitemap location
✅ Sets crawl delay
✅ Allows major search engines (Google, Bing)

### 8. **XML Sitemap** (public/sitemap.xml)
✅ Lists all important pages and sections
✅ Includes lastmod and changefreq attributes
✅ Prioritizes pages (homepage = 1.0, sections = 0.7-0.9)

### 9. **Apple Touch Icon**
✅ Favicon and apple-touch-icon for branding across devices

### 10. **SEO Service** (src/app/services/seo.service.ts)
Provides utilities for:
- Dynamic meta tag management
- Structured data generation
- Page metadata updates
- Schema generation methods

---

## SEO Service Usage

### Basic Usage in Components
```typescript
import { SeoService } from '../../services/seo.service';

export class MyComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Set page-specific metadata
    this.seoService.setPageMetadata({
      title: 'My Page Title',
      description: 'Page description',
      keywords: 'keyword1, keyword2',
      image: 'https://www.frenchteau.com/assets/images/custom-image.jpg',
      url: 'https://www.frenchteau.com/my-page'
    });

    // Add breadcrumbs if needed
    this.seoService.addStructuredData(
      this.seoService.getBreadcrumbSchema([
        { name: 'Home', url: 'https://www.frenchteau.com' },
        { name: 'Services', url: 'https://www.frenchteau.com/#services' }
      ])
    );
  }
}
```

---

## TODO: SEO Optimization Checklist

### Immediate Actions Required
- [ ] **Update phone numbers** in SeoService schema (currently XXX-XXX-XXXX)
- [ ] **Update email** in SeoService schema (currently contact@frenchteau.com)
- [ ] **Create OG image**: 1200x630px image for social sharing
- [ ] **Create logo**: High-quality logo (PNG, SVG) for schema
- [ ] **Update social media URLs** in Organization schema (LinkedIn, Twitter, Facebook)
- [ ] **Add specific address**: Replace "Québec" with full business address

### Content & Keywords
- [ ] **Research keywords**: Identify high-value keywords for IT services in Québec
- [ ] **Optimize hero section**: Ensure primary keywords in H1 tag
- [ ] **Add service pages**: Create dedicated landing pages for each service
- [ ] **Blog/News section**: Add blog posts for content marketing (FAQ, guides, case studies)
- [ ] **Update i18n files**: Add SEO-related translation keys if needed

### Technical SEO
- [ ] **Image optimization**: 
  - Add alt text to all images (critical for accessibility and SEO)
  - Use descriptive filenames
  - Compress images for faster loading
- [ ] **Page speed**: Test with Google PageSpeed Insights
- [ ] **Mobile responsiveness**: Verify on various devices
- [ ] **SSL certificate**: Ensure HTTPS is enabled
- [ ] **Core Web Vitals**: Monitor LCP, FID, CLS

### Link Building & Authority
- [ ] **Internal linking**: Link between related sections
- [ ] **External backlinks**: Seek links from reputable IT/business sites
- [ ] **Social media**: Integrate social sharing buttons
- [ ] **Business directories**: Register in Google My Business, Yelp, etc.

### Monitoring & Analytics
- [ ] **Google Search Console**: Register and verify
- [ ] **Google Analytics 4**: Set up tracking
- [ ] **Bing Webmaster Tools**: Register
- [ ] **Monitor rankings**: Track keyword positions monthly
- [ ] **Audit reports**: Regular SEO audits with tools like Semrush or Ahrefs

### Local SEO (Québec-focused)
- [ ] **Google My Business**: Complete profile with photos, hours, reviews
- [ ] **Local keywords**: Optimize for "IT services Québec", "IT consulting Montreal", etc.
- [ ] **Local citations**: Consistent NAP (Name, Address, Phone) across directories
- [ ] **Reviews**: Encourage and respond to customer reviews

---

## Schema.org Integration Notes

The `SeoService` provides pre-built schemas:
- **getOrganizationSchema()**: For homepage and general pages
- **getLocalBusinessSchema()**: For location-based pages
- **getBreadcrumbSchema()**: For navigation hierarchies

Schemas are automatically added to the page's `<head>` as JSON-LD scripts.

---

## Multilingual SEO Considerations

The site supports English primarily with optional language switcher for users:
1. **Primary language**: English (for SEO)
2. **User language switching**: ngx-translate module supports UI translation
3. **Search optimization**: Content is optimized for English keywords
4. **hreflang tags**: Only English version configured for search engines

---

## Performance & Core Web Vitals

Monitor these metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

Use tools:
- Google PageSpeed Insights
- WebPageTest
- Lighthouse (in Chrome DevTools)

---

## Best Practices Going Forward

1. **Alt text**: Add descriptive alt text to all images
2. **Semantic HTML**: Use proper heading hierarchy (H1, H2, H3)
3. **Content length**: Aim for 300+ words on key pages
4. **Freshness**: Update content regularly, maintain active blog
5. **User signals**: Optimize for engagement, reduce bounce rate
6. **Mobile first**: Design and test mobile experience first
7. **Accessibility**: Ensure WCAG 2.1 AA compliance (good for SEO too)

---

## Files Modified/Created

- ✅ **src/index.html**: Enhanced with meta tags
- ✅ **src/app/services/seo.service.ts**: New SEO service
- ✅ **src/app/app.component.ts**: Integrated SeoService
- ✅ **public/robots.txt**: Search engine crawler instructions
- ✅ **public/sitemap.xml**: URL sitemap for indexing

---

## Useful SEO Tools

- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **SEMrush**: https://www.semrush.com
- **Ahrefs**: https://ahrefs.com
- **Moz**: https://moz.com
- **Lighthouse**: Built into Chrome DevTools
- **GTmetrix**: https://gtmetrix.com

---

**Last Updated**: January 31, 2026
**Angular Version**: 19.0.0
