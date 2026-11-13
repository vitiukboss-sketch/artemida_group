import type { Lang } from './i18n'

/** Strony usług pod konkretne zapytania w wyszukiwarce (Meta Ads, Google Ads, TikTok Ads). */
export type LandingSlug = 'meta' | 'google' | 'tiktok'

export const LANDING_PATHS: Record<LandingSlug, string> = {
  meta: '/reklama-facebook-instagram',
  google: '/kampanie-google-ads',
  tiktok: '/reklama-tiktok',
}

export type Landing = {
  short: string
  label: string
  title: string
  lead: string
  whatLabel: string
  whatTitle: string
  what: { title: string; text: string }[]
  forLabel: string
  forTitle: string
  forList: string[]
  priceLabel: string
  priceTitle: string
  priceText: string
  faqLabel: string
  faq: { q: string; a: string }[]
}

const pl: Record<LandingSlug, Landing> = {
  meta: {
    short: 'Reklama na Facebooku i Instagramie',
    label: 'Meta Ads · Katowice',
    title: 'Reklama na Facebooku i Instagramie',
    lead: 'Prowadzimy kampanie Meta Ads z precyzyjnym targetowaniem: od strategii i kreacji po optymalizację budżetu. Działamy z Katowic dla firm z całej Polski.',
    whatLabel: 'Co robimy',
    whatTitle: 'Kampanie Meta Ads od A do Z',
    what: [
      { title: 'Strategia i targetowanie', text: 'Dobieramy grupy odbiorców: zainteresowania, grupy podobnych odbiorców (lookalike), remarketing i własne listy klientów.' },
      { title: 'Konfiguracja i analityka', text: 'Ustawiamy Menedżera reklam, Piksel Meta i Conversions API, żeby każda konwersja była mierzona.' },
      { title: 'Kreacje reklamowe', text: 'Przygotowujemy wideo, rolki, karuzele i grafiki dopasowane do Facebooka i Instagrama.' },
      { title: 'Optymalizacja i raporty', text: 'Testujemy kreacje i grupy odbiorców, przesuwamy budżet tam, gdzie działa, i raportujemy wyniki w prosty sposób.' },
    ],
    forLabel: 'Dla kogo',
    forTitle: 'Komu pomagamy reklamą na Facebooku',
    forList: [
      'Sklepom internetowym, które chcą zwiększyć sprzedaż i zwrot z wydatków na reklamę.',
      'Lokalnym firmom usługowym, które szukają klientów w swoim mieście.',
      'Markom, które wprowadzają nowy produkt i potrzebują zasięgu.',
      'Firmom, którym dotychczasowe kampanie nie przynosiły wyników.',
    ],
    priceLabel: 'Cena',
    priceTitle: 'Prowadzenie kampanii Meta Ads od 179 € miesięcznie',
    priceText: 'Do opłaty stałej doliczamy procent od budżetu reklamowego. Audyt istniejącego konta reklamowego kosztuje od 169 €. Ostateczną cenę ustalamy w indywidualnej ofercie.',
    faqLabel: 'Najczęstsze pytania',
    faq: [
      { q: 'Jaki budżet na reklamę na Facebooku jest potrzebny na start?', a: 'Zależy to od branży i celu, ale na pierwsze testy zwykle wystarcza kilkadziesiąt złotych dziennie. Budżet reklamowy płacisz bezpośrednio Meta, a my dobieramy go do Twoich celów.' },
      { q: 'Po jakim czasie widać efekty kampanii Meta Ads?', a: 'Pierwsze dane mamy po kilku dniach. Stabilne wyniki pojawiają się zwykle po 2–4 tygodniach testów i optymalizacji.' },
      { q: 'Czy przygotujecie też kreacje reklamowe?', a: 'Tak. Mamy własną produkcję wideo i grafik, więc kreacje powstają pod konkretną kampanię i są testowane w kilku wersjach.' },
      { q: 'Czy muszę podpisywać długą umowę?', a: 'Nie. Zakres i okres współpracy ustalamy w indywidualnej ofercie, dopasowanej do Twoich potrzeb.' },
    ],
  },
  google: {
    short: 'Kampanie Google Ads',
    label: 'Google Ads · Katowice',
    title: 'Kampanie Google Ads',
    lead: 'Docieramy do klientów w momencie, gdy szukają Twoich usług lub produktów. Prowadzimy kampanie w wyszukiwarce, Performance Max, YouTube i Google Shopping.',
    whatLabel: 'Co robimy',
    whatTitle: 'Reklama w Google, która przynosi zapytania',
    what: [
      { title: 'Kampanie w wyszukiwarce', text: 'Dobieramy słowa kluczowe o wysokiej intencji zakupowej, piszemy reklamy i wykluczamy zapytania, które marnują budżet.' },
      { title: 'Performance Max i Shopping', text: 'Dla sklepów internetowych konfigurujemy Merchant Center, kampanie produktowe i Performance Max.' },
      { title: 'YouTube i sieć reklamowa', text: 'Budujemy rozpoznawalność i remarketing na YouTube i w sieci reklamowej Google.' },
      { title: 'Pomiar konwersji', text: 'Wdrażamy Google Analytics 4 i śledzenie konwersji, żeby było jasne, które reklamy przynoszą sprzedaż.' },
    ],
    forLabel: 'Dla kogo',
    forTitle: 'Komu pomagamy kampaniami Google Ads',
    forList: [
      'Firmom usługowym, do których klienci trafiają przez wyszukiwarkę.',
      'Sklepom internetowym, które chcą sprzedawać przez Google Shopping.',
      'Firmom B2B, które szukają zapytań ofertowych.',
      'Firmom, które płacą za kliknięcia, ale nie widzą z nich klientów.',
    ],
    priceLabel: 'Cena',
    priceTitle: 'Prowadzenie kampanii Google Ads od 179 € miesięcznie',
    priceText: 'Do opłaty stałej doliczamy procent od budżetu reklamowego. Audyt istniejącego konta Google Ads kosztuje od 169 €. Ostateczną cenę ustalamy w indywidualnej ofercie.',
    faqLabel: 'Najczęstsze pytania',
    faq: [
      { q: 'Ile kosztuje kliknięcie w Google Ads?', a: 'Koszt kliknięcia zależy od branży i konkurencji: od kilkudziesięciu groszy do kilkunastu złotych. W audycie szacujemy koszty dla Twoich słów kluczowych.' },
      { q: 'Czym różni się Google Ads od SEO?', a: 'Google Ads daje ruch od pierwszego dnia, ale płacisz za każde kliknięcie. SEO buduje ruch organiczny dłużej, za to bez opłat za kliknięcia. Najlepiej działają razem.' },
      { q: 'Czy przejmiecie istniejące konto Google Ads?', a: 'Tak. Zaczynamy od audytu konta, a potem poprawiamy strukturę, słowa kluczowe i pomiar konwersji.' },
      { q: 'Kto jest właścicielem konta reklamowego?', a: 'Ty. Konto i dane zostają przy Tobie, a my pracujemy na nadanym nam dostępie.' },
    ],
  },
  tiktok: {
    short: 'Reklama na TikToku',
    label: 'TikTok Ads · Katowice',
    title: 'Reklama na TikToku',
    lead: 'Łączymy kampanie TikTok Ads z produkcją krótkich filmów i treści UGC. Nasze serie wideo dla klientów zebrały 2 i 4,2 mln wyświetleń.',
    whatLabel: 'Co robimy',
    whatTitle: 'TikTok Ads i treści, które ludzie oglądają',
    what: [
      { title: 'Kampanie TikTok Ads', text: 'Konfigurujemy konto reklamowe, piksel TikToka i kampanie nastawione na sprzedaż, zapytania lub zasięg.' },
      { title: 'Produkcja wideo pod TikToka', text: 'Piszemy scenariusze i nagrywamy krótkie filmy w natywnym stylu platformy, z mocnym początkiem.' },
      { title: 'UGC i twórcy', text: 'Dobieramy twórców i przygotowujemy treści UGC, które wyglądają naturalnie i budują zaufanie.' },
      { title: 'Prowadzenie konta marki', text: 'Planujemy serie publikacji i rozwijamy konto organicznie, a najlepsze filmy wzmacniamy reklamą.' },
    ],
    forLabel: 'Dla kogo',
    forTitle: 'Komu pomagamy na TikToku',
    forList: [
      'Markom konsumenckim, które chcą dotrzeć do młodszej grupy odbiorców.',
      'Sklepom internetowym, którym droga reklama na Facebooku przestała się opłacać.',
      'Lokalnym firmom, które chcą wyróżnić się wyrazistym wizerunkiem.',
      'Markom, które startują z kontem od zera.',
    ],
    priceLabel: 'Cena',
    priceTitle: 'Kampanie TikTok Ads od 179 € miesięcznie',
    priceText: 'Do opłaty stałej doliczamy procent od budżetu reklamowego. Produkcję wideo i UGC wyceniamy osobno, w zależności od liczby i formatu materiałów.',
    faqLabel: 'Najczęstsze pytania',
    faq: [
      { q: 'Czy reklama na TikToku sprawdzi się w mojej branży?', a: 'TikTok dobrze działa dla produktów konsumenckich, e-commerce, gastronomii i usług lokalnych. W audycie ocenimy, czy to dobry kanał dla Ciebie.' },
      { q: 'Czy potrzebuję własnych filmów?', a: 'Nie. Możemy przygotować scenariusze, nagrać filmy i dobrać twórców UGC.' },
      { q: 'Jaki budżet jest potrzebny na start?', a: 'Na pierwsze testy zwykle wystarcza kilkadziesiąt złotych dziennie. Budżet reklamowy płacisz bezpośrednio TikTokowi.' },
      { q: 'Czy prowadzicie też konto organicznie?', a: 'Tak. Łączymy publikacje organiczne z reklamą, bo najlepsze organiczne filmy są zwykle najlepszymi reklamami.' },
    ],
  },
}

