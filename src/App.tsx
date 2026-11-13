import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CookieBanner } from './components/CookieBanner'
import { COMPANY, COMPANY_ADDRESS, LEGAL_UPDATED } from './config/company'
import { openCookieSettings, trackLead } from './consent'
import { DICT, LANGS, PAGE_PATHS, initialLang, rememberLang, type Dictionary, type Lang, type PageKey } from './i18n'
import { DOC_PATHS, LEGAL, type Block, type DocKey } from './legal/content'
import { Link, navigate, usePath } from './router'
import { SEO } from './seo'

const NAV_PAGES: PageKey[] = ['services', 'production', 'portfolio', 'pricing', 'about']

function resolve(path: string): { page?: PageKey; doc?: DocKey } {
  const clean = path.replace(/\/+$/, '') || '/'
  const page = (Object.keys(PAGE_PATHS) as PageKey[]).find(key => PAGE_PATHS[key] === clean)
  if (page) return { page }
  const doc = (Object.keys(DOC_PATHS) as DocKey[]).find(key => DOC_PATHS[key] === clean)
  return doc ? { doc } : {}
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const path = usePath()
  const t = DICT[lang]
  const { page, doc } = resolve(path)

  useEffect(() => {
    document.documentElement.lang = lang
    const title = doc ? LEGAL[lang][doc].title : page ? t.titles[page] : t.notFound.title
    // Po polsku tytuł zgodny z prerenderowanym HTML (SEO); w innych językach tytuł z tłumaczenia.
    document.title = lang === 'pl' && SEO[path.replace(/\/+$/, '') || '/'] ? SEO[path.replace(/\/+$/, '') || '/'].title : page === 'home' ? title : `${title} · ${COMPANY.brand}`
  }, [lang, page, doc, t])

  const changeLang = (next: Lang) => {
    setLang(next)
    rememberLang(next)
  }

  return (
    <>
      <a href="#main" className="skip-link">{t.skip}</a>
      <Header t={t} lang={lang} onLang={changeLang} current={page} darkTop={page !== undefined} />
      <main id="main">
        {page === 'home' && <Home t={t} />}
        {page === 'services' && <Services t={t} />}
        {page === 'production' && <Production t={t} />}
        {page === 'portfolio' && <Portfolio t={t} />}
        {page === 'pricing' && <Pricing t={t} />}
        {page === 'about' && <About t={t} />}
        {page === 'contact' && <Contact t={t} lang={lang} />}
        {doc && <LegalPage lang={lang} t={t} doc={doc} />}
        {!page && !doc && <NotFound t={t} />}
      </main>
      <Footer t={t} />
      {/* Baner tylko w przeglądarce: w prerenderowanym HTML nie wiemy, czy zgoda już jest */}
      {typeof window !== 'undefined' && <CookieBanner t={t} />}
    </>
  )
}

/* ================================================================== */
/* Layout                                                             */
/* ================================================================== */

function Wordmark() {
  return (
    <span className="wordmark" aria-label={COMPANY.brand}>
      <img className="wordmark__logo" src="/brand/ag-mark.png" alt="" width="650" height="400" />
      <span>Artemida <span className="wordmark__light">Group</span></span>
    </span>
  )
}

/** Wyróżnia fragment nagłówka kolorem marki. */
function Accent({ text, accent }: { text: string; accent: string }) {
  const i = accent ? text.indexOf(accent) : -1
  if (i < 0) return <>{text}</>
  return <>{text.slice(0, i)}<span className="hero__accent">{accent}</span>{text.slice(i + accent.length)}</>
}

