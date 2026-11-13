export type Lang = 'pl' | 'ru' | 'en'

export const LANGS: Lang[] = ['pl', 'ru', 'en']

export type PageKey = 'home' | 'services' | 'production' | 'portfolio' | 'pricing' | 'about' | 'contact'

export const PAGE_PATHS: Record<PageKey, string> = {
  home: '/',
  services: '/uslugi',
  production: '/produkcja',
  portfolio: '/portfolio',
  pricing: '/cennik',
  about: '/o-nas',
  contact: '/kontakt',
}

/* ================================================================== */
/* POLSKI                                                             */
/* ================================================================== */

const pl = {
  langName: 'Polski',
  skip: 'Przejdź do treści',
  nav: { home: 'Start', services: 'Usługi', production: 'Produkcja', portfolio: 'Portfolio', pricing: 'Cennik', about: 'O nas', contact: 'Kontakt', menu: 'Menu', close: 'Zamknij' },
  cta: { contact: 'Skontaktuj się', discuss: 'Porozmawiajmy o projekcie', work: 'Zobacz realizacje', services: 'Wszystkie usługi', pricing: 'Zapytaj o wycenę' },
  titles: {
    home: 'Artemida Group: agencja growth marketingu',
    services: 'Usługi',
    production: 'Produkcja kreatywna',
    portfolio: 'Portfolio',
    pricing: 'Cennik',
    about: 'O nas',
    contact: 'Kontakt',
  },

  home: {
    eyebrow: 'Agencja growth marketingu · Katowice',
    title: 'Twój nowy partner w growth marketingu',
    titleAccent: 'growth marketingu',
    lead: 'Pomagamy markom B2C i e-commerce rosnąć dzięki danym, treściom kreatywnym i marketingowi na każdym etapie ścieżki klienta.',
    servicesLabel: 'Usługi',
    servicesTitle: 'Wszystko, czego Twoja marka potrzebuje do wzrostu',
    servicesLead: 'Zamieniamy cele biznesowe w jasną strategię marketingową, skoordynowane kampanie i mierzalne wyniki.',
    processLabel: 'Jak pracujemy',
    processTitle: 'Od strategii do wyników',
    workLabel: 'Wybrane realizacje',
    workTitle: 'Wyniki, które da się policzyć',
    ctaTitle: 'Opowiedz nam o swoim projekcie',
    ctaLead: 'Odpowiemy w ciągu jednego dnia roboczego i zaproponujemy kolejne kroki.',
  },

  process: [
    { title: 'Audyt i dopasowanie', text: 'Analizujemy wyniki, ekonomię biznesu, grupę docelową i możliwości wzrostu.' },
    { title: 'Strategia i priorytety', text: 'Wybieramy obiecujące kanały i planujemy testy pod Twoje cele i budżet.' },
    { title: 'Zintegrowana realizacja', text: 'Koordynujemy kampanie płatne, produkcję kreatywną i analitykę.' },
    { title: 'Optymalizacja i skalowanie', text: 'Na podstawie wyników poprawiamy efektywność i przesuwamy budżety tam, gdzie działają.' },
  ],

  services: {
    label: 'Usługi',
    title: 'Usługi cyfrowe dla rozwoju Twojego biznesu',
    lead: 'Wybierz jedną usługę albo połącz kilka w jednym planie wzrostu.',
    items: [
      { key: 'paid', short: 'Paid Media', title: 'Paid Media i performance', text: 'Docieramy do właściwych odbiorców dzięki precyzyjnym kampaniom w Google, Meta i TikTok.' },
      { key: 'ux', short: 'UX i UI', title: 'UX/UI i projektowanie produktów', text: 'Intuicyjne interfejsy cyfrowe zaprojektowane wokół potrzeb użytkowników i celów biznesowych.' },
      { key: 'web', short: 'Strony i aplikacje', title: 'Strony internetowe i oprogramowanie', text: 'Szybkie produkty cyfrowe projektowane z myślą o pozyskiwaniu klientów, konwersji i wzroście.' },
      { key: 'seo', short: 'SEO', title: 'Pozycjonowanie (SEO)', text: 'Budujemy trwałą widoczność organiczną i przyciągamy ruch z wyszukiwarki o wysokiej intencji zakupowej.' },
      { key: 'ugc', short: 'UGC i influencerzy', title: 'UGC i influencer marketing', text: 'Treści twórców i kampanie, które budują zaufanie i przynoszą wyniki.' },
      { key: 'production', short: 'Produkcja', title: 'Produkcja kreatywna', text: 'Wideo i grafiki, które przyciągają uwagę, budują zaufanie i prowadzą do mierzalnego działania.' },
    ],
  },

  production: {
    label: 'Produkcja',
    title: 'Produkcja kreatywna',
    lead: 'Wideo i treści wizualne dla Twojej marki i kampanii reklamowych. Od koncepcji reklamy po gotowe pliki: prowadzimy cały proces produkcji.',
    formatsLabel: 'Co produkujemy',
    formats: [
      { title: 'Reklamy wideo performance', text: 'UGC, prezentacje produktów, motion graphics i reklamy wideo na TikTok, Meta i YouTube.' },
      { title: 'Grafiki statyczne i display', text: 'Banery, karuzele, rendery produktów i grafiki do reklam w social media i programmatic.' },
      { title: 'Filmy wizerunkowe i promocyjne', text: 'Filmy firmowe, historie marki, premiery produktów i filmy wyjaśniające.' },
      { title: 'Postprodukcja i lokalizacja', text: 'Montaż, korekcja barwna, dźwięk, lektor, napisy i adaptacja formatów.' },
    ],
    approachLabel: 'Nasze podejście',
    approachTitle: 'Dlaczego nasze materiały działają',
    approach: [
      { title: 'Najpierw konwersja', text: 'Koncepcje i scenariusze tworzymy wokół grupy docelowej i celów kampanii.' },
      { title: 'Estetyka natywna dla platform', text: 'Dopasowujemy treści do TikToka, Instagrama i YouTube, żeby wspierać zaangażowanie i efektywność kampanii.' },
      { title: 'Produkcja seryjna i skalowanie', text: 'Tworzymy warianty początków, wezwań do działania i wizualizacji do testów A/B.' },
      { title: 'Pełny cykl', text: 'Odpowiadamy za scenariusze, storyboardy, zdjęcia, dobór twórców, montaż i dostarczenie plików.' },
    ],
  },

  portfolio: {
    label: 'Portfolio',
    title: 'Wybrane realizacje',
    lead: 'Kampanie wzrostowe i produkcja wideo dla marek, z którymi pracowaliśmy.',
    campaignsLabel: 'Kampanie wzrostowe',
    campaigns: [
      {
        tag: 'Produkcja wideo · TikTok',
        title: 'Od zera do 2 mln wyświetleń w miesiąc',
        text: 'Uruchomiliśmy konto marki lodów na TikToku z nostalgicznymi krótkimi filmami i wyrazistymi postaciami. Pierwszy film przyniósł ponad 9 000 obserwujących z grupy docelowej.',
        stats: [{ value: '2M', label: 'wyświetleń' }, { value: '+17K', label: 'obserwujących' }, { value: '105K', label: 'polubień' }],
      },
      {
        tag: 'Produkcja wideo · SMM',
        title: '4,2 mln wyświetleń dla kantoru',
        text: 'Stworzyliśmy miesięczną serię na TikToku z wyrazistymi postaciami i twórcą, która zbudowała rozpoznawalność marki kantoru.',
        stats: [{ value: '4,2M', label: 'wyświetleń' }, { value: '+14K', label: 'obserwujących' }, { value: '263K', label: 'polubień' }],
      },
    ],
  },

  pricing: {
    label: 'Cennik',
    title: 'Wybierz rodzaj usługi',
    lead: 'Przejrzyste ceny startowe dla kampanii płatnych. Produkcję i SEO wyceniamy indywidualnie.',
    paidLabel: 'Paid Media',
    channels: 'Google Ads · Meta Ads · TikTok Ads · kampanie omnichannel',
    from: 'od',
    plus: '+ procent od budżetu reklamowego',
    vat: 'Cena końcowa · zw. z VAT',
    who: 'Dla kogo',
    how: 'Jak to działa',
    plans: [
      { title: 'Audyt reklam', price: 169, oneOff: true, who: 'Dla marek, które chcą ocenić efektywność obecnych kampanii.', how: 'Sprawdzamy strukturę kampanii, śledzenie konwersji, wyniki i budżety, a potem wskazujemy, co można poprawić.' },
      { title: 'Plan Starter', price: 179, who: 'Dla mniejszych sklepów, które zaczynają z reklamą płatną i testują pierwszy budżet.', how: 'Stała miesięczna opłata obejmuje jeden kanał i zakres kampanii dopasowany do wielkości konta.' },
      { title: 'Plan Scaling', price: 299, who: 'Dla firm, które przetestowały reklamę płatną i są gotowe zwiększyć skalę i budżet.', how: 'Rozszerzamy testy i optymalizację wraz ze wzrostem budżetu. Ostateczny zakres i cenę ustalamy w ofercie.' },
    ],
    tailoredLabel: 'Oferta indywidualna',
    tailored: [
      { title: 'Produkcja kreatywna', text: 'Od reklam wideo po postprodukcję. Podaj formaty, liczbę materiałów i termin, a przygotujemy wycenę.', needs: ['Formaty treści', 'Liczba materiałów', 'Termin realizacji'] },
      { title: 'Pozycjonowanie (SEO)', text: 'Podaj adres strony, rynki docelowe i cele, a omówimy zakres dopasowany do Twojego biznesu.', needs: ['Adres strony', 'Rynki docelowe', 'Cele wzrostu'] },
    ],
    needsLabel: 'Czego potrzebujemy',
    note: 'Ceny w euro, podane jako ceny „od”. Sprzedawca korzysta ze zwolnienia z VAT na podstawie art. 113 ust. 1 ustawy o VAT, dlatego do podanych kwot nie doliczamy VAT. Ostateczny zakres i wynagrodzenie ustalamy w indywidualnej ofercie. Informacje na stronie nie stanowią oferty w rozumieniu art. 66 Kodeksu cywilnego.',
    help: 'Nie wiesz, co wybrać?',
  },

  about: {
    label: 'O nas',
    title: 'O Artemida Group',
    lead: 'Agencja marketingu cyfrowego założona w 2025 roku przez Artema Vitiuka. Łączymy doświadczenie ze świeżym spojrzeniem.',
    founderName: 'Artem Vitiuk',
    founderRole: 'Założyciel i strateg',
    founderStat: '7+',
    founderStatLabel: 'lat w marketingu',
    founderText: 'Artem ma ponad 7 lat doświadczenia w marketingu. Prowadził kampanie performance, występował na wydarzeniach branżowych w Ukrainie i przeszkolił setki marketerów w ramach własnych programów edukacyjnych.',
    teamText: 'Nasz zespół to specjaliści kreatywni z ciekawością i świeżym spojrzeniem. Pracujemy w różnych branżach, testujemy nowe pomysły i budujemy strategie wzrostu dopasowane do każdego biznesu.',
    valuesLabel: 'Co wnosimy',
    valuesTitle: 'Dlaczego marki z nami współpracują',
    values: [
      { title: 'Strategia na poziomie senior', text: 'Założyciel prowadzi strategię z naciskiem na efektywność reklam, ekonomię biznesu i zachowania konsumentów.' },
      { title: 'Świeże i dynamiczne podejście', text: 'Ambitny zespół, który śledzi zmiany algorytmów, trendy kreatywne i nowe platformy.' },
      { title: 'Szerokie doświadczenie', text: 'Pracujemy z e-commerce, SaaS, Web3 i lokalnymi firmami usługowymi.' },
      { title: 'Decyzje oparte na danych', text: 'Łączymy produkcję na wysokim poziomie i eksperymenty kreatywne z przejrzystym śledzeniem wyników i twardymi wskaźnikami finansowymi.' },
    ],
  },

  contact: {
    label: 'Kontakt',
    title: 'Porozmawiajmy o wzroście',
    lead: 'Opowiedz nam o projekcie i wybierz najwygodniejszy sposób kontaktu.',
    formTitle: 'Opowiedz o swoim projekcie',
    required: 'Pola oznaczone * są wymagane',
    name: 'Imię',
    email: 'Adres e-mail',
    website: 'Strona firmy',
    optional: 'opcjonalnie',
    service: 'Czego dotyczy zapytanie',
    serviceAny: 'Jeszcze nie wiem',
    channel: 'Gdzie mamy odpowiedzieć?',
    channelEmail: 'E-mail',
    handle: 'Nazwa użytkownika lub numer telefonu',
    handleHint: 'Dla Telegrama podaj @nazwę, dla WhatsAppa numer telefonu.',
    message: 'Wiadomość',
    messagePlaceholder: 'Cel, budżet, termin: wszystko, co pomoże nam przygotować odpowiedź',
    submit: 'Wyślij wiadomość',
    sending: 'Wysyłanie…',
    sendError: 'Nie udało się wysłać wiadomości. Napisz do nas bezpośrednio na adres e-mail.',
    gdpr: 'Administratorem danych jest {company}. Przetwarzamy je, aby odpowiedzieć na zapytanie i przygotować ofertę. Szczegóły i Twoje prawa opisuje',
    gdprLink: 'Polityka prywatności',
    successTitle: 'Dziękujemy, wiadomość wysłana',
    successText: 'Odpowiemy w ciągu jednego dnia roboczego.',
    again: 'Wyślij kolejną wiadomość',
    directLabel: 'Wolisz bezpośrednią rozmowę?',
    write: 'Napisz do nas',
    call: 'Zadzwoń',
    visit: 'Biuro',
  },

  footer: {
    contact: 'Kontakt',
    company: 'Dane firmy',
    pages: 'Strony',
    legal: 'Informacje prawne',
    privacy: 'Polityka prywatności',
    cookies: 'Polityka cookies',
    terms: 'Regulamin',
    cookieSettings: 'Ustawienia cookies',
    nip: 'NIP',
    regon: 'REGON',
    krs: 'KRS',
    capital: 'Kapitał zakładowy',
    trademarks: 'Nazwy platform i marek klientów są znakami towarowymi ich właścicieli.',
    rights: 'Wszelkie prawa zastrzeżone.',
  },
  legal: { back: 'Wróć na stronę główną', updated: 'Obowiązuje od', binding: '' },
  notFound: { title: 'Nie ma takiej strony', text: 'Strona mogła zostać przeniesiona lub usunięta.', back: 'Wróć na stronę główną' },
  cookies: {
    title: 'Szanujemy Twoją prywatność',
    text: 'Używamy niezbędnych plików cookies, aby strona działała. Za Twoją zgodą możemy też użyć cookies analitycznych i marketingowych. Zgodę możesz w każdej chwili zmienić w stopce strony.',
    more: 'Polityka cookies',
    accept: 'Akceptuję wszystkie',
    reject: 'Odrzucam opcjonalne',
    settings: 'Ustawienia',
    save: 'Zapisz wybór',
    settingsTitle: 'Ustawienia cookies',
    always: 'Zawsze aktywne',
    categories: {
      necessary: { title: 'Niezbędne', text: 'Zapamiętują Twój wybór dotyczący cookies i języka. Bez nich strona nie działa poprawnie.' },
      analytics: { title: 'Analityczne', text: 'Anonimowe statystyki odwiedzin (Google Analytics), które pomagają nam ulepszać stronę.' },
      marketing: { title: 'Marketingowe', text: 'Pomiar skuteczności reklam (Meta Pixel). Dzięki nim pokazujemy ogłoszenia osobom, dla których mogą być przydatne.' },
    },
    close: 'Zamknij',
  },
}