const ru: Record<LandingSlug, Landing> = {
  meta: {
    short: 'Реклама в Facebook и Instagram',
    label: 'Meta Ads · Катовице',
    title: 'Реклама в Facebook и Instagram',
    lead: 'Ведём кампании Meta Ads с точным таргетингом: от стратегии и креативов до оптимизации бюджета. Работаем из Катовице с компаниями по всей Польше.',
    whatLabel: 'Что делаем',
    whatTitle: 'Таргетированная реклама Meta Ads под ключ',
    what: [
      { title: 'Стратегия и таргетинг', text: 'Подбираем аудитории: интересы, похожие аудитории (lookalike), ремаркетинг и собственные базы клиентов.' },
      { title: 'Настройка и аналитика', text: 'Настраиваем рекламный кабинет, пиксель Meta и Conversions API, чтобы каждая конверсия была измерена.' },
      { title: 'Рекламные креативы', text: 'Готовим видео, Reels, карусели и графику под Facebook и Instagram.' },
      { title: 'Оптимизация и отчёты', text: 'Тестируем креативы и аудитории, переносим бюджет туда, где он работает, и понятно отчитываемся.' },
    ],
    forLabel: 'Для кого',
    forTitle: 'Кому помогаем таргетированной рекламой',
    forList: [
      'Интернет-магазинам, которые хотят увеличить продажи и окупаемость рекламы.',
      'Местным сервисным компаниям, которые ищут клиентов в своём городе.',
      'Брендам, которые запускают новый продукт и нуждаются в охвате.',
      'Компаниям, у которых прошлые кампании не давали результата.',
    ],
    priceLabel: 'Цена',
    priceTitle: 'Ведение кампаний Meta Ads от 179 € в месяц',
    priceText: 'К фиксированной оплате добавляется процент от рекламного бюджета. Аудит существующего рекламного кабинета — от 169 €. Итоговая цена фиксируется в индивидуальном предложении.',
    faqLabel: 'Частые вопросы',
    faq: [
      { q: 'Какой бюджет нужен на старт рекламы в Facebook?', a: 'Зависит от ниши и цели, но для первых тестов обычно достаточно нескольких десятков злотых в день. Рекламный бюджет вы платите напрямую Meta.' },
      { q: 'Когда будут видны результаты?', a: 'Первые данные появляются через несколько дней. Стабильный результат обычно через 2–4 недели тестов и оптимизации.' },
      { q: 'Вы делаете креативы?', a: 'Да. У нас свой продакшн видео и графики, креативы делаем под конкретную кампанию и тестируем в нескольких вариантах.' },
      { q: 'Нужно ли подписывать долгий договор?', a: 'Нет. Объём и срок работы фиксируем в индивидуальном предложении.' },
    ],
  },
  google: {
    short: 'Кампании Google Ads',
    label: 'Google Ads · Катовице',
    title: 'Кампании Google Ads',
    lead: 'Показываем рекламу клиентам в тот момент, когда они ищут ваши услуги или товары. Ведём поисковые кампании, Performance Max, YouTube и Google Shopping.',
    whatLabel: 'Что делаем',
    whatTitle: 'Реклама в Google, которая приносит заявки',
    what: [
      { title: 'Поисковые кампании', text: 'Подбираем ключевые слова с высоким намерением купить, пишем объявления и отсекаем запросы, которые сливают бюджет.' },
      { title: 'Performance Max и Shopping', text: 'Для интернет-магазинов настраиваем Merchant Center, товарные кампании и Performance Max.' },
      { title: 'YouTube и медийная сеть', text: 'Повышаем узнаваемость и делаем ремаркетинг на YouTube и в медийной сети Google.' },
      { title: 'Измерение конверсий', text: 'Внедряем Google Analytics 4 и отслеживание конверсий, чтобы было видно, какая реклама приносит продажи.' },
    ],
    forLabel: 'Для кого',
    forTitle: 'Кому помогаем кампаниями Google Ads',
    forList: [
      'Сервисным компаниям, к которым клиенты приходят из поиска.',
      'Интернет-магазинам, которые хотят продавать через Google Shopping.',
      'B2B-компаниям, которым нужны запросы на коммерческие предложения.',
      'Компаниям, которые платят за клики, но не видят из них клиентов.',
    ],
    priceLabel: 'Цена',
    priceTitle: 'Ведение кампаний Google Ads от 179 € в месяц',
    priceText: 'К фиксированной оплате добавляется процент от рекламного бюджета. Аудит существующего аккаунта Google Ads — от 169 €. Итоговая цена фиксируется в индивидуальном предложении.',
    faqLabel: 'Частые вопросы',
    faq: [
      { q: 'Сколько стоит клик в Google Ads?', a: 'Зависит от ниши и конкуренции: от нескольких десятков грошей до десятка с лишним злотых. На аудите оцениваем стоимость для ваших ключевых слов.' },
      { q: 'Чем Google Ads отличается от SEO?', a: 'Google Ads даёт трафик с первого дня, но за каждый клик нужно платить. SEO растёт дольше, зато без оплаты за клики. Лучше всего они работают вместе.' },
      { q: 'Возьмёте существующий аккаунт?', a: 'Да. Начинаем с аудита, затем улучшаем структуру, ключевые слова и отслеживание конверсий.' },
      { q: 'Кому принадлежит рекламный аккаунт?', a: 'Вам. Аккаунт и данные остаются у вас, мы работаем по выданному доступу.' },
    ],
  },
  tiktok: {
    short: 'Реклама в TikTok',
    label: 'TikTok Ads · Катовице',
    title: 'Реклама в TikTok',
    lead: 'Совмещаем кампании TikTok Ads с продакшном коротких видео и UGC. Наши видеосерии для клиентов набрали 2 и 4,2 млн просмотров.',
    whatLabel: 'Что делаем',
    whatTitle: 'TikTok Ads и контент, который смотрят',
    what: [
      { title: 'Кампании TikTok Ads', text: 'Настраиваем рекламный кабинет, пиксель TikTok и кампании на продажи, заявки или охват.' },
      { title: 'Видео под TikTok', text: 'Пишем сценарии и снимаем короткие видео в нативном стиле платформы с сильным началом.' },
      { title: 'UGC и креаторы', text: 'Подбираем креаторов и готовим UGC-контент, который выглядит естественно и вызывает доверие.' },
      { title: 'Ведение аккаунта бренда', text: 'Планируем серии публикаций, развиваем аккаунт органически, а лучшие ролики усиливаем рекламой.' },
    ],
    forLabel: 'Для кого',
    forTitle: 'Кому помогаем в TikTok',
    forList: [
      'Потребительским брендам, которым нужна более молодая аудитория.',
      'Интернет-магазинам, которым реклама в Facebook стала невыгодной.',
      'Местным компаниям, которые хотят выделиться ярким образом.',
      'Брендам, которые запускают аккаунт с нуля.',
    ],
    priceLabel: 'Цена',
    priceTitle: 'Кампании TikTok Ads от 179 € в месяц',
    priceText: 'К фиксированной оплате добавляется процент от рекламного бюджета. Видео и UGC оцениваем отдельно, в зависимости от количества и формата материалов.',
    faqLabel: 'Частые вопросы',
    faq: [
      { q: 'Подойдёт ли TikTok для моей ниши?', a: 'TikTok хорошо работает для потребительских товаров, e-commerce, общепита и местных услуг. На аудите оценим, подходит ли этот канал вам.' },
      { q: 'Нужны ли свои видео?', a: 'Нет. Мы можем написать сценарии, снять видео и подобрать UGC-креаторов.' },
      { q: 'Какой бюджет нужен на старт?', a: 'Для первых тестов обычно достаточно нескольких десятков злотых в день. Рекламный бюджет вы платите напрямую TikTok.' },
      { q: 'Ведёте ли аккаунт органически?', a: 'Да. Совмещаем органику и рекламу: лучшие органические ролики обычно становятся лучшей рекламой.' },
    ],
  },
}

