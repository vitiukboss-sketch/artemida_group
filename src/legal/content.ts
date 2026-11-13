import { COMPANY, COMPANY_ADDRESS } from '../config/company'
import type { Lang } from '../i18n'

export type Block = string | { list: string[] } | { table: string[][] }
export type LegalDoc = { title: string; intro?: string; sections: { h: string; body: Block[] }[] }
export type DocKey = 'privacy' | 'cookies' | 'terms'

export const DOC_PATHS: Record<DocKey, string> = {
  privacy: '/polityka-prywatnosci',
  cookies: '/polityka-cookies',
  terms: '/regulamin',
}

const C = COMPANY
const site = C.website

/** Linia z danymi rejestrowymi, np. „NIP: …, KRS: …”. Pomija puste pola. */
function registry(labels: { nip: string; regon: string; krs: string; court: string; capital: string }) {
  return [
    C.krs && `${labels.krs}: ${C.krs}`,
    C.registryCourt && `${labels.court}: ${C.registryCourt}`,
    C.nip && `${labels.nip}: ${C.nip}`,
    C.regon && `${labels.regon}: ${C.regon}`,
    C.shareCapital && `${labels.capital}: ${C.shareCapital}`,
  ]
    .filter(Boolean)
    .join(', ')
}

/* ================================================================== */
/* POLSKI (wersja wiążąca)                                            */
/* ================================================================== */

const plReg = registry({ nip: 'NIP', regon: 'REGON', krs: 'KRS', court: 'sąd rejestrowy', capital: 'kapitał zakładowy' })
const plController = `${C.legalName}, ${COMPANY_ADDRESS}${plReg ? `, ${plReg}` : ''}`

