#!/bin/bash
# Quick SEO Update Script - Configuration Template
# Update these values with actual Frenchteau Tech Solutions information

# IMPORTANT: After updating these values, you'll need to:
# 1. Update src/index.html meta tags
# 2. Update src/app/services/seo.service.ts with actual data
# 3. Create and add the OG image to src/assets/images/

# ============================================================================
# BUSINESS INFORMATION - REQUIRED UPDATES
# ============================================================================

# Company Details
COMPANY_NAME="Frenchteau Tech Solutions"
COMPANY_URL="https://www.frenchteau.com"
COMPANY_EMAIL="contact@frenchteau.com"
COMPANY_PHONE="+1-XXX-XXX-XXXX"  # REPLACE WITH ACTUAL PHONE
COMPANY_ADDRESS="[Full Address], Québec, QC, CA"

# Social Media
LINKEDIN_URL="https://www.linkedin.com/company/frenchteau-tech-solutions"
TWITTER_URL="https://twitter.com/frenchteau"
FACEBOOK_URL="https://www.facebook.com/frenchteau"

# Images
OG_IMAGE_URL="${COMPANY_URL}/assets/images/og-image.jpg"
LOGO_URL="${COMPANY_URL}/assets/images/logo.png"
FAVICON_URL="${COMPANY_URL}/favicon.ico"

# ============================================================================
# SEO KEYWORDS BY SERVICE
# ============================================================================

# Primary Keywords (Homepage)
KEYWORDS_PRIMARY="IT solutions, cloud infrastructure, cybersecurity, network management, IT consulting, Québec"

# Service Keywords
KEYWORDS_CLOUD="cloud infrastructure, cloud migration, AWS, Azure, cloud security"
KEYWORDS_SECURITY="cybersecurity, security audit, penetration testing, threat detection"
KEYWORDS_NETWORK="network management, network security, network optimization, IT infrastructure"
KEYWORDS_CONSULTING="IT consulting, technology strategy, digital transformation, IT roadmap"

# ============================================================================
# DESCRIPTION TEMPLATES
# ============================================================================

DESC_HOMEPAGE="Award-winning IT solutions company in Québec. Expert services in cloud infrastructure, cybersecurity, network management, and IT consulting for businesses."

DESC_CLOUD="Professional cloud infrastructure services including migration, management, and optimization for AWS, Azure, and hybrid environments."

DESC_SECURITY="Enterprise cybersecurity solutions including security audits, penetration testing, and ongoing threat monitoring."

DESC_NETWORK="Network infrastructure design, implementation, and management for reliable and secure business connectivity."

# ============================================================================
# STRUCTURED DATA FIELDS
# ============================================================================

# Organization Contact Type
CONTACT_TYPE="Customer Service"

# Service Area
SERVICE_AREA="CA"  # Canada

# Price Range
PRICE_RANGE="\$\$"  # $$ (moderate pricing)

# ============================================================================
# FILES TO UPDATE
# ============================================================================

echo "Files that need SEO updates:"
echo "1. src/index.html - Update meta tags with your information"
echo "2. src/app/services/seo.service.ts - Update baseUrl and schema data"
echo "3. src/assets/images/ - Add og-image.jpg (1200x630px) and logo.png"
echo "4. public/sitemap.xml - Update lastmod dates and add any new pages"
echo "5. public/robots.txt - Keep as is, but verify domain is correct"

echo ""
echo "Actions to complete:"
echo "1. Replace phone: ${COMPANY_PHONE}"
echo "2. Replace email: ${COMPANY_EMAIL}"
echo "3. Replace address: ${COMPANY_ADDRESS}"
echo "4. Add social media URLs"
echo "5. Create og-image.jpg (1200x630px) in src/assets/images/"
echo "6. Create/add logo.png in src/assets/images/"
echo "7. Verify domain name is correct (${COMPANY_URL})"
echo "8. Add service-specific pages with unique meta tags"