const en: Record<LandingSlug, Landing> = {
  meta: {
    short: 'Facebook & Instagram ads',
    label: 'Meta Ads · Katowice',
    title: 'Facebook and Instagram advertising',
    lead: 'We run Meta Ads campaigns with precise targeting, from strategy and creative to budget optimisation. Based in Katowice, working with businesses across Poland.',
    whatLabel: 'What we do',
    whatTitle: 'End-to-end Meta Ads campaigns',
    what: [
      { title: 'Strategy and targeting', text: 'We build audiences from interests, lookalikes, remarketing and your own customer lists.' },
      { title: 'Setup and analytics', text: 'We configure Ads Manager, the Meta Pixel and the Conversions API so every conversion is measured.' },
      { title: 'Ad creative', text: 'We produce videos, Reels, carousels and graphics made for Facebook and Instagram.' },
      { title: 'Optimisation and reporting', text: 'We test creative and audiences, move budget to what works and report results clearly.' },
    ],
    forLabel: 'Who it is for',
    forTitle: 'Who we help with Facebook advertising',
    forList: [
      'Online stores that want more sales and a better return on ad spend.',
      'Local service businesses looking for customers in their city.',
      'Brands launching a new product that need reach.',
      'Businesses whose previous campaigns did not deliver.',
    ],
    priceLabel: 'Price',
    priceTitle: 'Meta Ads management from €179 a month',
    priceText: 'A percentage of ad spend is added to the fixed fee. An audit of an existing ad account costs from €169. The final price is set in an individual proposal.',
    faqLabel: 'FAQ',
    faq: [
      { q: 'What budget do I need to start advertising on Facebook?', a: 'It depends on your industry and goal, but a few dozen złoty a day is usually enough for first tests. You pay the ad budget directly to Meta.' },
      { q: 'How soon will I see results?', a: 'First data comes in after a few days. Stable results usually appear after 2–4 weeks of testing and optimisation.' },
      { q: 'Do you make the ad creative?', a: 'Yes. We have in-house video and design production, so creative is made for the campaign and tested in several versions.' },
      { q: 'Do I have to sign a long contract?', a: 'No. Scope and term are agreed in an individual proposal.' },
    ],
  },
  google: {
    short: 'Google Ads campaigns',
    label: 'Google Ads · Katowice',
    title: 'Google Ads campaigns',
    lead: 'We reach customers at the moment they search for your services or products. We run Search, Performance Max, YouTube and Google Shopping campaigns.',
    whatLabel: 'What we do',
    whatTitle: 'Google advertising that brings enquiries',
    what: [
      { title: 'Search campaigns', text: 'We choose high-intent keywords, write ads and exclude searches that waste budget.' },
      { title: 'Performance Max and Shopping', text: 'For online stores we set up Merchant Center, Shopping campaigns and Performance Max.' },
      { title: 'YouTube and Display', text: 'We build awareness and remarketing on YouTube and the Google Display Network.' },
      { title: 'Conversion tracking', text: 'We implement Google Analytics 4 and conversion tracking so you can see which ads drive sales.' },
    ],
    forLabel: 'Who it is for',
    forTitle: 'Who we help with Google Ads',
    forList: [
      'Service businesses whose customers find them through search.',
      'Online stores that want to sell through Google Shopping.',
      'B2B companies looking for qualified enquiries.',
      'Businesses paying for clicks but not seeing customers.',
    ],
    priceLabel: 'Price',
    priceTitle: 'Google Ads management from €179 a month',
    priceText: 'A percentage of ad spend is added to the fixed fee. An audit of an existing Google Ads account costs from €169. The final price is set in an individual proposal.',
    faqLabel: 'FAQ',
    faq: [
      { q: 'How much does a click cost in Google Ads?', a: 'It depends on industry and competition, from a few dozen grosze to over ten złoty. In the audit we estimate costs for your keywords.' },
      { q: 'How is Google Ads different from SEO?', a: 'Google Ads brings traffic from day one, but you pay for every click. SEO grows organic traffic more slowly, without paying per click. They work best together.' },
      { q: 'Can you take over an existing account?', a: 'Yes. We start with an audit, then improve the structure, keywords and conversion tracking.' },
      { q: 'Who owns the ad account?', a: 'You do. The account and data stay with you; we work with the access you grant us.' },
    ],
  },
  tiktok: {
    short: 'TikTok advertising',
    label: 'TikTok Ads · Katowice',
    title: 'TikTok advertising',
    lead: 'We combine TikTok Ads campaigns with short-form video and UGC production. Our video series for clients reached 2M and 4.2M views.',
    whatLabel: 'What we do',
    whatTitle: 'TikTok Ads and content people watch',
    what: [
      { title: 'TikTok Ads campaigns', text: 'We set up the ad account, the TikTok Pixel and campaigns focused on sales, leads or reach.' },
      { title: 'Video made for TikTok', text: 'We write scripts and shoot short videos in the platform\'s native style, with a strong hook.' },
      { title: 'UGC and creators', text: 'We select creators and produce UGC that feels natural and builds trust.' },
      { title: 'Brand account management', text: 'We plan content series, grow the account organically and boost the best videos with ads.' },
    ],
    forLabel: 'Who it is for',
    forTitle: 'Who we help on TikTok',
    forList: [
      'Consumer brands that want to reach a younger audience.',
      'Online stores for which Facebook ads have become too expensive.',
      'Local businesses that want to stand out.',
      'Brands starting an account from zero.',
    ],
    priceLabel: 'Price',
    priceTitle: 'TikTok Ads campaigns from €179 a month',
    priceText: 'A percentage of ad spend is added to the fixed fee. Video and UGC production is quoted separately, depending on the number and format of assets.',
    faqLabel: 'FAQ',
    faq: [
      { q: 'Will TikTok advertising work in my industry?', a: 'TikTok works well for consumer products, e-commerce, food and local services. In the audit we assess whether it is the right channel for you.' },
      { q: 'Do I need my own videos?', a: 'No. We can write scripts, shoot videos and select UGC creators.' },
      { q: 'What budget do I need to start?', a: 'A few dozen złoty a day is usually enough for first tests. You pay the ad budget directly to TikTok.' },
      { q: 'Do you also run the account organically?', a: 'Yes. We combine organic posting with ads, because the best organic videos usually make the best ads.' },
    ],
  },
}

export const LANDINGS: Record<Lang, Record<LandingSlug, Landing>> = { pl, ru, en }

export const LANDING_SLUGS = Object.keys(LANDING_PATHS) as LandingSlug[]
