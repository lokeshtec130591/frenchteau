import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://www.frenchteau.com';
  private defaultImage = `${this.baseUrl}/assets/images/og-image.jpg`;

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  setPageMetadata(data: SEOData): void {
    // Set page title
    const fullTitle = data.title.includes('|') 
      ? data.title 
      : `${data.title} | Frenchteau Tech Solutions`;
    this.titleService.setTitle(fullTitle);

    // Set description
    this.updateMetaTag('name', 'description', data.description);

    // Set keywords if provided
    if (data.keywords) {
      this.updateMetaTag('name', 'keywords', data.keywords);
    }

    // Set Open Graph tags
    const ogImage = data.image || this.defaultImage;
    const ogUrl = data.url || this.baseUrl;

    this.updateMetaTag('property', 'og:title', fullTitle);
    this.updateMetaTag('property', 'og:description', data.description);
    this.updateMetaTag('property', 'og:image', ogImage);
    this.updateMetaTag('property', 'og:url', ogUrl);

    // Set Twitter tags
    this.updateMetaTag('property', 'twitter:title', fullTitle);
    this.updateMetaTag('property', 'twitter:description', data.description);
    this.updateMetaTag('property', 'twitter:image', ogImage);

    // Set canonical URL
    this.updateLinkTag('canonical', ogUrl);
  }

  setDefaultMetadata(): void {
    const defaultData: SEOData = {
      title: 'Professional IT Services Québec',
      description: 'Award-winning IT solutions company in Québec. Expert services in cloud infrastructure, cybersecurity, network management, and IT consulting for businesses.',
      keywords: 'IT solutions, cloud infrastructure, cybersecurity, network management, IT consulting, Québec',
      image: this.defaultImage,
      url: this.baseUrl
    };
    this.setPageMetadata(defaultData);
  }

  private updateMetaTag(attrSelector: 'name' | 'property', attrName: string, content: string): void {
    const selector = `${attrSelector}="${attrName}"`;
    let meta = this.metaService.getTag(selector);
    
    if (meta) {
      this.metaService.updateTag({ [attrSelector]: attrName, content });
    } else {
      this.metaService.addTag({ [attrSelector]: attrName, content });
    }
  }

  private updateLinkTag(rel: string, href: string): void {
    const selector = `rel="${rel}"`;
    const link = document.querySelector(`link[${selector}]`);
    
    if (link) {
      link.setAttribute('href', href);
    } else {
      const newLink = document.createElement('link');
      newLink.rel = rel;
      newLink.href = href;
      document.head.appendChild(newLink);
    }
  }

  /**
   * Add structured data (JSON-LD) to the page
   */
  addStructuredData(schema: Record<string, unknown>): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /**
   * Get organization schema for homepage
   */
  getOrganizationSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Frenchteau Tech Solutions',
      url: this.baseUrl,
      logo: `${this.baseUrl}/assets/images/logo.png`,
      description: 'Professional IT solutions company providing cloud infrastructure, cybersecurity, and IT consulting services in Québec.',
      sameAs: [
        'https://www.linkedin.com/company/frenchteau-tech-solutions',
        'https://twitter.com/frenchteau',
        'https://www.facebook.com/frenchteau'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+1-XXX-XXX-XXXX',
        email: 'contact@frenchteau.com'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Québec',
        addressLocality: 'Québec',
        addressCountry: 'CA'
      }
    };
  }

  /**
   * Get local business schema
   */
  getLocalBusinessSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Frenchteau Tech Solutions',
      image: `${this.baseUrl}/assets/images/logo.png`,
      description: 'Professional IT solutions company providing cloud infrastructure, cybersecurity, and IT consulting services.',
      url: this.baseUrl,
      telephone: '+1-XXX-XXX-XXXX',
      priceRange: '$$',
      areaServed: 'CA',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Québec',
        addressLocality: 'Québec',
        addressCountry: 'CA'
      }
    };
  }

  /**
   * Get breadcrumb schema
   */
  getBreadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
    const itemListElement = items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement
    };
  }
}
