// Hero
export interface FeatureBannerItem {
  icon: string;
  labelKey: string;
}

// About
export interface AboutFeature {
  icon: string;
  titleKey: string;
  descKey: string;
}

// Services
export interface ServiceCard {
  emoji: string;
  titleKey: string;
  descKey: string;
}

// Benefits
export interface BenefitCard {
  icon: string;
  titleKey: string;
  descKey: string;
}

// Process
export interface ProcessStep {
  number: number;
  titleKey: string;
  descKey: string;
}

// Testimonials
export interface Testimonial {
  avatar: string;
  name: string;
  clientKey: string;
  roleKey: string;
  rating: number;
}

// Stats
export interface StatItem {
  number: string;
  labelKey: string;
}

// Contact
export interface ContactInfo {
  icon: string;
  labelKey: string;
  content: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Footer
export interface FooterLink {
  label: string;
  url: string;
  isTranslated?: boolean;
}

export interface FooterSection {
  titleKey: string;
  links: FooterLink[];
}
