import { useRef, useState } from 'react'
import scooterCutout from './assets/scooter-cutout.png'
import taxiCutout from './assets/taxi-cutout.png'
import transportHero from './assets/transport-hero.png'

type Lang = 'pl' | 'ru' | 'en'

const T = {
  pl: {
    brand: ['ARTEMIDA', ' GROUP'],
    navCta: 'Zostaw kontakt',
    heroHeading: 'Zostań kierowcą lub kurierem i zarabiaj do 50 zł na godzinę!',
    heroSub: 'Możesz rozpocząć pracę nawet w 24 godziny',
    heroCta: 'ZOSTAW ZGŁOSZENIE',
    benefits: [
      { icon: '⚡', title: 'Szybki start', text: 'Możesz rozpocząć pracę nawet w 24 godziny. Pomożemy Ci przejść przez pierwsze kroki.' },
      { icon: '🛡️', title: 'Wsparcie na starcie', text: 'Przed rozpoczęciem otrzymasz jasne informacje o kolejnych krokach.' },
    ],
    howTitle: 'Jak to działa',
    howHeading: '3 KROKI DO PIERWSZYCH PIENIĘDZY',
    steps: [
      { num: '01', title: 'Zostaw wniosek', text: 'Wypełnij formularz poniżej, zajmie to mniej niż minutę' },
      { num: '02', title: 'Kontakt', text: 'Nasz menedżer skontaktuje się z Tobą i ustali szczegóły' },
      { num: '03', title: 'Start', text: 'Zacznij pracę i odbieraj wypłaty co tydzień!' },
    ],
    stepCta: 'ZACZNIJ TERAZ',
    revTitle: 'Opinie',
    revHeading: 'CO MÓWIĄ UCZESTNICY',
    reviews: [
      { name: 'Marek K.', city: 'Warszawa', text: 'Na początku byłem sceptyczny, ale po pierwszym tygodniu otrzymałem prawdziwe pieniądze. Teraz to mój główny dochód.', amount: '18 400 zł' },
      { name: 'Anna W.', city: 'Kraków', text: 'Pracuję równolegle z główną pracą. W ciągu miesiąca zarobiłam więcej niż na etacie.', amount: '23 000 zł' },
      { name: 'Piotr R.', city: 'Gdańsk', text: 'Myślałem że to kolejny przekręt. Spróbowałem — pracuję rok i jestem bardzo zadowolony z wyników.', amount: '29 600 zł' },
    ],
    formTitle: 'Formularz',
    formHeading: 'WYPEŁNIJ FORMULARZ PONIŻEJ',
    formHint: 'Skontaktuj się z nami już teraz, aby zacząć pracę w ciągu 24 godzin',
    fields: [
      { key: 'name', label: 'Imię', placeholder: 'Artem', type: 'text' },
      { key: 'phone', label: 'Numer telefonu', placeholder: '', type: 'tel' },
    ],
    countryLabel: 'Kod kraju',
    countrySearch: 'Szukaj kraju lub kodu',
    roleLabel: 'Wybór kierunku',
    roleTaxi: 'Taksówkarz',
    roleCourier: 'Kurier',
    platformLabel: 'Wybierz platformę',
    platformBolt: 'Bolt',
    platformUber: 'Uber',
    platformGlovo: 'Glovo',
    platformPyszne: 'Pyszne.pl',
    selectionError: 'Wybierz stanowisko i platformę.',
    commentLabel: 'Komentarz (opcjonalnie)',
    commentPlaceholder: 'Opowiedz trochę o sobie lub zadaj pytanie...',
    messengerLabel: 'Wygodny komunikator do kontaktu',
    submitCta: 'WYŚLIJ ZGŁOSZENIE',
    privacy: 'Klikając przycisk, zgadzasz się na przetwarzanie danych osobowych',
    successTitle: 'WNIOSEK PRZYJĘTY!',
    successSub: 'Skontaktujemy się z Tobą wkrótce.',
    footer: '© 2026 · Wszelkie prawa zastrzeżone',
  },
  ru: {
    brand: ['ARTEMIDA', ' GROUP'],
    navCta: 'Оставить контакт',
    heroHeading: 'Стань водителем или курьером и зарабатывай до 50 zł в час!',
    heroSub: 'Сможешь приступить к работе даже за 24 часа',
    heroCta: 'ОСТАВИТЬ ЗАЯВКУ',
    benefits: [
      { icon: '⚡', title: 'Быстрый старт', text: 'К работе можно приступить даже за 24 часа. Поможем пройти первые шаги.' },
      { icon: '🛡️', title: 'Поддержка на старте', text: 'До начала работы вы получите понятную информацию о следующих шагах.' },
    ],
    howTitle: 'Как это работает',
    howHeading: '3 ШАГА ДО ПЕРВЫХ ДЕНЕГ',
    steps: [
      { num: '01', title: 'Оставь заявку', text: 'Заполни форму ниже, это займёт меньше минуты' },
      { num: '02', title: 'Контакт', text: 'Наш менеджер свяжется с тобой и уточнит детали' },
      { num: '03', title: 'Старт', text: 'Начни работать и получай выплаты каждую неделю!' },
    ],
    stepCta: 'НАЧАТЬ ПРЯМО СЕЙЧАС',
    revTitle: 'Отзывы',
    revHeading: 'ЧТО ГОВОРЯТ УЧАСТНИКИ',
    reviews: [
      { name: 'Максим К.', city: 'Варшава', text: 'Скептически относился вначале, но после первой недели получил реальные деньги. Сейчас это мой основной доход.', amount: '18 400 zł' },
      { name: 'Анастасия В.', city: 'Краков', text: 'Работаю параллельно с основной работой. За месяц заработала больше, чем на официальной должности.', amount: '23 000 zł' },
      { name: 'Дмитрий Р.', city: 'Гданьск', text: 'Думал, что это очередной лохотрон. Попробовал — уже год работаю и очень доволен результатом.', amount: '29 600 zł' },
    ],
    formTitle: 'Форма',
    formHeading: 'ЗАПОЛНИТЕ ФОРМУ НИЖЕ',
    formHint: 'Свяжитесь с нами прямо сейчас, чтобы начать работу уже через 24 часа',
    fields: [
      { key: 'name', label: 'Имя', placeholder: 'Артем', type: 'text' },
      { key: 'phone', label: 'Номер телефона', placeholder: '', type: 'tel' },
    ],
    countryLabel: 'Код страны',
    countrySearch: 'Найти страну или код',
    roleLabel: 'Выбор направления',
    roleTaxi: 'Таксист',
    roleCourier: 'Курьер',
    platformLabel: 'Выбери платформу',
    platformBolt: 'Bolt',
    platformUber: 'Uber',
    platformGlovo: 'Glovo',
    platformPyszne: 'Pyszne.pl',
    selectionError: 'Выбери позицию и платформу.',
    commentLabel: 'Комментарий (необязательно)',
    commentPlaceholder: 'Расскажи немного о себе или задай вопрос...',
    messengerLabel: 'Удобный мессенджер для связи',
    submitCta: 'ОТПРАВИТЬ ЗАЯВКУ',
    privacy: 'Нажимая кнопку, ты соглашаешься с условиями обработки персональных данных',
    successTitle: 'ЗАЯВКА ПРИНЯТА!',
    successSub: 'Мы свяжемся с тобой в ближайшее время.',
    footer: '© 2026 · Все права защищены',
  },
  en: {
    brand: ['ARTEMIDA', ' GROUP'],
    navCta: 'Leave contact',
    heroHeading: 'Become a driver or courier and earn up to 50 zł per hour!',
    heroSub: 'You can start working in as little as 24 hours',
    heroCta: 'APPLY NOW',
    benefits: [
      { icon: '⚡', title: 'Quick start', text: 'You can start working within 24 hours. We will help you with the first steps.' },
      { icon: '🛡️', title: 'Support at the start', text: 'Before you start, you will receive clear information about the next steps.' },
    ],
    howTitle: 'How it works',
    howHeading: '3 STEPS TO YOUR FIRST MONEY',
    steps: [
      { num: '01', title: 'Submit a request', text: 'Fill in the form below, it takes less than a minute' },
      { num: '02', title: 'Contact', text: 'Our manager will contact you to answer questions and finalize details.' },
      { num: '03', title: 'Start', text: 'Start working and receive weekly payouts!' },
    ],
    stepCta: 'START RIGHT NOW',
    revTitle: 'Reviews',
    revHeading: 'WHAT PARTICIPANTS SAY',
    reviews: [
      { name: 'Marek K.', city: 'Warsaw', text: 'I was skeptical at first, but after the first week I received real money. Now it\'s my main income.', amount: '18 400 zł' },
      { name: 'Anna W.', city: 'Kraków', text: 'I work alongside my main job. In a month I earned more than at my official position.', amount: '23 000 zł' },
      { name: 'Piotr R.', city: 'Gdańsk', text: 'I thought it was another scam. Tried it — been working a year and very happy with the results.', amount: '29 600 zł' },
    ],
    formTitle: 'Form',
    formHeading: 'COMPLETE THE FORM BELOW',
    formHint: 'Contact us now to start working within 24 hours',
    fields: [
      { key: 'name', label: 'Name', placeholder: 'Artem', type: 'text' },
      { key: 'phone', label: 'Phone number', placeholder: '', type: 'tel' },
    ],
    countryLabel: 'Country code',
    countrySearch: 'Search country or code',
    roleLabel: 'Choose a role',
    roleTaxi: 'Taxi driver',
    roleCourier: 'Courier',
    platformLabel: 'Choose a platform',
    platformBolt: 'Bolt',
    platformUber: 'Uber',
    platformGlovo: 'Glovo',
    platformPyszne: 'Pyszne.pl',
    selectionError: 'Choose a role and platform.',
    commentLabel: 'Comment (optional)',
    commentPlaceholder: 'Tell us a bit about yourself or ask a question...',
    messengerLabel: 'Convenient messenger for contact',
    submitCta: 'SEND APPLICATION',
    privacy: 'By clicking the button, you agree to the processing of personal data',
    successTitle: 'APPLICATION RECEIVED!',
    successSub: 'We will contact you shortly.',
    footer: '© 2026 · All rights reserved',
  },
}