const pl: Record<DocKey, LegalDoc> = {
  privacy: {
    title: 'Polityka prywatności',
    intro: `Ten dokument wyjaśnia, jak przetwarzamy dane osobowe osób odwiedzających stronę ${site} i osób, które wysyłają zapytanie przez formularz kontaktowy. Realizuje obowiązek informacyjny z art. 13 i 14 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).`,
    sections: [
      {
        h: '1. Administrator danych',
        body: [
          `Administratorem Twoich danych osobowych jest ${plController} (dalej: „Administrator”, „my”).`,
          `Kontakt w sprawach danych osobowych: e-mail ${C.email}, telefon ${C.phone}, korespondencyjnie na adres siedziby. Administrator nie wyznaczył inspektora ochrony danych.`,
        ],
      },
      {
        h: '2. Jakie dane przetwarzamy',
        body: [
          {
            list: [
              'dane z formularza: imię, adres e-mail, adres strony firmy, wybrana usługa, preferowany kanał kontaktu wraz z nazwą użytkownika w komunikatorze lub numerem telefonu, treść wiadomości;',
              'dane techniczne wysyłane razem z formularzem: język strony, adres podstrony, data i godzina wysłania;',
              'jeśli reprezentujesz firmę: dane służbowe, np. nazwa firmy i stanowisko, jeśli je podasz;',
              'dane z dalszej korespondencji, jeśli skontaktujesz się z nami telefonicznie, e-mailem lub przez komunikator;',
              'dane techniczne zapisywane automatycznie przez serwer (adres IP, typ przeglądarki, data i godzina wizyty) w logach serwera;',
              'dane z plików cookies i podobnych technologii, zgodnie z Polityką cookies.',
            ],
          },
          'Podanie danych w formularzu jest dobrowolne, ale bez imienia, adresu e-mail i treści wiadomości nie możemy odpowiedzieć na zapytanie. Prosimy nie podawać w wiadomości danych szczególnych kategorii (np. o zdrowiu).',
        ],
      },
      {
        h: '3. Cele i podstawy prawne przetwarzania',
        body: [
          {
            list: [
              'odpowiedź na zapytanie i przygotowanie oferty, czyli działania podejmowane na Twoje żądanie przed zawarciem umowy (art. 6 ust. 1 lit. b RODO);',
              'jeśli kontaktujesz się z nami w imieniu firmy: komunikacja z Tobą jako przedstawicielem lub pracownikiem klienta, co stanowi nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO);',
              'zawarcie i wykonanie umowy o świadczenie usług marketingowych (art. 6 ust. 1 lit. b RODO, a w przypadku przedstawicieli klienta art. 6 ust. 1 lit. f RODO);',
              'wypełnienie obowiązków prawnych, np. podatkowych i rachunkowych, jeśli dojdzie do współpracy (art. 6 ust. 1 lit. c RODO);',
              'ustalenie, dochodzenie lub obrona roszczeń oraz zapewnienie bezpieczeństwa strony, co stanowi nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO);',
              'statystyki odwiedzin i pomiar skuteczności reklam, wyłącznie na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO w związku z art. 399 ustawy Prawo komunikacji elektronicznej).',
            ],
          },
        ],
      },
      {
        h: '4. Jak długo przechowujemy dane',
        body: [
          {
            list: [
              'dane z zapytania, które nie zakończyło się współpracą: do 12 miesięcy od ostatniego kontaktu, a potem je usuwamy;',
              'dane klientów i ich przedstawicieli: przez czas trwania umowy, a następnie przez okres przedawnienia roszczeń i okres wymagany przepisami podatkowymi i rachunkowymi (co do zasady 5 lat od końca roku kalendarzowego, w którym powstał obowiązek podatkowy);',
              'dane przetwarzane na podstawie zgody: do czasu jej wycofania;',
              'logi serwera: przez okres niezbędny do zapewnienia bezpieczeństwa, nie dłużej niż 12 miesięcy.',
            ],
          },
        ],
      },
      {
        h: '5. Odbiorcy danych',
        body: [
          'Twoje dane mogą otrzymać wyłącznie podmioty, które pomagają nam prowadzić działalność, w zakresie niezbędnym do realizacji celów opisanych wyżej:',
          {
            list: [
              'Cloudflare, Inc. (USA): dostawca hostingu strony, sieci CDN i infrastruktury formularza;',
              'Zoho Corporation B.V. (Holandia): dostawca poczty e-mail w domenie artemidagroup.eu (dane przechowywane w centrach danych w UE), przez którą prowadzimy korespondencję;',
              'Telegram FZ-LLC (Zjednoczone Emiraty Arabskie): komunikator, przez który zapytania z formularza są przekazywane naszemu zespołowi;',
              'dostawca komunikatora, który sam wybierzesz do kontaktu (WhatsApp / Meta Platforms Ireland Ltd. lub Telegram FZ-LLC);',
              'podwykonawcy, którzy pomagają nam realizować projekty (np. twórcy treści, montażyści), wyłącznie po zawarciu umowy i w niezbędnym zakresie;',
              'biuro rachunkowe, kancelaria prawna i dostawcy usług IT, działający na nasze zlecenie;',
              'Google Ireland Ltd. i Meta Platforms Ireland Ltd., wyłącznie jeśli wyrazisz zgodę na cookies analityczne lub marketingowe;',
              'organy publiczne, jeśli wymagają tego przepisy prawa.',
            ],
          },
        ],
      },
      {
        h: '6. Przekazywanie danych poza Europejski Obszar Gospodarczy',
        body: [
          'Cloudflare, Inc., Google LLC i Meta Platforms Inc. mogą przetwarzać dane w USA. Przekazanie odbywa się na podstawie decyzji Komisji Europejskiej z 10 lipca 2023 r. w sprawie EU-US Data Privacy Framework (w przypadku podmiotów certyfikowanych) lub standardowych klauzul umownych zatwierdzonych przez Komisję Europejską.',
          'Telegram FZ-LLC przetwarza dane w Zjednoczonych Emiratach Arabskich, wobec których Komisja Europejska nie wydała decyzji stwierdzającej odpowiedni stopień ochrony. Przekazanie jest niezbędne do podjęcia działań przed zawarciem umowy na Twoje żądanie (art. 49 ust. 1 lit. b RODO). Wiąże się to z ryzykiem, że ochrona danych w tym państwie może być niższa niż w UE.',
          'Kopię zabezpieczeń możesz otrzymać, pisząc na adres podany w punkcie 1.',
        ],
      },
      {
        h: '7. Twoje prawa',
        body: [
          {
            list: [
              'dostęp do danych i otrzymanie ich kopii (art. 15 RODO);',
              'sprostowanie danych (art. 16 RODO);',
              'usunięcie danych (art. 17 RODO);',
              'ograniczenie przetwarzania (art. 18 RODO);',
              'przenoszenie danych (art. 20 RODO);',
              'sprzeciw wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie (art. 21 RODO);',
              'wycofanie zgody w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania przed jej wycofaniem; zgodę na cookies zmienisz przez link „Ustawienia cookies” w stopce strony;',
              'wniesienie skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl).',
            ],
          },
          `Aby skorzystać z praw, napisz na ${C.email}. Odpowiemy bez zbędnej zwłoki, nie później niż w ciągu miesiąca.`,
        ],
      },
      {
        h: '8. Zautomatyzowane podejmowanie decyzji',
        body: [
          'Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym profilowaniu, które wywoływałyby skutki prawne lub w podobny sposób istotnie na Ciebie wpływały.',
        ],
      },
      {
        h: '9. Cookies',
        body: ['Informacje o plikach cookies i o tym, jak zarządzać zgodą, znajdziesz w Polityce cookies.'],
      },
      {
        h: '10. Zmiany polityki',
        body: ['Możemy aktualizować tę politykę, np. przy zmianie przepisów lub narzędzi, z których korzystamy. Aktualna wersja jest zawsze dostępna na tej stronie wraz z datą wejścia w życie.'],
      },
    ],
  },

  cookies: {
    title: 'Polityka cookies',
    intro: `Ten dokument opisuje, jak strona ${site} korzysta z plików cookies i podobnych technologii (np. pamięci lokalnej przeglądarki). Administratorem danych jest ${plController}.`,
    sections: [
      {
        h: '1. Czym są pliki cookies',
        body: [
          'Pliki cookies to małe pliki tekstowe zapisywane na Twoim urządzeniu przez przeglądarkę. Podobnie działa pamięć lokalna przeglądarki (localStorage). Dalej nazywamy je łącznie „cookies”.',
        ],
      },
      {
        h: '2. Podstawa prawna',
        body: [
          'Zgodnie z art. 399 ustawy z dnia 12 lipca 2024 r. Prawo komunikacji elektronicznej cookies niezbędne do działania strony stosujemy bez zgody. Wszystkie pozostałe (analityczne i marketingowe) uruchamiamy wyłącznie po Twojej wyraźnej zgodzie wyrażonej w banerze. Do momentu wyboru żadne opcjonalne cookies nie są zapisywane.',
        ],
      },
      {
        h: '3. Jakich cookies używamy',
        body: [
          {
            table: [
              ['Nazwa', 'Dostawca', 'Kategoria', 'Cel', 'Okres'],
              ['artemida_consent', site, 'Niezbędne', 'Zapamiętanie Twojego wyboru dotyczącego cookies (dowód zgody)', '12 miesięcy'],
              ['artemida_lang', site, 'Niezbędne', 'Zapamiętanie wybranego języka strony', 'do usunięcia przez Ciebie'],
              ['_ga, _ga_*', 'Google Ireland Ltd.', 'Analityczne (za zgodą)', 'Anonimowe statystyki odwiedzin (Google Analytics 4)', 'do 2 lat'],
              ['_fbp', 'Meta Platforms Ireland Ltd.', 'Marketingowe (za zgodą)', 'Pomiar skuteczności reklam (Meta Pixel)', '3 miesiące'],
            ],
          },
          'Cookies analityczne i marketingowe są aktywne tylko wtedy, gdy dane narzędzie jest włączone na stronie i wyraziłeś na nie zgodę. Obecnie Google Analytics ani Meta Pixel nie są włączone, więc strona używa wyłącznie niezbędnych cookies. Jeśli je włączymy, zaktualizujemy tę politykę i zadziałają one tylko po Twojej zgodzie.',
        ],
      },
      {
        h: '4. Jak zmienić lub wycofać zgodę',
        body: [
          'Zgodę możesz w każdej chwili zmienić lub wycofać przez link „Ustawienia cookies” w stopce strony. Po wycofaniu zgody usuwamy opcjonalne cookies i przestajemy uruchamiać odpowiednie narzędzia.',
          'Możesz też zablokować lub usunąć cookies w ustawieniach przeglądarki. Zablokowanie cookies niezbędnych może spowodować, że strona będzie ponownie pytać o zgodę.',
        ],
      },
      {
        h: '5. Kontakt',
        body: [`Pytania dotyczące cookies wyślij na ${C.email}. Więcej o przetwarzaniu danych przeczytasz w Polityce prywatności.`],
      },
    ],
  },

  terms: {
    title: 'Regulamin świadczenia usług drogą elektroniczną',
    intro: `Regulamin wydany na podstawie art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną. Określa zasady korzystania ze strony ${site}.`,
    sections: [
      {
        h: '§ 1. Usługodawca',
        body: [`Usługodawcą jest ${plController}, e-mail: ${C.email}, telefon: ${C.phone}.`],
      },
      {
        h: '§ 2. Usługi',
        body: [
          'Za pośrednictwem strony Usługodawca świadczy nieodpłatnie następujące usługi drogą elektroniczną:',
          {
            list: [
              'udostępnianie treści informacyjnych o usługach marketingowych Usługodawcy;',
              'formularz kontaktowy, który pozwala wysłać zapytanie.',
            ],
          },
        ],
      },
      {
        h: '§ 3. Wymagania techniczne',
        body: [
          'Do korzystania ze strony potrzebne są: urządzenie z dostępem do Internetu, aktualna przeglądarka internetowa z włączoną obsługą JavaScript oraz zgoda przeglądarki na zapisywanie niezbędnych cookies.',
        ],
      },
      {
        h: '§ 4. Zawarcie i rozwiązanie umowy',
        body: [
          {
            list: [
              'Umowa o przeglądanie treści zostaje zawarta z chwilą wejścia na stronę i rozwiązuje się z chwilą jej opuszczenia.',
              'Umowa o korzystanie z formularza zostaje zawarta z chwilą rozpoczęcia jego wypełniania i rozwiązuje się z chwilą wysłania zapytania lub zrezygnowania z jego wysłania.',
            ],
          },
        ],
      },
      {
        h: '§ 5. Zasady korzystania',
        body: [
          'Użytkownik zobowiązuje się korzystać ze strony zgodnie z prawem i dobrymi obyczajami, podawać prawdziwe dane oraz nie dostarczać treści o charakterze bezprawnym.',
        ],
      },
      {
        h: '§ 6. Charakter informacji',
        body: [
          {
            list: [
              'Treści na stronie mają charakter informacyjny i nie stanowią oferty w rozumieniu art. 66 Kodeksu cywilnego.',
              'Ceny w cenniku są cenami orientacyjnymi „od”. Ostateczny zakres prac, wynagrodzenie i warunki ustalane są w indywidualnej ofercie i umowie.',
              'Wyniki przedstawione w portfolio dotyczą konkretnych kampanii i nie stanowią gwarancji takich samych wyników w przyszłości.',
              'Wysłanie zapytania nie zobowiązuje żadnej ze stron do zawarcia umowy.',
              'Nazwy platform reklamowych i marek klientów są znakami towarowymi ich właścicieli.',
            ],
          },
        ],
      },
      {
        h: '§ 7. Zagrożenia związane z korzystaniem z Internetu',
        body: [
          'Korzystanie z usług drogą elektroniczną wiąże się z ryzykami, takimi jak złośliwe oprogramowanie, próby wyłudzenia danych (phishing) czy przechwycenie transmisji. Zalecamy korzystanie z aktualnego oprogramowania i programu antywirusowego. Strona używa szyfrowanego połączenia HTTPS.',
        ],
      },
      {
        h: '§ 8. Reklamacje',
        body: [
          `Reklamacje dotyczące działania strony możesz zgłaszać na adres ${C.email} lub pisemnie na adres siedziby. Reklamacja powinna zawierać dane kontaktowe i opis problemu. Odpowiemy w ciągu 14 dni od jej otrzymania.`,
        ],
      },
      {
        h: '§ 9. Dane osobowe',
        body: ['Zasady przetwarzania danych osobowych opisuje Polityka prywatności, a zasady korzystania z cookies Polityka cookies.'],
      },
      {
        h: '§ 10. Postanowienia końcowe',
        body: [
          {
            list: [
              'Regulamin jest dostępny bezpłatnie na stronie w formie, która pozwala go pobrać, utrwalić i wydrukować.',
              'Usługodawca może zmienić regulamin z ważnych przyczyn, np. zmiany przepisów lub zakresu usług. Zmiany obowiązują od dnia publikacji nowej wersji na stronie.',
              'W sprawach nieuregulowanych stosuje się prawo polskie. Postanowienia regulaminu nie ograniczają praw konsumentów wynikających z bezwzględnie obowiązujących przepisów.',
            ],
          },
        ],
      },
    ],
  },
}