export type Dictionary = typeof pl

/* ================================================================== */
/* РУССКИЙ                                                            */
/* ================================================================== */

const ru: Dictionary = {
  langName: 'Русский',
  skip: 'Перейти к содержанию',
  nav: { home: 'Главная', services: 'Услуги', production: 'Продакшн', portfolio: 'Портфолио', pricing: 'Цены', about: 'О нас', contact: 'Контакты', menu: 'Меню', close: 'Закрыть' },
  cta: { contact: 'Связаться', discuss: 'Обсудить проект', work: 'Смотреть кейсы', services: 'Все услуги', pricing: 'Запросить стоимость' },
  titles: {
    home: 'Artemida Group: агентство growth-маркетинга',
    services: 'Услуги',
    production: 'Креативный продакшн',
    portfolio: 'Портфолио',
    pricing: 'Цены',
    about: 'О нас',
    contact: 'Контакты',
  },

  home: {
    eyebrow: 'Агентство growth-маркетинга · Катовице',
    title: 'Ваш новый партнёр в growth-маркетинге',
    titleAccent: 'growth-маркетинге',
    lead: 'Помогаем B2C и e-commerce брендам расти с помощью данных, креативного контента и маркетинга на всём пути клиента.',
    servicesLabel: 'Услуги',
    servicesTitle: 'Всё, что нужно вашему бренду для роста',
    servicesLead: 'Превращаем бизнес-цели в понятную маркетинговую стратегию, согласованные кампании и измеримые результаты.',
    processLabel: 'Как мы работаем',
    processTitle: 'От стратегии к результатам',
    workLabel: 'Избранные кейсы',
    workTitle: 'Результаты, которые можно посчитать',
    ctaTitle: 'Расскажите о своём проекте',
    ctaLead: 'Ответим в течение одного рабочего дня и предложим следующие шаги.',
  },

  process: [
    { title: 'Аудит и погружение', text: 'Изучаем результаты, экономику бизнеса, аудиторию и точки роста.' },
    { title: 'Стратегия и приоритеты', text: 'Выбираем перспективные каналы и планируем тесты под ваши цели и бюджет.' },
    { title: 'Комплексная реализация', text: 'Координируем рекламные кампании, креативный продакшн и аналитику.' },
    { title: 'Оптимизация и масштабирование', text: 'По результатам кампаний повышаем эффективность и перераспределяем бюджеты.' },
  ],

  services: {
    label: 'Услуги',
    title: 'Цифровые услуги для роста вашего бизнеса',
    lead: 'Выберите одну услугу или объедините несколько в одном плане роста.',
    items: [
      { key: 'paid', short: 'Paid Media', title: 'Paid Media и performance', text: 'Находим нужную аудиторию с помощью точных кампаний в Google, Meta и TikTok.' },
      { key: 'ux', short: 'UX и UI', title: 'UX/UI и продуктовый дизайн', text: 'Понятные цифровые интерфейсы, построенные вокруг потребностей пользователей и целей бизнеса.' },
      { key: 'web', short: 'Сайты и разработка', title: 'Сайты и разработка ПО', text: 'Быстрые цифровые продукты, созданные для привлечения клиентов, конверсии и роста.' },
      { key: 'seo', short: 'SEO', title: 'Поисковая оптимизация (SEO)', text: 'Создаём устойчивую органическую видимость и привлекаем поисковый трафик с высоким намерением купить.' },
      { key: 'ugc', short: 'UGC и инфлюенсеры', title: 'UGC и инфлюенс-маркетинг', text: 'Контент от авторов и кампании, которые вызывают доверие и приносят результат.' },
      { key: 'production', short: 'Продакшн', title: 'Креативный продакшн', text: 'Видео и визуал, которые привлекают внимание, вызывают доверие и ведут к измеримому действию.' },
    ],
  },

  production: {
    label: 'Продакшн',
    title: 'Креативный продакшн',
    lead: 'Видео и визуальный контент для вашего бренда и рекламных кампаний. От рекламной идеи до готовых файлов: ведём весь процесс производства.',
    formatsLabel: 'Что мы производим',
    formats: [
      { title: 'Performance-видеореклама', text: 'UGC, демонстрации продукта, моушн-графика и видеореклама для TikTok, Meta и YouTube.' },
      { title: 'Статика и баннеры', text: 'Баннеры, карусели, рендеры продуктов и графика для рекламы в соцсетях и programmatic.' },
      { title: 'Имиджевые и промо-ролики', text: 'Корпоративные фильмы, истории бренда, запуски продуктов и объясняющие видео.' },
      { title: 'Постпродакшн и локализация', text: 'Монтаж, цветокоррекция, звук, озвучка, субтитры и адаптация форматов.' },
    ],
    approachLabel: 'Наш подход',
    approachTitle: 'Почему наши материалы работают',
    approach: [
      { title: 'Сначала конверсия', text: 'Идеи и сценарии строим вокруг аудитории и целей кампании.' },
      { title: 'Нативная эстетика платформ', text: 'Адаптируем контент под TikTok, Instagram и YouTube, чтобы поддерживать вовлечённость и эффективность.' },
      { title: 'Серийное производство', text: 'Делаем варианты начала, призывов к действию и визуала для A/B-тестов.' },
      { title: 'Полный цикл', text: 'Берём на себя сценарии, раскадровки, съёмку, подбор авторов, монтаж и сдачу файлов.' },
    ],
  },

  portfolio: {
    label: 'Портфолио',
    title: 'Избранные работы',
    lead: 'Кампании роста и видеопродакшн для брендов, с которыми мы работали.',
    campaignsLabel: 'Кампании роста',
    campaigns: [
      {
        tag: 'Видеопродакшн · TikTok',
        title: 'С нуля до 2 млн просмотров за месяц',
        text: 'Запустили TikTok-аккаунт бренда мороженого с ностальгическими короткими видео и запоминающимися персонажами. Первое видео принесло более 9 000 подписчиков из целевой аудитории.',
        stats: [{ value: '2M', label: 'просмотров' }, { value: '+17K', label: 'подписчиков' }, { value: '105K', label: 'лайков' }],
      },
      {
        tag: 'Видеопродакшн · SMM',
        title: '4,2 млн просмотров для обменника валют',
        text: 'Сделали месячную серию в TikTok с запоминающимися персонажами и автором, чтобы построить узнаваемость бренда обменника.',
        stats: [{ value: '4,2M', label: 'просмотров' }, { value: '+14K', label: 'подписчиков' }, { value: '263K', label: 'лайков' }],
      },
    ],
  },

  pricing: {
    label: 'Цены',
    title: 'Выберите тип услуги',
    lead: 'Прозрачные стартовые цены на рекламные кампании. Продакшн и SEO оцениваем индивидуально.',
    paidLabel: 'Paid Media',
    channels: 'Google Ads · Meta Ads · TikTok Ads · омниканальные кампании',
    from: 'от',
    plus: '+ процент от рекламного бюджета',
    vat: 'Итоговая цена · без НДС (освобождение)',
    who: 'Для кого',
    how: 'Как это работает',
    plans: [
      { title: 'Аудит рекламы', price: 169, oneOff: true, who: 'Для брендов, которые хотят оценить эффективность текущих кампаний.', how: 'Проверяем структуру кампаний, отслеживание конверсий, результаты и бюджеты, затем показываем, что можно улучшить.' },
      { title: 'План Starter', price: 179, who: 'Для небольших магазинов, которые начинают с платной рекламы и тестируют первый бюджет.', how: 'Фиксированная ежемесячная оплата покрывает один канал и объём кампаний под размер аккаунта.' },
      { title: 'План Scaling', price: 299, who: 'Для компаний, которые уже протестировали рекламу и готовы увеличить масштаб и бюджет.', how: 'Расширяем тесты и оптимизацию по мере роста бюджета. Итоговый объём и стоимость фиксируем в предложении.' },
    ],
    tailoredLabel: 'Индивидуальное предложение',
    tailored: [
      { title: 'Креативный продакшн', text: 'От видеорекламы до постпродакшна. Укажите форматы, количество материалов и сроки, и мы подготовим смету.', needs: ['Форматы контента', 'Количество материалов', 'Сроки'] },
      { title: 'Поисковая оптимизация (SEO)', text: 'Пришлите адрес сайта, целевые рынки и цели, и мы обсудим подходящий объём работ.', needs: ['Адрес сайта', 'Целевые рынки', 'Цели роста'] },
    ],
    needsLabel: 'Что нам нужно знать',
    note: 'Цены в евро, указаны как цены «от». Продавец освобождён от НДС (VAT) на основании ст. 113 п. 1 польского закона о НДС, поэтому НДС к указанным суммам не добавляется. Итоговый объём и стоимость фиксируются в индивидуальном предложении. Информация на сайте не является офертой в смысле ст. 66 Гражданского кодекса Польши.',
    help: 'Не знаете, что выбрать?',
  },

  about: {
    label: 'О нас',
    title: 'Об Artemida Group',
    lead: 'Агентство цифрового маркетинга, основанное в 2025 году Артёмом Витюком. Сочетаем опыт и свежий взгляд.',
    founderName: 'Артём Витюк',
    founderRole: 'Основатель и стратег',
    founderStat: '7+',
    founderStatLabel: 'лет в маркетинге',
    founderText: 'У Артёма более 7 лет опыта в маркетинге. Он руководил performance-кампаниями, выступал на отраслевых мероприятиях в Украине и обучил сотни маркетологов на собственных образовательных программах.',
    teamText: 'Наша команда объединяет креативных специалистов с любопытством и свежим взглядом. Мы работаем в разных отраслях, тестируем новые идеи и строим стратегии роста под каждый бизнес.',
    valuesLabel: 'Что мы даём',
    valuesTitle: 'Почему бренды выбирают нас',
    values: [
      { title: 'Стратегия уровня senior', text: 'Основатель ведёт стратегию с фокусом на эффективность рекламы, экономику бизнеса и поведение потребителей.' },
      { title: 'Свежий и динамичный подход', text: 'Амбициозная команда, которая следит за алгоритмами, креативными трендами и новыми платформами.' },
      { title: 'Широкий опыт', text: 'Работаем с e-commerce, SaaS, Web3 и локальным сервисным бизнесом.' },
      { title: 'Решения на основе данных', text: 'Сочетаем качественный продакшн и креативные эксперименты с прозрачной аналитикой и строгими финансовыми метриками.' },
    ],
  },

  contact: {
    label: 'Контакты',
    title: 'Давайте поговорим о росте',
    lead: 'Расскажите о проекте и выберите удобный способ связи.',
    formTitle: 'Расскажите о своём проекте',
    required: 'Поля, отмеченные *, обязательны',
    name: 'Имя',
    email: 'E-mail',
    website: 'Сайт компании',
    optional: 'необязательно',
    service: 'Тема запроса',
    serviceAny: 'Пока не знаю',
    channel: 'Куда вам ответить?',
    channelEmail: 'E-mail',
    handle: 'Имя пользователя или номер телефона',
    handleHint: 'Для Telegram укажите @username, для WhatsApp номер телефона.',
    message: 'Сообщение',
    messagePlaceholder: 'Цель, бюджет, сроки: всё, что поможет нам подготовить ответ',
    submit: 'Отправить сообщение',
    sending: 'Отправка…',
    sendError: 'Не удалось отправить сообщение. Напишите нам напрямую на e-mail.',
    gdpr: 'Администратор данных: {company}. Мы обрабатываем их, чтобы ответить на запрос и подготовить предложение. Подробности и ваши права описаны в документе',
    gdprLink: 'Политика конфиденциальности',
    successTitle: 'Спасибо, сообщение отправлено',
    successText: 'Мы ответим в течение одного рабочего дня.',
    again: 'Отправить ещё одно сообщение',
    directLabel: 'Предпочитаете поговорить напрямую?',
    write: 'Напишите нам',
    call: 'Позвоните',
    visit: 'Офис',
  },

  footer: {
    contact: 'Контакты',
    company: 'Данные компании',
    pages: 'Страницы',
    legal: 'Правовая информация',
    privacy: 'Политика конфиденциальности',
    cookies: 'Политика cookies',
    terms: 'Регламент',
    cookieSettings: 'Настройки cookies',
    nip: 'NIP',
    regon: 'REGON',
    krs: 'KRS',
    capital: 'Уставный капитал',
    trademarks: 'Названия платформ и брендов клиентов являются товарными знаками их владельцев.',
    rights: 'Все права защищены.',
  },
  legal: { back: 'На главную', updated: 'Действует с', binding: 'Это перевод для удобства. Юридически обязательной является польская версия документа.' },
  notFound: { title: 'Такой страницы нет', text: 'Возможно, страница была перемещена или удалена.', back: 'На главную' },
  cookies: {
    title: 'Мы уважаем вашу приватность',
    text: 'Мы используем необходимые cookies, чтобы сайт работал. С вашего согласия можем также использовать аналитические и маркетинговые cookies. Согласие можно изменить в любой момент в подвале сайта.',
    more: 'Политика cookies',
    accept: 'Принять все',
    reject: 'Отклонить необязательные',
    settings: 'Настройки',
    save: 'Сохранить выбор',
    settingsTitle: 'Настройки cookies',
    always: 'Всегда активны',
    categories: {
      necessary: { title: 'Необходимые', text: 'Запоминают ваш выбор по cookies и языку. Без них сайт не работает корректно.' },
      analytics: { title: 'Аналитические', text: 'Анонимная статистика посещений (Google Analytics), которая помогает улучшать сайт.' },
      marketing: { title: 'Маркетинговые', text: 'Измерение эффективности рекламы (Meta Pixel), чтобы показывать объявления тем, кому они полезны.' },
    },
    close: 'Закрыть',
  },
}