const LANG_LABELS: Record<Lang, string> = { pl: 'PL', ru: 'RU', en: 'EN' }

export default function App() {
  const formRef = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', role: '', platform: '', messenger: 'WhatsApp', comment: '' })
  const [lang, setLang] = useState<Lang>('ru')
  const [langOpen, setLangOpen] = useState(false)

  const t = T[lang]
  const platformLabels = { Bolt: t.platformBolt, Uber: t.platformUber, Glovo: t.platformGlovo, 'Pyszne.pl': t.platformPyszne }

  const scrollToForm = () => {
    setLangOpen(false)
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.role || !form.platform) {
      setSubmitError(t.selectionError)
      return
    }
    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          language: lang,
          submittedAt: new Date().toISOString(),
          pageUrl: window.location.href,
        }),
      })

      if (!response.ok) throw new Error('Application was not delivered')
      setSent(true)
    } catch {
      setSubmitError('Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами напрямую.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden" style={{ fontFamily: 'var(--font-body)', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* NAV */}
      <nav className="site-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 px-4 py-4 sm:gap-3 sm:px-8 sm:py-6" style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
        <span className="site-brand shrink-0 whitespace-nowrap leading-none text-[1.05rem] font-extrabold sm:text-xl" style={{ color: 'var(--color-text)', letterSpacing: '-0.04em' }}>
          {t.brand[0]}<span style={{ color: 'var(--color-text)' }}>{t.brand[1]}</span>
        </span>

        <div className="site-nav-actions flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(o => !o)}
              className="site-lang-button flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest"
              style={{ background: '#383838', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            >
              {LANG_LABELS[lang]}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.6, transform: langOpen ? 'rotate(180deg)' : 'none' }}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-1 rounded-xl overflow-hidden shadow-xl" style={{ background: '#1a1a1a', border: '1px solid var(--color-border)', minWidth: 80 }}>
                {(Object.keys(LANG_LABELS) as Lang[]).map(l => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold tracking-widest"
                    style={{
                      color: l === lang ? 'var(--color-neon)' : 'var(--color-text)',
                      background: l === lang ? 'rgba(255,255,255,0.08)' : 'transparent',
                    }}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={scrollToForm} className="site-nav-cta whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold sm:px-5 sm:text-sm" style={{ background: 'var(--color-neon)', color: '#ffffff' }}>
            {t.navCta}
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col">
      {/* HERO */}
      <section className="site-hero relative order-0 overflow-visible px-6 pb-0 pt-32 sm:px-8 sm:pb-16 sm:pt-44">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
          <h1 className="site-hero-heading mx-auto max-w-3xl text-balance font-extrabold" style={{ fontSize: 'clamp(2.35rem, 7vw, 5.4rem)', lineHeight: 1.02, letterSpacing: '-0.065em' }}>
            {t.heroHeading}
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-balance text-lg font-semibold leading-relaxed sm:text-2xl" style={{ color: 'var(--color-text)' }}>
            {t.heroSub}
          </p>

          <div className="mt-12 flex justify-center">
            <button
              onClick={scrollToForm}
              className="rounded-2xl px-9 py-4 text-base font-extrabold sm:px-12 sm:py-5 sm:text-lg"
              style={{ background: 'var(--color-neon)', color: '#ffffff' }}
            >
              {t.heroCta}
            </button>
          </div>
          </div>
          <div className="hero-visual relative isolate -mx-6 mt-2 min-h-[205px] sm:-mx-8 sm:mt-0 sm:min-h-[390px]">
            <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" viewBox="0 0 1100 500" preserveAspectRatio="none" aria-hidden="true">
              <g transform="translate(0 15)">
                <path d="M-120 402 C50 325 220 274 390 276 C505 278 586 320 603 370 C622 430 520 467 353 479 C175 490 6 468 -120 432 Z" fill="#ff353d" />
              </g>
              <g transform="translate(80 -22)">
                <path d="M602 346 C618 281 697 236 810 240 C938 244 1074 292 1210 362 L1210 428 C1063 465 911 473 760 453 C638 437 585 399 602 346 Z" fill="#1877f2" />
              </g>
            </svg>
            <div className="relative z-10 aspect-[1774/800] sm:hidden" role="img" aria-label="Taxi i kurier na skuterze">
              <span aria-hidden="true" className="absolute bottom-[8%] left-[5%] h-[8%] w-[52%] rounded-full bg-black/55 blur-[10px]" />
              <span aria-hidden="true" className="absolute bottom-[17%] right-[4%] h-[7%] w-[29%] rounded-full bg-black/55 blur-[10px]" />
              <img src={taxiCutout} alt="" className="absolute bottom-[7%] left-[-3%] w-[60%] drop-shadow-[0_16px_16px_rgba(0,0,0,.28)]" />
              <img src={scooterCutout} alt="" aria-hidden="true" className="absolute bottom-[18%] right-[3%] w-[30%] drop-shadow-[0_16px_16px_rgba(0,0,0,.28)]" />
            </div>
            <div className="relative z-10 hidden px-8 sm:block">
              <span aria-hidden="true" className="absolute bottom-[18%] left-[7%] h-[8%] w-[48%] rounded-full bg-black/50 blur-[22px]" />
              <span aria-hidden="true" className="absolute bottom-[24%] right-[10%] h-[7%] w-[28%] rounded-full bg-black/50 blur-[20px]" />
              <img src={transportHero} alt="Taxi i kurier na skuterze" className="block h-auto w-full object-contain drop-shadow-[0_16px_16px_rgba(0,0,0,.28)]" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="site-section relative order-3 isolate overflow-hidden px-6 pb-12 pt-4 sm:py-24">
        <div className="relative mx-auto max-w-4xl">
          <h2 className="text-center mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-neon)' }}>{t.howTitle}</h2>
          <p className="text-center mb-10 sm:mb-14" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{t.howHeading}</p>

          <div className="mx-auto flex max-w-2xl flex-col gap-3">
            {t.steps.map((s, i) => (
              <div key={s.num} className="flex gap-5 rounded-2xl p-4 sm:gap-8 sm:p-5" style={{ background: 'rgba(20,20,20,.34)', border: '1px solid rgba(255,255,255,.08)' }}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 sm:h-14 sm:w-14" style={{ fontFamily: 'var(--font-display)', background: 'var(--color-neon)', color: '#ffffff', fontSize: '0.85rem' }}>
                    {s.num}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-xl mb-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}>{s.title}</h3>
                  <p style={{ color: 'var(--color-muted)' }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FORM */}
      <section ref={formRef} className="site-section relative order-1 isolate overflow-hidden px-6 pb-3 pt-6 sm:py-24">
        <div className="relative mx-auto max-w-lg rounded-[2rem] p-px" style={{ background: 'var(--color-border)' }}>
        <div className="rounded-[calc(2rem-1px)] px-5 py-10 sm:px-9 sm:py-12" style={{ background: 'var(--color-surface)' }}>
          <h2 className="mb-3 text-center text-lg font-semibold uppercase tracking-widest" style={{ color: 'var(--color-neon)' }}>{t.formTitle}</h2>
          <p className="mb-3 whitespace-nowrap text-center text-[1.25rem] font-semibold tracking-[-0.04em] sm:text-[2.2rem]" style={{ fontFamily: 'var(--font-display)' }}>{t.formHeading}</p>
          <p className="mb-8 whitespace-nowrap text-center text-[10px] tracking-[-0.03em] sm:text-sm sm:tracking-normal" style={{ color: 'var(--color-muted)' }}>{t.formHint}</p>

          {sent ? (
            <div className="text-center p-12 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div className="text-5xl mb-4">✅</div>
              <p className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{t.successTitle}</p>
              <p style={{ color: 'var(--color-muted)' }}>{t.successSub}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>{t.roleLabel}</p>
                <div className="grid grid-cols-2 gap-2">
                  {(['taxi', 'courier'] as const).map(role => (
                    <button
                      key={role}
                      type="button"
                      aria-pressed={form.role === role}
                      onClick={() => { setForm(f => ({ ...f, role, platform: '' })); setSubmitError('') }}
                      className="rounded-lg px-3 py-3 text-sm font-bold"
                      style={{ background: form.role === role ? 'var(--color-neon)' : 'var(--color-bg)', color: form.role === role ? '#ffffff' : 'var(--color-text)', border: '1px solid var(--color-border)' }}
                    >
                      {role === 'taxi' ? t.roleTaxi : t.roleCourier}
                    </button>
                  ))}
                </div>
              </div>

              {form.role && (
                <div className="flex flex-col gap-2 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>{t.platformLabel}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(form.role === 'courier' ? ['Bolt', 'Uber', 'Glovo', 'Pyszne.pl'] : ['Bolt', 'Uber']).map(platform => (
                      <button
                        key={platform}
                        type="button"
                        aria-pressed={form.platform === platform}
                        onClick={() => { setForm(f => ({ ...f, platform })); setSubmitError('') }}
                        className="rounded-lg px-3 py-3 text-sm font-bold"
                        style={{ background: form.platform === platform ? 'var(--color-neon)' : 'var(--color-bg)', color: form.platform === platform ? '#ffffff' : 'var(--color-text)', border: '1px solid var(--color-border)' }}
                      >
                        {platformLabels[platform as keyof typeof platformLabels]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {t.fields.map(({ key, label, placeholder, type }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>{label}</label>
                  <div className="relative">
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      inputMode={key === 'phone' ? 'tel' : undefined}
                      pattern={key === 'phone' ? '[0-9+() -]+' : undefined}
                      onChange={e => setForm(f => ({ ...f, [key]: key === 'phone' ? e.target.value.replace(/[^0-9+() -]/g, '') : e.target.value }))}
                      className="w-full rounded-xl px-5 py-3.5 text-sm outline-none"
                      style={{
                        background: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--color-neon)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                    />
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-2 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}>
                <label className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>{t.messengerLabel}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['WhatsApp', 'Telegram', 'Viber'].map(messenger => (
                    <button key={messenger} type="button" onClick={() => setForm(f => ({ ...f, messenger }))} className="rounded-lg px-2 py-2 text-xs font-bold" style={{ background: form.messenger === messenger ? 'var(--color-neon)' : 'var(--color-bg)', color: form.messenger === messenger ? '#0a0a0a' : 'var(--color-text)', border: '1px solid var(--color-border)' }}>
                      {messenger}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>{t.commentLabel}</label>
                <textarea
                  rows={3}
                  placeholder={t.commentPlaceholder}
                  value={form.comment}
                  onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                  className="w-full px-5 py-3.5 rounded-xl text-sm outline-none resize-none"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-neon)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                />
              </div>

              <button type="submit" disabled={submitting} className="mt-2 w-full py-4 rounded-full font-bold text-lg disabled:cursor-wait disabled:opacity-60" style={{ background: 'var(--color-neon)', color: '#0a0a0a', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', boxShadow: '0 0 40px rgba(255,255,255,0.12)' }}>
                {submitting ? '...' : t.submitCta}
              </button>

              {submitError && <p className="text-center text-sm" role="alert" style={{ color: '#ff8a8a' }}>{submitError}</p>}

              <p className="text-center text-xs" style={{ color: 'var(--color-muted)' }}>{t.privacy}</p>
            </form>
          )}
        </div>
        </div>
      </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 py-8 text-center text-sm" style={{ color: 'var(--color-muted)', borderTop: '1px solid var(--color-border)' }}>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span>ARTEMIDA GROUP</span>
          <span>{t.footer}</span>
        </div>
        <address className="mt-4 not-italic leading-relaxed">
          <div>ul. Gen. Józefa Longina Sowińskiego 46 lok.1c, 40-018 Katowice</div>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a className="hover:text-white" href="mailto:info@artemidagroup.eu">info@artemidagroup.eu</a>
            <a className="hover:text-white" href="tel:+48795657830">+48 795 657 830</a>
          </div>
        </address>
      </footer>

      <style>{`
        input::placeholder, textarea::placeholder { color: #3a3a3a; }
      `}</style>
    </div>
  )
}
