# Cross-Domain Linking Setup

## Overview
The Secrets Bangladesh ecosystem consists of multiple domains that need to communicate and allow seamless navigation between each other.

## Domains in the Ecosystem
1. **Main Site**: https://v0-secrets-bangladesh-site.vercel.app/
2. **Inspired Archive**: https://v0-inspired-archive.vercel.app/
3. **78 Secrets App**: https://78secapp.vercel.app/
4. **Secrets BD App**: https://secretsbdapp.vercel.app/

All domains should have bidirectional access to each other.

## How It Works

### Outgoing Links (From This Site)
When redirecting to another domain, always include the referrer parameter:

\`\`\`typescript
const currentOrigin = window.location.origin
window.location.href = `https://target-domain.vercel.app/?ref=${encodeURIComponent(currentOrigin)}`
\`\`\`

Example (already implemented for Inspired Archive):
\`\`\`typescript
window.location.href = `https://v0-inspired-archive.vercel.app/?ref=${encodeURIComponent(window.location.origin)}`
\`\`\`

### Incoming Links (To This Site)
The `CrossDomainNav` component automatically:
1. Detects the `ref` parameter in the URL
2. Stores it in sessionStorage for persistence
3. Displays a back button when a referrer is detected
4. Navigates back to the referring domain when clicked

### Implementation on Other Domains
For other domains in the ecosystem to support cross-domain linking:

1. **Add referrer parameter when linking here**:
\`\`\`typescript
window.location.href = `https://v0-secrets-bangladesh-site.vercel.app/?ref=${encodeURIComponent(window.location.origin)}`
\`\`\`

2. **Implement a similar CrossDomainNav component** to handle incoming referrers and provide back navigation.

3. **Store referrer in sessionStorage** to persist across page navigations within the domain.

## Current Implementation

### Components
- `CrossDomainNav.tsx` - Handles incoming referrer detection and back navigation
- Integrated in `app/layout.tsx` for global availability

### Redirects with Referrer
- Inspire Me mood → Inspired Archive (with referrer)
- Future: Add referrer parameters to any other cross-domain links

## Testing
1. Navigate from this site to another domain with `?ref=` parameter
2. Verify the back button appears on the target domain
3. Click back button to return to this site
4. Verify sessionStorage persists the referrer across page navigations

## Security Considerations
- Referrer URLs are validated and sanitized
- Only whitelisted domains should be allowed (optional enhancement)
- sessionStorage is used instead of localStorage for better security