/* ================================================================== */
/* РУССКИЙ (перевод)                                                  */
/* ================================================================== */

const ruReg = registry({ nip: 'NIP', regon: 'REGON', krs: 'KRS', court: 'регистрационный суд', capital: 'уставный капитал' })
const ruController = `${C.legalName}, ${COMPANY_ADDRESS}${ruReg ? `, ${ruReg}` : ''}`

const ru: Record<DocKey, LegalDoc> = {
  privacy: {
    title: 'Политика конфиденциальности',
    intro: `Этот документ объясняет, как мы обрабатываем персональные данные посетителей сайта ${site} и людей, отправивших запрос через контактную форму. Он выполняет информационную обязанность по ст. 13 и 14 Регламента (ЕС) 2016/679 (GDPR, по-польски RODO).`,
    sections: [
      {
        h: '1. Администратор данных',
        body: [
          `Администратор ваших персональных данных: ${ruController} (далее «Администратор», «мы»).`,
          `Контакт по вопросам персональных данных: e-mail ${C.email}, телефон ${C.phone}, почтой по адресу офиса. Инспектор по защите данных не назначен.`,
        ],
      },
      {
        h: '2. Какие данные мы обрабатываем',
        body: [
          {
            list: [
              'данные из формы: имя, e-mail, сайт компании, выбранная услуга, удобный канал связи с именем пользователя в мессенджере или номером телефона, текст сообщения;',
              'если вы представляете компанию: служебные данные, например название компании и должность, если вы их укажете;',
              'технические данные, отправляемые вместе с формой: язык сайта, адрес страницы, дата и время отправки;',
              'данные из дальнейшей переписки, если вы связываетесь с нами по телефону, e-mail или в мессенджере;',
              'технические данные, которые сервер записывает автоматически (IP-адрес, тип браузера, дата и время визита);',
              'данные cookies и похожих технологий согласно Политике cookies.',
            ],
          },
          'Указывать данные в форме добровольно, но без имени, e-mail и текста сообщения мы не сможем ответить на запрос. Пожалуйста, не указывайте в сообщении данные особых категорий (например, о здоровье).',
        ],
      },
      {
        h: '3. Цели и правовые основания обработки',
        body: [
          {
            list: [
              'ответ на запрос и подготовка предложения, то есть действия по вашему запросу до заключения договора (ст. 6 п. 1 лит. b GDPR);',
              'если вы пишете от имени компании: общение с вами как с представителем или сотрудником клиента, это наш законный интерес (ст. 6 п. 1 лит. f GDPR);',
              'заключение и исполнение договора на маркетинговые услуги (ст. 6 п. 1 лит. b GDPR, для представителей клиента ст. 6 п. 1 лит. f GDPR);',
              'исполнение юридических обязанностей, например налоговых и бухгалтерских, если сотрудничество начнётся (ст. 6 п. 1 лит. c GDPR);',
              'установление, предъявление или защита требований и безопасность сайта, это наш законный интерес (ст. 6 п. 1 лит. f GDPR);',
              'статистика посещений и измерение эффективности рекламы, только с вашего согласия (ст. 6 п. 1 лит. a GDPR в связи со ст. 399 польского закона «Prawo komunikacji elektronicznej»).',
            ],
          },
        ],
      },
      {
        h: '4. Сколько мы храним данные',
        body: [
          {
            list: [
              'данные запроса, после которого сотрудничество не началось: до 12 месяцев с последнего контакта, затем удаляем;',
              'данные клиентов и их представителей: на время договора, затем на срок исковой давности и срок, который требуют налоговые и бухгалтерские правила (как правило, 5 лет с конца года, в котором возникла налоговая обязанность);',
              'данные, обрабатываемые на основании согласия: до его отзыва;',
              'логи сервера: столько, сколько нужно для безопасности, но не более 12 месяцев.',
            ],
          },
        ],
      },
      {
        h: '5. Получатели данных',
        body: [
          'Ваши данные могут получить только компании, которые помогают нам работать, и только в нужном для описанных целей объёме:',
          {
            list: [
              'Cloudflare, Inc. (США): хостинг сайта, CDN и инфраструктура формы;',
              'Zoho Corporation B.V. (Нидерланды): почтовый сервис для домена artemidagroup.eu (данные хранятся в дата-центрах в ЕС), через который мы ведём переписку;',
              'Telegram FZ-LLC (ОАЭ): мессенджер, через который запросы из формы передаются нашей команде;',
              'провайдер мессенджера, который вы сами выбрали для связи (WhatsApp / Meta Platforms Ireland Ltd. или Telegram FZ-LLC);',
              'подрядчики, которые помогают нам выполнять проекты (например, авторы контента, монтажёры), только после заключения договора и в нужном объёме;',
              'бухгалтерия, юридическая фирма и IT-подрядчики, работающие по нашему поручению;',
              'Google Ireland Ltd. и Meta Platforms Ireland Ltd., только если вы согласились на аналитические или маркетинговые cookies;',
              'государственные органы, если этого требует закон.',
            ],
          },
        ],
      },
      {
        h: '6. Передача данных за пределы Европейской экономической зоны',
        body: [
          'Cloudflare, Inc., Google LLC и Meta Platforms Inc. могут обрабатывать данные в США. Передача происходит на основании решения Европейской комиссии от 10 июля 2023 г. о EU-US Data Privacy Framework (для сертифицированных компаний) или стандартных договорных условий, утверждённых Европейской комиссией.',
          'Telegram FZ-LLC обрабатывает данные в ОАЭ, для которых Европейская комиссия не выносила решения об адекватном уровне защиты. Передача необходима для действий по вашему запросу до заключения договора (ст. 49 п. 1 лит. b GDPR). Есть риск, что защита данных в этой стране ниже, чем в ЕС.',
          'Копию гарантий защиты можно запросить по контактам из пункта 1.',
        ],
      },
      {
        h: '7. Ваши права',
        body: [
          {
            list: [
              'доступ к данным и получение их копии (ст. 15 GDPR);',
              'исправление данных (ст. 16 GDPR);',
              'удаление данных (ст. 17 GDPR);',
              'ограничение обработки (ст. 18 GDPR);',
              'перенос данных (ст. 20 GDPR);',
              'возражение против обработки на основании нашего законного интереса (ст. 21 GDPR);',
              'отзыв согласия в любой момент без влияния на законность обработки до отзыва; согласие на cookies меняется по ссылке «Настройки cookies» в подвале сайта;',
              'жалоба Председателю Управления по защите персональных данных Польши (UODO, ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl).',
            ],
          },
          `Чтобы воспользоваться правами, напишите на ${C.email}. Мы ответим без лишней задержки, не позднее чем через месяц.`,
        ],
      },
      {
        h: '8. Автоматизированное принятие решений',
        body: [
          'Мы не принимаем в отношении вас решений, основанных исключительно на автоматизированной обработке, включая профилирование, которые порождали бы юридические последствия или существенно влияли на вас.',
        ],
      },
      { h: '9. Cookies', body: ['Информация о cookies и управлении согласием находится в Политике cookies.'] },
      {
        h: '10. Изменения политики',
        body: ['Мы можем обновлять эту политику, например при изменении законов или используемых инструментов. Актуальная версия всегда доступна на этой странице вместе с датой вступления в силу.'],
      },
    ],
  },

  cookies: {
    title: 'Политика cookies',
    intro: `Этот документ описывает, как сайт ${site} использует cookies и похожие технологии (например, локальное хранилище браузера). Администратор данных: ${ruController}.`,
    sections: [
      {
        h: '1. Что такое cookies',
        body: ['Cookies — небольшие текстовые файлы, которые браузер сохраняет на вашем устройстве. Похожим образом работает локальное хранилище браузера (localStorage). Далее вместе мы называем их «cookies».'],
      },
      {
        h: '2. Правовое основание',
        body: [
          'Согласно ст. 399 польского закона от 12 июля 2024 г. «Prawo komunikacji elektronicznej» необходимые для работы сайта cookies мы используем без согласия. Все остальные (аналитические и маркетинговые) включаются только после вашего явного согласия в баннере. Пока вы не сделали выбор, необязательные cookies не сохраняются.',
        ],
      },
      {
        h: '3. Какие cookies мы используем',
        body: [
          {
            table: [
              ['Название', 'Поставщик', 'Категория', 'Цель', 'Срок'],
              ['artemida_consent', site, 'Необходимые', 'Запоминает ваш выбор по cookies (доказательство согласия)', '12 месяцев'],
              ['artemida_lang', site, 'Необходимые', 'Запоминает выбранный язык сайта', 'пока вы не удалите'],
              ['_ga, _ga_*', 'Google Ireland Ltd.', 'Аналитические (с согласия)', 'Анонимная статистика посещений (Google Analytics 4)', 'до 2 лет'],
              ['_fbp', 'Meta Platforms Ireland Ltd.', 'Маркетинговые (с согласия)', 'Измерение эффективности рекламы (Meta Pixel)', '3 месяца'],
            ],
          },
          'Аналитические и маркетинговые cookies работают, только если инструмент подключён на сайте и вы дали на него согласие. Сейчас Google Analytics и Meta Pixel не подключены, поэтому сайт использует только необходимые cookies. Если мы их подключим, мы обновим эту политику, и они будут работать только после вашего согласия.',
        ],
      },
      {
        h: '4. Как изменить или отозвать согласие',
        body: [
          'Согласие можно изменить или отозвать в любой момент по ссылке «Настройки cookies» в подвале сайта. После отзыва мы удаляем необязательные cookies и больше не запускаем соответствующие инструменты.',
          'Cookies также можно заблокировать или удалить в настройках браузера. Если заблокировать необходимые cookies, сайт будет снова спрашивать согласие.',
        ],
      },
      { h: '5. Контакт', body: [`Вопросы о cookies присылайте на ${C.email}. Подробнее об обработке данных читайте в Политике конфиденциальности.`] },
    ],
  },

  terms: {
    title: 'Регламент оказания услуг электронным способом',
    intro: `Регламент издан на основании ст. 8 польского закона от 18 июля 2002 г. об оказании услуг электронным способом. Он определяет правила пользования сайтом ${site}.`,
    sections: [
      { h: '§ 1. Поставщик услуг', body: [`Поставщик услуг: ${ruController}, e-mail: ${C.email}, телефон: ${C.phone}.`] },
      {
        h: '§ 2. Услуги',
        body: [
          'Через сайт Поставщик бесплатно оказывает следующие электронные услуги:',
          { list: ['предоставление информации о маркетинговых услугах Поставщика;', 'контактная форма для отправки запроса.'] },
        ],
      },
      {
        h: '§ 3. Технические требования',
        body: ['Для пользования сайтом нужны: устройство с доступом в Интернет, актуальный браузер с включённым JavaScript и разрешение браузера сохранять необходимые cookies.'],
      },
      {
        h: '§ 4. Заключение и расторжение договора',
        body: [
          {
            list: [
              'Договор о просмотре контента заключается в момент входа на сайт и расторгается в момент выхода с него.',
              'Договор об использовании формы заключается в момент начала её заполнения и расторгается в момент отправки запроса или отказа от отправки.',
            ],
          },
        ],
      },
      {
        h: '§ 5. Правила пользования',
        body: ['Пользователь обязуется пользоваться сайтом в соответствии с законом и добрыми нравами, указывать правдивые данные и не размещать противоправный контент.'],
      },
      {
        h: '§ 6. Характер информации',
        body: [
          {
            list: [
              'Материалы сайта носят информационный характер и не являются офертой в смысле ст. 66 Гражданского кодекса Польши.',
              'Цены в прайсе ориентировочные, «от». Итоговый объём работ, стоимость и условия фиксируются в индивидуальном предложении и договоре.',
              'Результаты в портфолио относятся к конкретным кампаниям и не гарантируют таких же результатов в будущем.',
              'Отправка запроса не обязывает ни одну из сторон заключить договор.',
              'Названия рекламных платформ и брендов клиентов являются товарными знаками их владельцев.',
            ],
          },
        ],
      },
      {
        h: '§ 7. Риски использования Интернета',
        body: ['Пользование электронными услугами связано с рисками: вредоносные программы, попытки выманить данные (фишинг), перехват передачи. Рекомендуем пользоваться актуальным ПО и антивирусом. Сайт использует шифрованное соединение HTTPS.'],
      },
      {
        h: '§ 8. Жалобы',
        body: [`Жалобы на работу сайта можно направлять на ${C.email} или письменно на адрес офиса. Укажите контактные данные и описание проблемы. Мы ответим в течение 14 дней после получения.`],
      },
      { h: '§ 9. Персональные данные', body: ['Правила обработки персональных данных описаны в Политике конфиденциальности, правила использования cookies — в Политике cookies.'] },
      {
        h: '§ 10. Заключительные положения',
        body: [
          {
            list: [
              'Регламент бесплатно доступен на сайте в форме, позволяющей его скачать, сохранить и распечатать.',
              'Поставщик может изменить регламент по важным причинам, например при изменении законов или объёма услуг. Изменения действуют с даты публикации новой версии на сайте.',
              'В неурегулированных вопросах применяется польское право. Положения регламента не ограничивают права потребителей по императивным нормам закона.',
            ],
          },
        ],
      },
    ],
  },
}

