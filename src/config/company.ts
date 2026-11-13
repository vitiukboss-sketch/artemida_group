/**
 * Dane firmy wymagane na stronie internetowej w Polsce.
 *
 * - art. 5 ustawy o świadczeniu usług drogą elektroniczną (nazwa, adres, e-mail, NIP, KRS/CEIDG),
 * - art. 206 § 1 Kodeksu spółek handlowych (dla sp. z o.o.: sąd rejestrowy, KRS, NIP, kapitał zakładowy),
 * - art. 13 RODO (tożsamość i dane kontaktowe administratora danych).
 *
 * Pola z wartością `null` nie są wyświetlane. Przed publikacją uzupełnij wszystkie pola oznaczone TODO.
 */
export const COMPANY = {
  /** Marka widoczna na stronie. */
  brand: 'Artemida Group',
  /**
   * Firma przedsiębiorcy dokładnie tak, jak w CEIDG. Dla JDG musi zawierać imię i nazwisko właściciela (art. 43⁴ Kodeksu cywilnego).
   * TODO: sprawdź pisownię z wpisem w CEIDG (biznes.gov.pl).
   */
  legalName: 'Artem Vitiuk Artemida Group',
  /** 'spolka' = sp. z o.o. / inna spółka z KRS, 'jdg' = jednoosobowa działalność gospodarcza (CEIDG). */
  legalForm: 'jdg' as 'spolka' | 'jdg',
  street: 'ul. Gen. Józefa Longina Sowińskiego 46 lok. 1c',
  postalCode: '40-018',
  city: 'Katowice',
  country: 'Polska',
  email: 'info@artemidagroup.eu',
  phone: '+48 795 657 830',
  phoneHref: '+48795657830',
  nip: '9542915634' as string | null,
  /** TODO: numer REGON. */
  regon: null as string | null,
  /** TODO (tylko spółka): numer KRS. */
  krs: null as string | null,
  /** TODO (tylko spółka): sąd rejestrowy. Dla Katowic zwykle: Sąd Rejonowy Katowice-Wschód w Katowicach, VIII Wydział Gospodarczy KRS. */
  registryCourt: null as string | null,
  /** TODO (tylko sp. z o.o.): kapitał zakładowy, np. „5 000,00 zł”. */
  shareCapital: null as string | null,
  /** Domena strony, używana w dokumentach prawnych. */
  website: 'artemidagroup.eu',
}

export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`

/** Data wejścia w życie dokumentów prawnych. Zmieniaj przy każdej istotnej zmianie treści. */
export const LEGAL_UPDATED = '2026-11-13'

/** Wersja polityki cookies. Zmiana wersji ponownie wyświetla baner zgody wszystkim odwiedzającym. */
export const CONSENT_VERSION = 1

if (import.meta.env.DEV) {
  const missing = (['nip', 'regon', 'krs', 'registryCourt', 'shareCapital'] as const).filter(key => {
    if (COMPANY.legalForm === 'jdg' && ['krs', 'registryCourt', 'shareCapital'].includes(key)) return false
    return COMPANY[key] === null
  })
  if (missing.length) console.warn(`[company.ts] Uzupełnij dane firmy przed publikacją: ${missing.join(', ')}`)
}
