import { NextResponse, type NextRequest } from 'next/server'

/**
 * Tells the client whether the visitor is somewhere that requires opt-in consent before analytics.
 *
 * This runs in middleware rather than in a server component on purpose: reading request headers
 * from the tree would opt every route out of static prerendering. Middleware runs at the edge,
 * leaves the pages prerendered, and hands the answer down as a small non-identifying cookie.
 */

/** EU 27 + EEA + UK + Switzerland, which has an equivalent regime under the revised FADP. */
const OPT_IN_COUNTRIES = new Set([
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'IS',
  'LI',
  'NO',
  'GB',
  'CH',
])

export const REGION_COOKIE = 'dg-region'

const countryFrom = (request: NextRequest): string | undefined => {
  // Netlify's own geo header, base64 JSON: { country: { code: 'US' }, ... }
  const encoded = request.headers.get('x-nf-geo')
  if (encoded) {
    try {
      // atob, not Buffer: middleware runs in the Edge runtime, where Buffer does not exist and
      // referencing it throws on every request that carries the header.
      const bytes = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0))
      const geo = JSON.parse(new TextDecoder().decode(bytes)) as { country?: { code?: string } }
      if (geo.country?.code) return geo.country.code.toUpperCase()
    } catch {
      // Fall through to the plain header below.
    }
  }

  const plain = request.headers.get('x-country') ?? request.headers.get('cf-ipcountry')
  return plain ? plain.toUpperCase() : undefined
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const country = countryFrom(request)

  // Unknown country is treated as opt-in required. Failing safe here means the worst case is
  // showing a banner to someone who did not need one, never the reverse.
  const region = country && !OPT_IN_COUNTRIES.has(country) ? 'row' : 'eea'

  response.cookies.set(REGION_COOKIE, region, {
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
    // Readable by the client: it is what decides whether the banner renders.
    httpOnly: false,
  })

  return response
}

export const config = {
  // Pages only. Assets and metadata routes have nothing to decide.
  matcher: [
    '/((?!_next/static|_next/image|images|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml|llms.txt|opengraph-image|twitter-image).*)',
  ],
}