/* ================================================================== */
/* ENGLISH (translation)                                              */
/* ================================================================== */

const enReg = registry({ nip: 'NIP (Tax ID)', regon: 'REGON', krs: 'KRS', court: 'registry court', capital: 'share capital' })
const enController = `${C.legalName}, ${COMPANY_ADDRESS}${enReg ? `, ${enReg}` : ''}`

const en: Record<DocKey, LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    intro: `This document explains how we process the personal data of visitors to ${site} and of people who send an enquiry through the contact form. It fulfils the information obligation under Articles 13 and 14 of Regulation (EU) 2016/679 (GDPR).`,
    sections: [
      {
        h: '1. Data controller',
        body: [
          `The controller of your personal data is ${enController} (the “Controller”, “we”).`,
          `Contact for data protection matters: email ${C.email}, phone ${C.phone}, or by post to our registered office. We have not appointed a Data Protection Officer.`,
        ],
      },
      {
        h: '2. What data we process',
        body: [
          {
            list: [
              'form data: name, email address, company website, chosen service, preferred contact channel with your messenger username or phone number, message;',
              'if you represent a company: business details such as company name and job title, if you provide them;',
              'technical data sent with the form: site language, page address, date and time of submission;',
              'data from further correspondence if you contact us by phone, email or messenger;',
              'technical data automatically recorded by the server (IP address, browser type, date and time of visit) in server logs;',
              'cookie and similar technology data, as described in the Cookie Policy.',
            ],
          },
          'Providing data in the form is voluntary, but without your name, email and message we cannot respond to your enquiry. Please do not include special categories of data (e.g. health data) in your message.',
        ],
      },
      {
        h: '3. Purposes and legal bases',
        body: [
          {
            list: [
              'responding to your enquiry and preparing a proposal, i.e. steps taken at your request before entering into a contract (Art. 6(1)(b) GDPR);',
              'if you contact us on behalf of a company: communicating with you as a representative or employee of the client, which is our legitimate interest (Art. 6(1)(f) GDPR);',
              'concluding and performing a contract for marketing services (Art. 6(1)(b) GDPR, or Art. 6(1)(f) GDPR for client representatives);',
              'complying with legal obligations such as tax and accounting, if cooperation begins (Art. 6(1)(c) GDPR);',
              'establishing, exercising or defending legal claims and keeping the site secure, which is our legitimate interest (Art. 6(1)(f) GDPR);',
              'visit statistics and ad performance measurement, only with your consent (Art. 6(1)(a) GDPR in connection with Art. 399 of the Polish Electronic Communications Law).',
            ],
          },
        ],
      },
      {
        h: '4. How long we keep data',
        body: [
          {
            list: [
              'enquiries that did not lead to cooperation: up to 12 months from the last contact, then deleted;',
              'data of clients and their representatives: for the duration of the contract, then for the limitation period for claims and the period required by tax and accounting rules (generally 5 years from the end of the year in which the tax obligation arose);',
              'data processed on the basis of consent: until consent is withdrawn;',
              'server logs: as long as needed for security, no longer than 12 months.',
            ],
          },
        ],
      },
      {
        h: '5. Recipients',
        body: [
          'Your data may be shared only with entities that help us run our business, and only to the extent necessary for the purposes above:',
          {
            list: [
              'Cloudflare, Inc. (USA): website hosting, CDN and form infrastructure;',
              'Zoho Corporation B.V. (Netherlands): e-mail provider for the artemidagroup.eu domain (data stored in EU data centres), which we use for correspondence;',
              'Telegram FZ-LLC (United Arab Emirates): messenger used to forward enquiries from the form to our team;',
              'the provider of the messenger you choose for contact (WhatsApp / Meta Platforms Ireland Ltd. or Telegram FZ-LLC);',
              'subcontractors who help us deliver projects (e.g. content creators, editors), only after a contract is signed and to the extent necessary;',
              'our accounting office, law firm and IT service providers acting on our behalf;',
              'Google Ireland Ltd. and Meta Platforms Ireland Ltd., only if you consent to analytics or marketing cookies;',
              'public authorities, where required by law.',
            ],
          },
        ],
      },
      {
        h: '6. Transfers outside the European Economic Area',
        body: [
          'Cloudflare, Inc., Google LLC and Meta Platforms Inc. may process data in the USA. Transfers are based on the European Commission adequacy decision of 10 July 2023 on the EU-US Data Privacy Framework (for certified entities) or on Standard Contractual Clauses approved by the European Commission.',
          'Telegram FZ-LLC processes data in the United Arab Emirates, for which the European Commission has not issued an adequacy decision. The transfer is necessary for steps taken at your request before entering into a contract (Art. 49(1)(b) GDPR). This involves the risk that data protection in that country may be lower than in the EU.',
          'You can request a copy of the safeguards using the contact details in section 1.',
        ],
      },
      {
        h: '7. Your rights',
        body: [
          {
            list: [
              'access to your data and a copy of it (Art. 15 GDPR);',
              'rectification (Art. 16 GDPR);',
              'erasure (Art. 17 GDPR);',
              'restriction of processing (Art. 18 GDPR);',
              'data portability (Art. 20 GDPR);',
              'objection to processing based on our legitimate interest (Art. 21 GDPR);',
              'withdrawal of consent at any time, without affecting the lawfulness of processing before withdrawal; you can change cookie consent via the “Cookie settings” link in the footer;',
              'lodging a complaint with the President of the Polish Personal Data Protection Office (UODO, ul. Stawki 2, 00-193 Warsaw, uodo.gov.pl).',
            ],
          },
          `To exercise your rights, write to ${C.email}. We will reply without undue delay and within one month at the latest.`,
        ],
      },
      {
        h: '8. Automated decision-making',
        body: ['We do not make decisions about you based solely on automated processing, including profiling, that produce legal effects or similarly significantly affect you.'],
      },
      { h: '9. Cookies', body: ['Information about cookies and managing your consent is in the Cookie Policy.'] },
      {
        h: '10. Changes',
        body: ['We may update this policy, for example when laws or the tools we use change. The current version, with its effective date, is always available on this page.'],
      },
    ],
  },

  cookies: {
    title: 'Cookie Policy',
    intro: `This document describes how ${site} uses cookies and similar technologies (such as browser local storage). The data controller is ${enController}.`,
    sections: [
      {
        h: '1. What cookies are',
        body: ['Cookies are small text files stored on your device by your browser. Browser local storage (localStorage) works similarly. Below we refer to both as “cookies”.'],
      },
      {
        h: '2. Legal basis',
        body: [
          'Under Article 399 of the Polish Electronic Communications Law of 12 July 2024, we use cookies essential for the site to work without consent. All other cookies (analytics and marketing) are activated only after your explicit consent in the banner. Until you make a choice, no optional cookies are stored.',
        ],
      },
      {
        h: '3. Cookies we use',
        body: [
          {
            table: [
              ['Name', 'Provider', 'Category', 'Purpose', 'Duration'],
              ['artemida_consent', site, 'Essential', 'Stores your cookie choice (proof of consent)', '12 months'],
              ['artemida_lang', site, 'Essential', 'Stores your chosen site language', 'until you delete it'],
              ['_ga, _ga_*', 'Google Ireland Ltd.', 'Analytics (with consent)', 'Anonymous visit statistics (Google Analytics 4)', 'up to 2 years'],
              ['_fbp', 'Meta Platforms Ireland Ltd.', 'Marketing (with consent)', 'Ad performance measurement (Meta Pixel)', '3 months'],
            ],
          },
          'Analytics and marketing cookies are active only if the tool is enabled on the site and you have consented to it. Google Analytics and Meta Pixel are currently not enabled, so the site uses essential cookies only. If we enable them, we will update this policy and they will run only after your consent.',
        ],
      },
      {
        h: '4. Changing or withdrawing consent',
        body: [
          'You can change or withdraw consent at any time via the “Cookie settings” link in the footer. After withdrawal we delete optional cookies and stop running the related tools.',
          'You can also block or delete cookies in your browser settings. Blocking essential cookies will make the site ask for your consent again.',
        ],
      },
      { h: '5. Contact', body: [`Send questions about cookies to ${C.email}. For more on data processing, see the Privacy Policy.`] },
    ],
  },

  terms: {
    title: 'Terms of Service',
    intro: `These terms are issued under Article 8 of the Polish Act of 18 July 2002 on Providing Services by Electronic Means. They set out the rules for using ${site}.`,
    sections: [
      { h: '§ 1. Service provider', body: [`The service provider is ${enController}, email: ${C.email}, phone: ${C.phone}.`] },
      {
        h: '§ 2. Services',
        body: [
          'Through the site, the provider offers the following electronic services free of charge:',
          { list: ['access to information about the provider’s marketing services;', 'a contact form for sending an enquiry.'] },
        ],
      },
      {
        h: '§ 3. Technical requirements',
        body: ['To use the site you need a device with Internet access, an up-to-date browser with JavaScript enabled, and a browser that allows essential cookies.'],
      },
      {
        h: '§ 4. Conclusion and termination',
        body: [
          {
            list: [
              'The agreement for browsing content is concluded when you enter the site and terminates when you leave it.',
              'The agreement for using the form is concluded when you start filling it in and terminates when you send it or abandon it.',
            ],
          },
        ],
      },
      { h: '§ 5. Rules of use', body: ['Users must use the site lawfully and in good faith, provide truthful data and not submit unlawful content.'] },
      {
        h: '§ 6. Nature of information',
        body: [
          {
            list: [
              'Site content is for information only and is not an offer within the meaning of Article 66 of the Polish Civil Code.',
              'Prices on the pricing page are indicative “from” prices. The final scope, fee and terms are set in an individual proposal and contract.',
              'Results shown in the portfolio relate to specific campaigns and do not guarantee the same results in the future.',
              'Sending an enquiry does not oblige either party to enter into a contract.',
              'Names of advertising platforms and client brands are trademarks of their respective owners.',
            ],
          },
        ],
      },
      {
        h: '§ 7. Internet risks',
        body: ['Using electronic services involves risks such as malware, phishing and interception of transmissions. We recommend up-to-date software and antivirus protection. The site uses an encrypted HTTPS connection.'],
      },
      {
        h: '§ 8. Complaints',
        body: [`Complaints about the site can be sent to ${C.email} or in writing to our registered office. Please include your contact details and a description of the problem. We will reply within 14 days of receipt.`],
      },
      { h: '§ 9. Personal data', body: ['Personal data processing is described in the Privacy Policy and cookie use in the Cookie Policy.'] },
      {
        h: '§ 10. Final provisions',
        body: [
          {
            list: [
              'These terms are available free of charge on the site in a form that allows downloading, saving and printing.',
              'The provider may amend these terms for important reasons, such as changes in law or in the scope of services. Changes take effect on the date the new version is published on the site.',
              'Polish law applies to matters not covered here. These terms do not limit consumer rights under mandatory provisions of law.',
            ],
          },
        ],
      },
    ],
  },
}

export const LEGAL: Record<Lang, Record<DocKey, LegalDoc>> = { pl, ru, en }