function Header({ t, lang, onLang, current, darkTop }: { t: Dictionary; lang: Lang; onLang: (lang: Lang) => void; current?: PageKey; darkTop: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const path = usePath()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`header${scrolled || !darkTop || open ? ' header--solid' : ''}${open ? ' header--open' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__brand"><Wordmark /></Link>
        <nav className="header__nav" aria-label="Menu">
          {NAV_PAGES.map(key => (
            <Link key={key} to={PAGE_PATHS[key]} aria-current={current === key ? 'page' : undefined}>{t.nav[key]}</Link>
          ))}
        </nav>
        <div className="header__actions">
          <LangSwitch lang={lang} onLang={onLang} />
          <Link to={PAGE_PATHS.contact} className="btn btn--accent btn--sm header__cta">{t.cta.contact}</Link>
          <button type="button" className="header__burger" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t.nav.close : t.nav.menu} onClick={() => setOpen(o => !o)}>
            <span /><span />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Menu">
          <div className="container">
            {(['home', ...NAV_PAGES, 'contact'] as PageKey[]).map((key, i) => (
              <Link key={key} to={PAGE_PATHS[key]} className="mobile-menu__link" aria-current={current === key ? 'page' : undefined}>
                <span className="mobile-menu__index">{String(i + 1).padStart(2, '0')}</span>
                {t.nav[key]}
              </Link>
            ))}
            <div className="mobile-menu__foot">
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a>
            </div>
            <LangSwitch lang={lang} onLang={onLang} />
          </div>
        </nav>
      )}
    </header>
  )
}

function LangSwitch({ lang, onLang }: { lang: Lang; onLang: (lang: Lang) => void }) {
  return (
    <div className="lang" role="group" aria-label="Język / Язык / Language">
      {LANGS.map(code => (
        <button key={code} type="button" lang={code} aria-pressed={code === lang} title={DICT[code].langName} onClick={() => onLang(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function PageHero({ label, title, lead, children }: { label: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="hero hero--page">
      <div className="container">
        <p className="eyebrow eyebrow--light">{label}</p>
        <div className="hero__grid">
          <h1 className="hero__title hero__title--page">{title}</h1>
          {(lead || children) && (
            <div className="hero__side">
              {lead && <p className="hero__lead">{lead}</p>}
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function SectionHead({ index, label, title, lead, light }: { index?: string; label: string; title: string; lead?: string; light?: boolean }) {
  return (
    <div className="section-head">
      <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>{index && <span className="eyebrow__index">{index}</span>}{label}</p>
      <div className="section-head__row">
        <h2 className="section-title">{title}</h2>
        {lead && <p className={`section-lead${light ? ' section-lead--light' : ''}`}>{lead}</p>}
      </div>
    </div>
  )
}

function CtaBand({ t }: { t: Dictionary }) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2 className="cta-band__title">{t.home.ctaTitle}</h2>
          <p className="cta-band__lead">{t.home.ctaLead}</p>
        </div>
        <div className="cta-band__actions">
          <Link to={PAGE_PATHS.contact} className="btn btn--accent">{t.cta.discuss}<Arrow /></Link>
          <a href={`mailto:${COMPANY.email}`} className="cta-band__mail">{COMPANY.email}</a>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/* Pages                                                              */
/* ================================================================== */

function Home({ t }: { t: Dictionary }) {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow eyebrow--light">{t.home.eyebrow}</p>
          <div className="hero__grid">
            <h1 className="hero__title"><Accent text={t.home.title} accent={t.home.titleAccent} /></h1>
            <div className="hero__side">
              <p className="hero__lead">{t.home.lead}</p>
              <div className="hero__ctas">
                <Link to={PAGE_PATHS.contact} className="btn btn--accent">{t.cta.contact}<Arrow /></Link>
                <Link to={PAGE_PATHS.portfolio} className="btn btn--text-light">{t.cta.work}</Link>
              </div>
            </div>
          </div>
          <ul className="ticker" aria-label={t.home.servicesLabel}>
            {t.services.items.map(item => <li key={item.key}>{item.short}</li>)}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="01" label={t.home.servicesLabel} title={t.home.servicesTitle} lead={t.home.servicesLead} />
          <ServiceList t={t} />
          <div className="section__more"><Link to={PAGE_PATHS.services} className="btn btn--outline">{t.cta.services}<Arrow /></Link></div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead index="02" label={t.home.processLabel} title={t.home.processTitle} />
          <Steps items={t.process} />
        </div>
      </section>

      <CtaBand t={t} />
    </>
  )
}

function ServiceList({ t, withPricing }: { t: Dictionary; withPricing?: boolean }) {
  return (
    <ol className="service-list">
      {t.services.items.map((item, i) => (
        <li key={item.key} className="service-list__item">
          <span className="service-list__num">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="service-list__title">{item.title}</h3>
          <p className="service-list__text">{item.text}</p>
          {withPricing && (
            <Link to={`${PAGE_PATHS.contact}?service=${item.key}`} className="service-list__link">{t.cta.pricing}<Arrow /></Link>
          )}
        </li>
      ))}
    </ol>
  )
}

function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className={`steps steps--${items.length}`}>
      {items.map((step, i) => (
        <li key={step.title} className="steps__item">
          <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="steps__title">{step.title}</h3>
          <p className="steps__text">{step.text}</p>
        </li>
      ))}
    </ol>
  )
}

function CaseGrid({ t }: { t: Dictionary }) {
  return (
    <div className="cases">
      {t.portfolio.campaigns.map((item, i) => (
        <article key={item.title} className="case">
          <p className="case__tag"><span>{String(i + 1).padStart(2, '0')}</span>{item.tag}</p>
          <p className="case__hero">{item.stats[0].value}<span>{item.stats[0].label}</span></p>
          <h3 className="case__title">{item.title}</h3>
          <p className="case__text">{item.text}</p>
          <dl className="case__stats">
            {item.stats.slice(1).map(stat => (
              <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  )
}

function Services({ t }: { t: Dictionary }) {
  return (
    <>
      <PageHero label={t.services.label} title={t.services.title} lead={t.services.lead} />
      <section className="section">
        <div className="container">
          <ServiceList t={t} withPricing />
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <SectionHead label={t.home.processLabel} title={t.home.processTitle} />
          <Steps items={t.process} />
        </div>
      </section>
      <CtaBand t={t} />
    </>
  )
}

function Production({ t }: { t: Dictionary }) {
  const p = t.production
  return (
    <>
      <PageHero label={p.label} title={p.title} lead={p.lead}>
        <div className="formats" aria-hidden="true">
          <span className="formats__frame formats__frame--wide">16:9</span>
          <span className="formats__frame formats__frame--square">1:1</span>
          <span className="formats__frame formats__frame--tall">9:16</span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container">
          <SectionHead index="01" label={p.formatsLabel} title={p.formatsLabel} />
          <div className="grid-2">
            {p.formats.map((item, i) => (
              <article key={item.title} className="tile">
                <span className="tile__num">{String(i + 1).padStart(2, '0')} / {String(p.formats.length).padStart(2, '0')}</span>
                <h3 className="tile__title">{item.title}</h3>
                <p className="tile__text">{item.text}</p>
                <Link to={`${PAGE_PATHS.contact}?service=production`} className="service-list__link">{t.cta.discuss}<Arrow /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <SectionHead index="02" label={p.approachLabel} title={p.approachTitle} />
          <Steps items={p.approach} />
        </div>
      </section>
      <CtaBand t={t} />
    </>
  )
}

function Portfolio({ t }: { t: Dictionary }) {
  const p = t.portfolio
  return (
    <>
      <PageHero label={p.label} title={p.title} lead={p.lead} />
      <section className="section section--dark section--flush-top">
        <div className="container">
          <SectionHead index="01" label={p.campaignsLabel} title={p.campaignsLabel} light />
          <CaseGrid t={t} />
        </div>
      </section>
      <CtaBand t={t} />
    </>
  )
}

function Pricing({ t }: { t: Dictionary }) {
  const p = t.pricing
  return (
    <>
      <PageHero label={p.label} title={p.title} lead={p.lead} />
      <section className="section">
        <div className="container">
          <SectionHead index="01" label={p.paidLabel} title={p.paidLabel} lead={p.channels} />
          <div className="plans">
            {p.plans.map((plan, i) => (
              <article key={plan.title} className="plan">
                <span className="tile__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="plan__title">{plan.title}</h3>
                <p className="plan__price"><span className="plan__from">{p.from}</span> €{plan.price}</p>
                {!plan.oneOff && <p className="plan__plus">{p.plus}</p>}
                <p className="plan__vat">{p.vat}</p>
                <dl className="plan__details">
                  <dt>{p.who}</dt><dd>{plan.who}</dd>
                  <dt>{p.how}</dt><dd>{plan.how}</dd>
                </dl>
                <Link to={`${PAGE_PATHS.contact}?service=paid`} className="btn btn--outline btn--block">{t.cta.contact}<Arrow /></Link>
              </article>
            ))}
          </div>
          <p className="note">{p.note}</p>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <SectionHead index="02" label={p.tailoredLabel} title={p.tailoredLabel} />
          <div className="grid-2">
            {p.tailored.map((item, i) => (
              <article key={item.title} className="tile tile--paper">
                <h3 className="tile__title">{item.title}</h3>
                <p className="tile__text">{item.text}</p>
                <p className="tile__sub">{p.needsLabel}</p>
                <ol className="needs">{item.needs.map(need => <li key={need}>{need}</li>)}</ol>
                <Link to={`${PAGE_PATHS.contact}?service=${i === 0 ? 'production' : 'seo'}`} className="service-list__link">{t.cta.pricing}<Arrow /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand t={t} />
    </>
  )
}

function About({ t }: { t: Dictionary }) {
  const a = t.about
  return (
    <>
      <PageHero label={a.label} title={a.title} lead={a.lead} />
      <section className="section">
        <div className="container founder">
          <div className="founder__stat">
            <span className="founder__num">{a.founderStat}</span>
            <span className="founder__label">{a.founderStatLabel}</span>
          </div>
          <div>
            <h2 className="founder__name">{a.founderName}</h2>
            <p className="founder__role">{a.founderRole}</p>
            <p className="founder__text">{a.founderText}</p>
            <p className="founder__text founder__text--muted">{a.teamText}</p>
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <SectionHead index="01" label={a.valuesLabel} title={a.valuesTitle} />
          <Steps items={a.values} />
        </div>
      </section>
      <CtaBand t={t} />
    </>
  )
}

/* ------------------------------------------------------------------ */

const CHANNELS = ['email', 'Telegram', 'WhatsApp'] as const
type Channel = (typeof CHANNELS)[number]

function Contact({ t, lang }: { t: Dictionary; lang: Lang }) {
  const c = t.contact
  const initialService = () => {
    const key = typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('service') ?? ''
    return t.services.items.some(item => item.key === key) ? key : ''
  }
  const empty = { name: '', email: '', website: '', service: initialService(), channel: 'email' as Channel, handle: '', message: '' }
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [key]: event.target.value }))

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const service = t.services.items.find(item => item.key === form.service)
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'agency',
          name: form.name,
          email: form.email,
          website: form.website,
          service: service ? DICT.en.services.items.find(item => item.key === service.key)?.title : c.serviceAny,
          messenger: form.channel === 'email' ? 'E-mail' : form.channel,
          handle: form.handle,
          message: form.message,
          language: lang,
          pageUrl: window.location.href,
        }),
      })
      if (!response.ok) throw new Error('Message was not delivered')
      setSent(true)
      trackLead()
    } catch {
      setError(c.sendError)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero label={c.label} title={c.title} lead={c.lead} />
      <section className="section section--dark section--flush-top">
        <div className="container apply apply--solo">
          <div className="apply__panel">
            {sent ? (
              <div ref={successRef} tabIndex={-1} className="success" role="status">
                <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" /><path d="M12 20.5l5.5 5.5L28 15" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                <p className="success__title">{c.successTitle}</p>
                <p className="success__text">{c.successText}</p>
                <button type="button" className="btn btn--text" onClick={() => { setForm({ ...empty, service: '' }); setSent(false) }}>{c.again}</button>
              </div>
            ) : (
              <form onSubmit={submit} className="form">
                <div className="form__head">
                  <h2 className="form__title">{c.formTitle}</h2>
                  <p className="form__required">{c.required}</p>
                </div>

                <div className="form__row">
                  <Field id="f-name" label={c.name} required>
                    <input id="f-name" className="input" required maxLength={120} autoComplete="name" value={form.name} onChange={set('name')} />
                  </Field>
                  <Field id="f-email" label={c.email} required>
                    <input id="f-email" className="input" type="email" required maxLength={200} autoComplete="email" value={form.email} onChange={set('email')} />
                  </Field>
                </div>

                <div className="form__row">
                  <Field id="f-website" label={c.website} hint={c.optional}>
                    <input id="f-website" className="input" type="text" inputMode="url" maxLength={300} autoComplete="url" placeholder="https://" value={form.website} onChange={set('website')} />
                  </Field>
                  <Field id="f-service" label={c.service} hint={c.optional}>
                    <select id="f-service" className="input select" value={form.service} onChange={set('service')}>
                      <option value="">{c.serviceAny}</option>
                      {t.services.items.map(item => <option key={item.key} value={item.key}>{item.title}</option>)}
                    </select>
                  </Field>
                </div>

                <fieldset className="field">
                  <legend className="field__label">{c.channel}</legend>
                  <div className="choices choices--3">
                    {CHANNELS.map(channel => (
                      <button key={channel} type="button" className="choice" aria-pressed={form.channel === channel} onClick={() => setForm(prev => ({ ...prev, channel }))}>
                        {channel === 'email' ? c.channelEmail : channel}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {form.channel !== 'email' && (
                  <Field id="f-handle" label={c.handle} required>
                    <input id="f-handle" className="input" required maxLength={80} placeholder={form.channel === 'Telegram' ? '@username' : '+48 600 000 000'} value={form.handle} onChange={set('handle')} aria-describedby="f-handle-hint" />
                    <p id="f-handle-hint" className="field__hint">{c.handleHint}</p>
                  </Field>
                )}

                <Field id="f-message" label={c.message} required>
                  <textarea id="f-message" className="input" required rows={4} maxLength={3000} placeholder={c.messagePlaceholder} value={form.message} onChange={set('message')} />
                </Field>

                <p className="form__gdpr">
                  {c.gdpr.replace('{company}', COMPANY.legalName)}{' '}
                  <Link to={DOC_PATHS.privacy} className="link">{c.gdprLink}</Link>.
                </p>

                {error && <p className="form__error" role="alert">{error} <a className="link" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>}

                <button type="submit" className="btn btn--accent btn--block" disabled={submitting}>
                  {submitting ? c.sending : c.submit}
                  {!submitting && <Arrow />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ id, label, required, hint, children }: { id: string; label: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {hint && <span className="field__optional"> ({hint})</span>}
      </label>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */

function LegalPage({ lang, t, doc }: { lang: Lang; t: Dictionary; doc: DocKey }) {
  const content = LEGAL[lang][doc]
  const date = new Date(LEGAL_UPDATED).toLocaleDateString(lang === 'en' ? 'en-GB' : lang, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <article className="legal">
      <div className="container container--narrow">
        <Link to="/" className="legal__back">← {t.legal.back}</Link>
        <h1 className="legal__title">{content.title}</h1>
        <p className="legal__meta">{t.legal.updated}: {date}</p>
        {t.legal.binding && <p className="legal__notice">{t.legal.binding}</p>}
        {content.intro && <p className="legal__intro">{content.intro}</p>}
        {content.sections.map(section => (
          <section key={section.h} className="legal__section">
            <h2>{section.h}</h2>
            {section.body.map((block, i) => <LegalBlock key={i} block={block} />)}
          </section>
        ))}
        <nav className="legal__related" aria-label={t.footer.legal}>
          {(Object.keys(DOC_PATHS) as DocKey[]).filter(key => key !== doc).map(key => (
            <Link key={key} to={DOC_PATHS[key]} className="link">{LEGAL[lang][key].title}</Link>
          ))}
          {doc === 'cookies' && <button type="button" className="link link--button" onClick={openCookieSettings}>{t.footer.cookieSettings}</button>}
        </nav>
      </div>
    </article>
  )
}

function LegalBlock({ block }: { block: Block }) {
  if (typeof block === 'string') return <p>{block}</p>
  if ('list' in block) return <ul>{block.list.map(item => <li key={item}>{item}</li>)}</ul>
  const [head, ...rows] = block.table
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{head.map(cell => <th key={cell} scope="col">{cell}</th>)}</tr></thead>
        <tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={i} data-label={head[i]}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function NotFound({ t }: { t: Dictionary }) {
  return (
    <section className="legal">
      <div className="container container--narrow">
        <p className="eyebrow"><span className="eyebrow__index">404</span></p>
        <h1 className="legal__title">{t.notFound.title}</h1>
        <p className="legal__intro">{t.notFound.text}</p>
        <button type="button" className="btn btn--outline" onClick={() => navigate('/')}>{t.notFound.back}<Arrow /></button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Footer({ t }: { t: Dictionary }) {
  const ft = t.footer
  const registry = [
    COMPANY.nip && [ft.nip, COMPANY.nip],
    COMPANY.regon && [ft.regon, COMPANY.regon],
    COMPANY.krs && [ft.krs, COMPANY.krs],
    COMPANY.shareCapital && [ft.capital, COMPANY.shareCapital],
  ].filter(Boolean) as [string, string][]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Wordmark />
            <ul className="footer__list footer__contact">
              <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li><a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a></li>
            </ul>
          </div>
          <div>
            <p className="footer__heading">{ft.pages}</p>
            <ul className="footer__list">
              {[...NAV_PAGES, 'contact' as PageKey].map(key => <li key={key}><Link to={PAGE_PATHS[key]}>{t.nav[key]}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="footer__heading">{ft.company}</p>
            <address className="footer__list">
              <span>{COMPANY.legalName}</span>
              <span>{COMPANY_ADDRESS}</span>
              {COMPANY.registryCourt && <span>{COMPANY.registryCourt}</span>}
              {registry.map(([label, value]) => <span key={label}>{label}: {value}</span>)}
            </address>
          </div>
          <div>
            <p className="footer__heading">{ft.legal}</p>
            <ul className="footer__list">
              <li><Link to={DOC_PATHS.privacy}>{ft.privacy}</Link></li>
              <li><Link to={DOC_PATHS.cookies}>{ft.cookies}</Link></li>
              <li><Link to={DOC_PATHS.terms}>{ft.terms}</Link></li>
              <li><button type="button" className="link--button" onClick={openCookieSettings}>{ft.cookieSettings}</button></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>{ft.trademarks}</p>
          <p>© {new Date().getFullYear()} {COMPANY.legalName}. {ft.rights}</p>
        </div>
      </div>
    </footer>
  )
}

function Arrow() {
  return (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
