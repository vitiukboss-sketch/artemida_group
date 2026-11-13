import { COMPANY } from './config/company'
import { LANDINGS, LANDING_PATHS, LANDING_SLUGS } from './landings'

/** Polskie tytuły i opisy stron pod wyszukiwarki (wstawiane do prerenderowanego HTML). */
export const SITE_URL = 'https://artemidagroup.eu'

export const SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Agencja marketingowa Katowice – reklama Meta, Google i TikTok | Artemida Group',
    description: 'Agencja marketingowa z Katowic. Prowadzimy kampanie Meta Ads (Facebook i Instagram), Google Ads i TikTok Ads z precyzyjnym targetowaniem, produkcję wideo, UGC i SEO dla firm i e-commerce.',
  },
  '/uslugi': {
    title: 'Usługi marketingowe: Meta Ads, Google Ads, TikTok Ads i SEO | Artemida Group',
    description: 'Reklama na Facebooku i Instagramie, kampanie Google Ads i TikTok Ads, SEO, UX/UI, strony internetowe i influencer marketing. Agencja marketingowa z Katowic, działamy w całej Polsce.',
  },
  '/produkcja': {
    title: 'Produkcja wideo reklamowego i treści UGC | Artemida Group',
    description: 'Reklamy wideo na TikTok, Instagram i YouTube, treści UGC, grafiki do kampanii i postprodukcja. Materiały tworzone pod konwersję i testy A/B.',
  },
  '/portfolio': {
    title: 'Portfolio – kampanie na TikToku i reklamy wideo | Artemida Group',
    description: 'Wybrane realizacje agencji Artemida Group: 2 mln i 4,2 mln wyświetleń na TikToku dzięki serii wideo i kampaniom wzrostowym.',
  },
  '/cennik': {
    title: 'Cennik prowadzenia kampanii Meta Ads i Google Ads | Artemida Group',
    description: 'Audyt reklam od 169 €, prowadzenie kampanii Meta Ads, Google Ads i TikTok Ads od 179 € miesięcznie. Przejrzyste ceny agencji marketingowej z Katowic.',
  },
  '/o-nas': {
    title: 'O nas – agencja marketingu internetowego z Katowic | Artemida Group',
    description: 'Artemida Group to agencja marketingu internetowego założona przez Artema Vitiuka, stratega z ponad 7-letnim doświadczeniem w kampaniach performance.',
  },
  '/kontakt': {
    title: 'Kontakt – agencja marketingowa Katowice | Artemida Group',
    description: 'Napisz do nas i opowiedz o projekcie. Odpowiemy w ciągu jednego dnia roboczego. Artemida Group, ul. Sowińskiego 46, Katowice.',
  },
  '/reklama-facebook-instagram': {
    title: 'Reklama na Facebooku i Instagramie (Meta Ads) – Katowice | Artemida Group',
    description: 'Prowadzenie kampanii Meta Ads na Facebooku i Instagramie z precyzyjnym targetowaniem. Strategia, kreacje, Piksel i Conversions API, optymalizacja. Od 179 € miesięcznie.',
  },
  '/kampanie-google-ads': {
    title: 'Kampanie Google Ads – prowadzenie i audyt, Katowice | Artemida Group',
    description: 'Prowadzenie kampanii Google Ads: wyszukiwarka, Performance Max, Google Shopping i YouTube. Pomiar konwersji w GA4. Audyt konta od 169 €, prowadzenie od 179 € miesięcznie.',
  },
  '/reklama-tiktok': {
    title: 'Reklama na TikToku (TikTok Ads) i produkcja wideo | Artemida Group',
    description: 'Kampanie TikTok Ads, produkcja krótkich filmów i treści UGC. Nasze serie wideo zebrały 2 i 4,2 mln wyświetleń. Agencja marketingowa z Katowic.',
  },
  '/polityka-prywatnosci': { title: 'Polityka prywatności | Artemida Group', description: 'Jak Artemida Group przetwarza dane osobowe zgodnie z RODO.' },
  '/polityka-cookies': { title: 'Polityka cookies | Artemida Group', description: 'Informacje o plikach cookies na stronie artemidagroup.eu i o tym, jak zarządzać zgodą.' },
  '/regulamin': { title: 'Regulamin | Artemida Group', description: 'Regulamin świadczenia usług drogą elektroniczną na stronie artemidagroup.eu.' },
}

/** Dane strukturalne (schema.org) firmy – pomagają Google rozpoznać firmę lokalną. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#firma`,
    name: COMPANY.brand,
    legalName: COMPANY.legalName,
    description: SEO['/'].description,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/ag-mark.png`,
    image: `${SITE_URL}/brand/ag-mark.png`,
    email: COMPANY.email,
    telephone: COMPANY.phoneHref,
    taxID: COMPANY.nip,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.street,
      postalCode: COMPANY.postalCode,
      addressLocality: COMPANY.city,
      addressRegion: 'śląskie',
      addressCountry: 'PL',
    },
    areaServed: [{ '@type': 'City', name: 'Katowice' }, { '@type': 'Country', name: 'Polska' }],
    knowsAbout: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Google Ads', 'TikTok Ads', 'SEO', 'marketing internetowy', 'produkcja wideo', 'UGC'],
  }
}

/** Dane strukturalne FAQ dla stron usług (pytania i odpowiedzi widoczne na stronie). */
export function faqJsonLd(path: string) {
  const slug = LANDING_SLUGS.find(key => LANDING_PATHS[key] === path)
  if (!slug) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: LANDINGS.pl[slug].faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export const ROUTES = [
  '/', '/uslugi', ...LANDING_SLUGS.map(slug => LANDING_PATHS[slug]), '/produkcja', '/portfolio', '/cennik', '/o-nas', '/kontakt',
  '/polityka-prywatnosci', '/polityka-cookies', '/regulamin',
]