/* ================================================================== */
/* ENGLISH                                                            */
/* ================================================================== */

const en: Dictionary = {
  langName: 'English',
  skip: 'Skip to content',
  nav: { home: 'Home', services: 'Services', production: 'Production', portfolio: 'Portfolio', pricing: 'Pricing', about: 'About us', contact: 'Contact', menu: 'Menu', close: 'Close' },
  cta: { contact: 'Contact us', discuss: 'Discuss your project', work: 'Explore our work', services: 'All services', pricing: 'Request pricing' },
  titles: {
    home: 'Artemida Group: growth marketing agency',
    services: 'Services',
    production: 'Creative production',
    portfolio: 'Portfolio',
    pricing: 'Pricing',
    about: 'About us',
    contact: 'Contact',
  },

  home: {
    eyebrow: 'Growth marketing agency · Katowice',
    title: 'Your new growth marketing partner',
    titleAccent: 'growth marketing',
    lead: 'We help B2C and e-commerce brands grow through data, creative content and marketing across the customer journey.',
    servicesLabel: 'Services',
    servicesTitle: 'Everything your brand needs to grow',
    servicesLead: 'We turn business goals into a clear marketing strategy, coordinated campaigns and measurable results.',
    processLabel: 'How we work',
    processTitle: 'From strategy to results',
    workLabel: 'Selected work',
    workTitle: 'Results you can count',
    ctaTitle: 'Tell us about your project',
    ctaLead: 'We reply within one business day and suggest the next steps.',
  },

  process: [
    { title: 'Audit & alignment', text: 'We review your results, business economics, audience and growth opportunities.' },
    { title: 'Strategy & prioritisation', text: 'We choose promising channels and plan tests around your goals and budget.' },
    { title: 'Integrated execution', text: 'We coordinate paid campaigns, creative production and analytics.' },
    { title: 'Optimisation & scaling', text: 'We use campaign results to improve performance and allocate budgets.' },
  ],

  services: {
    label: 'Services',
    title: 'Digital services for your business growth',
    lead: 'Choose a service or combine several in one growth plan.',
    items: [
      { key: 'paid', short: 'Paid Media', title: 'Paid Media & performance acquisition', text: 'Reach the right audience with focused Google, Meta and TikTok campaigns.' },
      { key: 'ux', short: 'UX & UI', title: 'UI/UX & product design', text: 'Intuitive digital interfaces built around user needs and business goals.' },
      { key: 'web', short: 'Web development', title: 'Web & software development', text: 'Fast digital products designed for acquisition, conversion and growth.' },
      { key: 'seo', short: 'SEO', title: 'Search engine optimisation (SEO)', text: 'Build lasting organic visibility and attract high-intent search traffic.' },
      { key: 'ugc', short: 'UGC & influencers', title: 'UGC & influencer marketing', text: 'Creator content and campaigns that build trust and drive results.' },
      { key: 'production', short: 'Production', title: 'Creative production', text: 'Video and visual assets built for attention, trust and measurable action.' },
    ],
  },

  production: {
    label: 'Production',
    title: 'Creative production',
    lead: 'Video and visual content for your brand and advertising campaigns. From ad concepts to finished files, we manage the full production process.',
    formatsLabel: 'What we produce',
    formats: [
      { title: 'Performance video ads', text: 'UGC, product demonstrations, motion graphics and video ads for TikTok, Meta and YouTube.' },
      { title: 'Static & display assets', text: 'Banners, carousels, product renders and graphics for social and programmatic advertising.' },
      { title: 'Brand & promotional videos', text: 'Corporate films, brand stories, product launches and explainer videos.' },
      { title: 'Post-production & localisation', text: 'Editing, colour grading, sound, voiceovers, subtitles and format adaptation.' },
    ],
    approachLabel: 'Our approach',
    approachTitle: 'Why our assets perform',
    approach: [
      { title: 'Conversion-first mindset', text: 'We develop concepts and scripts around your audience and campaign goals.' },
      { title: 'Platform-native aesthetics', text: 'We adapt content to TikTok, Instagram and YouTube to support engagement and campaign efficiency.' },
      { title: 'Batch production & scaling', text: 'We create variations of openings, calls to action and visuals for A/B testing.' },
      { title: 'Full-cycle execution', text: 'We handle scripts, storyboards, filming, creator selection, editing and delivery.' },
    ],
  },

  portfolio: {
    label: 'Portfolio',
    title: 'Selected work',
    lead: 'Growth campaigns and video production for the brands we work with.',
    campaignsLabel: 'Growth campaigns',
    campaigns: [
      {
        tag: 'Video production · TikTok',
        title: 'From zero to 2M views in a month',
        text: 'We launched an ice cream brand’s TikTok account with nostalgic short videos and distinctive characters. The first video attracted over 9,000 followers from the target audience.',
        stats: [{ value: '2M', label: 'views' }, { value: '+17K', label: 'followers' }, { value: '105K', label: 'likes' }],
      },
      {
        tag: 'Video production · SMM',
        title: '4.2M views for a currency exchange brand',
        text: 'We created a month-long TikTok series featuring distinctive characters and a creator to build recognition for a currency exchange brand.',
        stats: [{ value: '4.2M', label: 'views' }, { value: '+14K', label: 'followers' }, { value: '263K', label: 'likes' }],
      },
    ],
  },

  pricing: {
    label: 'Pricing',
    title: 'Choose the type of service',
    lead: 'Transparent starting prices for paid campaigns. Production and SEO are quoted individually.',
    paidLabel: 'Paid Media',
    channels: 'Google Ads · Meta Ads · TikTok Ads · omnichannel campaigns',
    from: 'from',
    plus: '+ a percentage of ad spend',
    vat: 'Final price · VAT-exempt',
    who: 'Who is it for',
    how: 'How it works',
    plans: [
      { title: 'Ads audit', price: 169, oneOff: true, who: 'For brands that want to assess the performance of their existing campaigns.', how: 'We review campaign structure, conversion tracking, results and budgets, then identify what can be improved.' },
      { title: 'Starter plan', price: 179, who: 'For smaller e-commerce brands starting with paid advertising and testing an initial budget.', how: 'A predictable monthly fee covers one channel and a campaign scope suited to the size of the account.' },
      { title: 'Scaling plan', price: 299, who: 'For businesses that have tested paid advertising and are ready to increase activity and budget.', how: 'We expand testing and optimisation as your budget grows. The final scope and fee are agreed in our proposal.' },
    ],
    tailoredLabel: 'Tailored proposal',
    tailored: [
      { title: 'Creative production', text: 'From video ads to post-production. Share the formats, number of assets and timeline for a tailored quote.', needs: ['Content formats', 'Number of assets', 'Delivery timeline'] },
      { title: 'Search engine optimisation', text: 'Share your website, target markets and goals to discuss the right scope for your business.', needs: ['Your website', 'Target markets', 'Growth goals'] },
    ],
    needsLabel: 'What we need to know',
    note: 'Prices in euro, shown as “from” prices. The seller is exempt from VAT under Article 113(1) of the Polish VAT Act, so no VAT is added to the amounts shown. The final scope and fee are set in an individual proposal. Information on this site is not an offer within the meaning of Article 66 of the Polish Civil Code.',
    help: 'Need help choosing?',
  },

  about: {
    label: 'About us',
    title: 'About Artemida Group',
    lead: 'A digital marketing agency founded in 2025 by Artem Vitiuk, combining experience with fresh ideas.',
    founderName: 'Artem Vitiuk',
    founderRole: 'Founder & strategist',
    founderStat: '7+',
    founderStatLabel: 'years in marketing',
    founderText: 'Artem has over 7 years of marketing experience. He has led performance campaigns, spoken at industry events in Ukraine and trained hundreds of marketers through his own educational programmes.',
    teamText: 'Our team brings together creative specialists with curiosity and a fresh perspective. We work across industries, test new ideas and build growth strategies around each business.',
    valuesLabel: 'What we bring',
    valuesTitle: 'Why brands partner with us',
    values: [
      { title: 'Senior strategic direction', text: 'Our founder guides strategy with a focus on advertising performance, business economics and consumer behaviour.' },
      { title: 'Fresh & dynamic mindset', text: 'An ambitious team that stays ahead of algorithms, creative trends and emerging platforms.' },
      { title: 'Full-spectrum curiosity', text: 'We work with e-commerce, SaaS, Web3 and local service businesses.' },
      { title: 'Data-first execution', text: 'We combine high-end production and creative experimentation with transparent tracking and strict financial metrics.' },
    ],
  },

  contact: {
    label: 'Contact',
    title: 'Let’s talk growth',
    lead: 'Tell us about your project and choose the easiest way to get in touch.',
    formTitle: 'Tell us about your project',
    required: 'Fields marked * are required',
    name: 'Name',
    email: 'Email address',
    website: 'Company website',
    optional: 'optional',
    service: 'What is it about',
    serviceAny: 'Not sure yet',
    channel: 'Where should we reply?',
    channelEmail: 'Email',
    handle: 'Username or phone number',
    handleHint: 'For Telegram enter your @username, for WhatsApp your phone number.',
    message: 'Message',
    messagePlaceholder: 'Goal, budget, timeline: anything that helps us prepare a reply',
    submit: 'Send message',
    sending: 'Sending…',
    sendError: 'We could not send your message. Please email us directly.',
    gdpr: 'The data controller is {company}. We process your data to reply to your enquiry and prepare a proposal. Details and your rights are in our',
    gdprLink: 'Privacy Policy',
    successTitle: 'Thank you, message sent',
    successText: 'We will reply within one business day.',
    again: 'Send another message',
    directLabel: 'Prefer a direct conversation?',
    write: 'Drop us a line',
    call: 'Give us a call',
    visit: 'Office',
  },

  footer: {
    contact: 'Contact',
    company: 'Company details',
    pages: 'Pages',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    terms: 'Terms of Service',
    cookieSettings: 'Cookie settings',
    nip: 'NIP (Tax ID)',
    regon: 'REGON',
    krs: 'KRS',
    capital: 'Share capital',
    trademarks: 'Platform and client brand names are trademarks of their respective owners.',
    rights: 'All rights reserved.',
  },
  legal: { back: 'Back to home page', updated: 'Effective from', binding: 'This translation is provided for convenience. The Polish version of this document is legally binding.' },
  notFound: { title: 'Page not found', text: 'The page may have been moved or deleted.', back: 'Back to home page' },
  cookies: {
    title: 'We respect your privacy',
    text: 'We use essential cookies to make the site work. With your consent we may also use analytics and marketing cookies. You can change your choice at any time in the site footer.',
    more: 'Cookie Policy',
    accept: 'Accept all',
    reject: 'Reject optional',
    settings: 'Settings',
    save: 'Save choice',
    settingsTitle: 'Cookie settings',
    always: 'Always active',
    categories: {
      necessary: { title: 'Essential', text: 'Remember your cookie and language choices. The site does not work properly without them.' },
      analytics: { title: 'Analytics', text: 'Anonymous visit statistics (Google Analytics) that help us improve the site.' },
      marketing: { title: 'Marketing', text: 'Ad performance measurement (Meta Pixel), so we can show ads to people who may find them useful.' },
    },
    close: 'Close',
  },
}

export const DICT: Record<Lang, Dictionary> = { pl, ru, en }

const LANG_KEY = 'artemida_lang'

export function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null
    if (saved && LANGS.includes(saved)) return saved
  } catch {
    /* ignore */
  }
  // Polski zawsze jako język domyślny (także dla robotów wyszukiwarek); inne języki tylko z przełącznika.
  return 'pl'
}

export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    /* ignore */
  }
}
