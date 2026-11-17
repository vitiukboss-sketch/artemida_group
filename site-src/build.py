#!/usr/bin/env python3
"""Generator strony artemidagroup.eu.
python3 build.py            -> dist/     (produkcja, czyste adresy dla Cloudflare Pages)
python3 build.py preview    -> preview/  (podgląd z względnymi linkami do plików .html)
"""
import hashlib, html, json, os, posixpath, shutil, sys, datetime
from content_pl import C as PL
from content_ru import C as RU
from content_en import C as EN
from legal import LEGAL

BASE = 'https://artemidagroup.eu'
LANGS = {'pl': PL, 'ru': RU, 'en': EN}
ORDER = ['pl', 'ru', 'en']
TODAY = datetime.date.today().isoformat()
HERE = os.path.dirname(os.path.abspath(__file__))

ROUTES = {
    'home':       {'pl': '',                          'ru': 'ru/',                            'en': 'en/'},
    'services':   {'pl': 'uslugi',                    'ru': 'ru/uslugi',                      'en': 'en/services'},
    'meta':       {'pl': 'reklama-facebook-instagram', 'ru': 'ru/reklama-facebook-instagram', 'en': 'en/facebook-instagram-ads'},
    'google':     {'pl': 'kampanie-google-ads',       'ru': 'ru/google-ads',                  'en': 'en/google-ads'},
    'tiktok':     {'pl': 'reklama-tiktok',            'ru': 'ru/reklama-tiktok',              'en': 'en/tiktok-ads'},
    'production': {'pl': 'produkcja',                 'ru': 'ru/proizvodstvo-video',          'en': 'en/video-production'},
    'web':        {'pl': 'strony-internetowe',        'ru': 'ru/razrabotka-saitov',           'en': 'en/web-development'},
    'seo':        {'pl': 'pozycjonowanie-seo',        'ru': 'ru/seo-prodvizhenie',            'en': 'en/seo'},
    'ai':         {'pl': 'automatyzacje-ai',          'ru': 'ru/avtomatizaciya-ai',           'en': 'en/ai-automation'},
    'portfolio':  {'pl': 'portfolio',                 'ru': 'ru/portfolio',                   'en': 'en/portfolio'},
    'pricing':    {'pl': 'cennik',                    'ru': 'ru/ceny',                        'en': 'en/pricing'},
    'about':      {'pl': 'o-nas',                     'ru': 'ru/o-nas',                       'en': 'en/about'},
    'contact':    {'pl': 'kontakt',                   'ru': 'ru/kontakty',                    'en': 'en/contact'},
    'privacy':    {'pl': 'polityka-prywatnosci',      'ru': 'ru/politika-konfidencialnosti',  'en': 'en/privacy-policy'},
    'cookies':    {'pl': 'polityka-cookies',          'ru': 'ru/politika-cookies',            'en': 'en/cookie-policy'},
    'terms':      {'pl': 'regulamin',                 'ru': 'ru/reglament',                   'en': 'en/terms'},
}
SERVICE_PAGES = ['meta', 'google', 'tiktok', 'web', 'seo', 'ai']
LEGAL_PAGES = ['privacy', 'cookies', 'terms']

ORG = {
    'legal': 'Artem Vitiuk Artemida Group', 'street': 'ul. Gen. Józefa Longina Sowińskiego 46 lok. 1c',
    'zip': '40-018', 'city': 'Katowice', 'email': 'info@artemidagroup.eu', 'phone': '+48 795 657 830',
    'tel': '+48795657830', 'nip': '9542915634',
}

MODE = 'preview' if len(sys.argv) > 1 and sys.argv[1] == 'preview' else 'dist'
OUT = os.path.join(HERE, MODE)
e = html.escape
import re
_ORPH = re.compile(r'(?:(?<=[\s(])|^)([iwzoauIWZOAUвиксуоаяВИКСУОАЯ]|na|do|od|po|we|ze|że|на|по|за|из|от|до|не|of|to|in|on|at|by|a|an|the) ')


def tidy(text):
    return _ORPH.sub(lambda m: m.group(1) + '\u00a0', text)


def tidy_html(markup):
    return re.sub(r'>([^<]+)<', lambda m: '>' + tidy(m.group(1)) + '<', markup)


def outfile(key, lang):
    s = ROUTES[key][lang]
    if s == '' or s.endswith('/'):
        return s + 'index.html'
    return s + '.html'


def path(key, lang):
    """Ścieżka produkcyjna: /, /uslugi, /ru/, /ru/uslugi"""
    return '/' + ROUTES[key][lang]


def absurl(key, lang):
    return BASE + path(key, lang)


class Ctx:
    def __init__(self, key, lang):
        self.key, self.lang = key, lang
        self.file = outfile(key, lang) if key != '404' else (('' if lang == 'pl' else lang + '/') + '404.html')

    def href(self, key, lang=None, frag=''):
        lang = lang or self.lang
        if MODE == 'dist':
            return path(key, lang) + frag
        rel = posixpath.relpath(outfile(key, lang), posixpath.dirname(self.file) or '.')
        return rel + frag

    def asset(self, p):
        if MODE == 'dist':
            return '/' + p
        return posixpath.relpath(p, posixpath.dirname(self.file) or '.')


# ---------- small helpers ----------

def target_svg():
    return ('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="none" stroke="#EDEFD2" stroke-width="5"/>'
            '<circle cx="50" cy="50" r="32" fill="none" stroke="#EDEFD2" stroke-width="5"/>'
            '<circle cx="50" cy="50" r="17" fill="#EDEFD2"/></svg>')


def ld_script(graph):
    return ('<script type="application/ld+json">' +
            json.dumps({'@context': 'https://schema.org', '@graph': graph}, ensure_ascii=False, indent=1) +
            '</script>')


def org_node(C):
    return {
        '@type': 'ProfessionalService', '@id': BASE + '/#firma', 'name': 'Artemida Group',
        'legalName': ORG['legal'], 'description': C['org_desc'], 'url': BASE + '/',
        'logo': {'@type': 'ImageObject', 'url': BASE + '/brand/logo.png', 'width': 512, 'height': 512}, 'image': BASE + '/og/pl-home.png',
        'email': ORG['email'], 'telephone': ORG['tel'], 'taxID': ORG['nip'], 'priceRange': '€€',
        'foundingDate': '2026', 'founder': {'@id': BASE + '/#artem-vitiuk'},
        'address': {'@type': 'PostalAddress', 'streetAddress': ORG['street'], 'postalCode': ORG['zip'],
                    'addressLocality': ORG['city'], 'addressRegion': 'śląskie', 'addressCountry': 'PL'},
        'hasMap': 'https://www.google.com/maps/search/?api=1&query=Sowi%C5%84skiego%2046%2C%2040-018%20Katowice',
        'areaServed': [{'@type': 'City', 'name': 'Katowice'}, {'@type': 'Country', 'name': 'Polska'}],
        'contactPoint': {'@type': 'ContactPoint', 'contactType': 'sales', 'telephone': ORG['tel'],
                         'email': ORG['email'], 'availableLanguage': ['pl', 'ru', 'en']},
        'knowsAbout': ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Google Ads', 'TikTok Ads', 'video production',
                       'UGC', 'social media marketing', 'web development', 'SEO', 'AI automation'],
        'knowsLanguage': ['pl', 'ru', 'en'],
    }


def person_node(C):
    return {'@type': 'Person', '@id': BASE + '/#artem-vitiuk', 'name': 'Artem Vitiuk',
            'jobTitle': C['founder']['role'], 'worksFor': {'@id': BASE + '/#firma'},
            'url': absurl('about', C['lang'])}


def website_node():
    return {'@type': 'WebSite', '@id': BASE + '/#website', 'name': 'Artemida Group', 'alternateName': 'Artemida',
            'url': BASE + '/', 'inLanguage': ['pl-PL', 'ru', 'en'], 'publisher': {'@id': BASE + '/#firma'}}


def faq_node(items, key, lang):
    return {'@type': 'FAQPage', '@id': absurl(key, lang) + '#faq',
            'mainEntity': [{'@type': 'Question', 'name': q,
                            'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in items]}


# ---------- layout ----------

SVC_MENU = ['meta', 'google', 'tiktok', 'production', 'web', 'seo', 'ai']
CARET = '<svg class="caret" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'


def lang_links(cx, cls=''):
    out = ''
    tgt = cx.key if cx.key in ROUTES else 'home'
    for l in ORDER:
        cur = ' aria-current="true"' if l == cx.lang else ''
        out += f'<a href="{cx.href(tgt, l)}" hreflang="{l}" lang="{l}"{cur}>{l.upper()}</a>'
    return out


def cur(cx, k):
    return ' aria-current="page"' if k == cx.key else ''


def header(cx, C):
    U = C['ui']
    items = ''
    for k, lbl in U['nav']:
        if k == 'services':
            sub = ''.join(f'<li><a href="{cx.href(s)}"{cur(cx, s)}><strong>{e(C["names"][s])}</strong><span>{e(C["related_desc"][s])}</span></a></li>'
                          for s in SVC_MENU)
            sub += f'<li class="sub__all"><a href="{cx.href("services")}"><strong>{e(U["all_services"])}</strong></a></li>'
            active = ' aria-current="page"' if cx.key == 'services' or cx.key in SVC_MENU else ''
            items += (f'<li class="nav__item nav__item--sub"><a class="nav__link" href="{cx.href(k)}"{active}>{e(lbl)}{CARET}</a>'
                      f'<div class="sub"><ul>{sub}</ul></div></li>')
        else:
            items += f'<li class="nav__item"><a class="nav__link" href="{cx.href(k)}"{cur(cx, k)}>{e(lbl)}</a></li>'
    cta = '#contact' if cx.has_form else cx.href('contact')
    return f'''<header class="top">
  <div class="wrap top__bar">
    <a class="brand" href="{cx.href('home')}" aria-label="{e(U['home_aria'])}">Artemida <span>Group</span></a>
    <nav class="nav" aria-label="{e(U['nav_aria'])}"><ul class="nav__list">{items}</ul></nav>
    <div class="langs" aria-label="{e(U['langs_aria'])}">{lang_links(cx)}</div>
    <a class="btn btn--moon top__cta" href="{cta}">{e(U['cta'])}</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="mnav"><i></i><i></i><span class="sr-only">{e(U['menu'])}</span></button>
  </div>
</header>'''


def mnav(cx, C):
    U = C['ui']
    lis = ''
    i = 0
    for k, lbl in U['nav']:
        extra = ''
        if k == 'services':
            extra = '<div class="mnav__sub">' + ''.join(
                f'<a href="{cx.href(s)}"{cur(cx, s)}>{e(C["names"][s])}</a>' for s in SVC_MENU) + '</div>'
        lis += f'<li data-i style="--i:{i}"><a href="{cx.href(k)}"{cur(cx, k)}>{e(lbl)}</a>{extra}</li>'
        i += 1
    cta = '#contact' if cx.has_form else cx.href('contact')
    return f'''<div class="mnav" id="mnav">
  <nav aria-label="{e(U['nav_aria'])}"><ul class="mnav__list">{lis}</ul></nav>
  <div class="mnav__foot">
    <a class="btn btn--moon" href="{cta}" data-i style="--i:{i}">{e(U['cta'])}</a>
    <div class="mnav__row" data-i style="--i:{i + 1}">
      <div class="mnav__langs" aria-label="{e(U['langs_aria'])}">{lang_links(cx)}</div>
      <div class="mnav__contact"><a href="tel:{ORG['tel']}">{ORG['phone']}</a><a href="mailto:{ORG['email']}">{ORG['email']}</a></div>
    </div>
  </div>
</div>'''


def footer(cx, C):
    U = C['ui']
    svc = ''.join(f'<li><a href="{cx.href(k)}">{e(C["names"][k])}</a></li>' for k in U['foot_services'])
    svc += f'<li><a href="{cx.href("services")}">{e(U["all_services"])}</a></li>'
    comp = ''.join(f'<li><a href="{cx.href(k)}">{e(C["pages"][k]["crumb"])}</a></li>' for k in U['foot_company'])
    legal = ''.join(f'<a href="{cx.href(k)}">{e(C["legal_names"][k])}</a>' for k in LEGAL_PAGES)
    return f'''<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div class="foot__brand">
        <a class="brand" href="{cx.href('home')}">Artemida <span>Group</span></a>
        <p class="foot__about">{e(U['foot_about'])}</p>
      </div>
      <nav aria-label="{e(U['foot_services_h'])}"><p class="foot__h">{e(U['foot_services_h'])}</p><ul>{svc}</ul></nav>
      <nav aria-label="{e(U['foot_company_h'])}"><p class="foot__h">{e(U['foot_company_h'])}</p><ul>{comp}</ul></nav>
      <div>
        <p class="foot__h">{e(U['foot_data_h'])}</p>
        <address>{e(ORG['legal'])}<br>{e(ORG['street'])}<br>{ORG['zip']} {ORG['city']}<br>NIP {ORG['nip']}<br>
          <a href="tel:{ORG['tel']}">{ORG['phone']}</a><br><a href="mailto:{ORG['email']}">{ORG['email']}</a></address>
      </div>
    </div>
    <div class="foot__end">
      <p class="moon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#21463C"/><path id="moon-lit" fill="#EDEFD2" d=""/></svg><span id="moon-text">{e(U['moon_fallback'])}</span></p>
      <p class="foot__legal"><span>© {datetime.date.today().year} Artemida Group</span>{legal}<button type="button" data-consent-open>{e(U['cookie_settings'])}</button></p>
    </div>
  </div>
</footer>'''


def consent(cx, C):
    K = C['ui']['consent']
    return f'''<div class="consent" id="consent" role="dialog" aria-labelledby="consent-t" hidden>
  <h2 id="consent-t">{e(K['h'])}</h2>
  <p class="consent__text">{e(K['text'])} <a href="{cx.href('cookies')}">{e(C['legal_names']['cookies'])}</a>.</p>
  <p class="consent__none" hidden>{e(K['none'])} <a href="{cx.href('cookies')}">{e(C['legal_names']['cookies'])}</a>.</p>
  <div class="consent__opts" data-tools>
    <label data-row="analytics"><input type="checkbox" id="c-analytics"><span>{e(K['analytics'])}<small>{e(K['analytics_d'])}</small></span></label>
    <label data-row="marketing"><input type="checkbox" id="c-marketing"><span>{e(K['marketing'])}<small>{e(K['marketing_d'])}</small></span></label>
  </div>
  <div class="consent__btns">
    <button class="btn btn--moon" type="button" data-act="all" data-tools>{e(K['all'])}</button>
    <button class="btn btn--ghost" type="button" data-act="none" data-tools>{e(K['none_btn'])}</button>
    <button class="btn btn--ghost" type="button" data-act="save" data-tools>{e(K['save'])}</button>
    <button class="btn btn--ghost consent__close" type="button" data-act="close">{e(K['close'])}</button>
  </div>
</div>'''


def crumbs_html(cx, C, trail):
    items = f'<li><a href="{cx.href("home")}">{e(C["ui"]["crumb_home"])}</a></li>'
    for k in trail[:-1]:
        items += f'<li><a href="{cx.href(k)}">{e(C["pages"][k]["crumb"])}</a></li>'
    items += f'<li aria-current="page">{e(trail_name(C, trail[-1]))}</li>'
    return f'<nav aria-label="{e(C["ui"]["crumbs_aria"])}"><ol class="crumbs">{items}</ol></nav>'


def trail_name(C, k):
    if k in LEGAL_PAGES:
        return C['legal_names'][k]
    return C['pages'][k]['crumb']


def crumbs_ld(C, trail, lang):
    els = [{'@type': 'ListItem', 'position': 1, 'name': C['ui']['crumb_home'], 'item': absurl('home', lang)}]
    for i, k in enumerate(trail, start=2):
        els.append({'@type': 'ListItem', 'position': i, 'name': trail_name(C, k), 'item': absurl(k, lang)})
    return {'@type': 'BreadcrumbList', '@id': absurl(trail[-1], lang) + '#breadcrumb', 'itemListElement': els}


def l10n(C):
    return '<script id="l10n" type="application/json">' + json.dumps(C['ui']['js'], ensure_ascii=False) + '</script>'


def page(cx, C, title, desc, body, graph, og_key=None, robots='index, follow, max-image-preview:large, max-snippet:-1',
         og_title=None, indexable=True):
    lang = cx.lang
    alt = ''
    if indexable:
        for l in ORDER:
            alt += f'<link rel="alternate" hreflang="{l}" href="{absurl(cx.key, l)}">\n'
        alt += f'<link rel="alternate" hreflang="x-default" href="{absurl(cx.key, "pl")}">\n'
        canon = f'<link rel="canonical" href="{absurl(cx.key, lang)}">\n'
    else:
        canon = ''
    og_img = f'{BASE}/og/{lang}-{og_key or cx.key}.png'
    locale_alts = ''.join(f'<meta property="og:locale:alternate" content="{LANGS[l]["locale"]}">\n' for l in ORDER if l != lang)
    url = absurl(cx.key, lang) if indexable else BASE + '/'
    ld = ld_script(graph) if graph else ''
    return f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta name="robots" content="{robots}">
{canon}{alt}<meta name="theme-color" content="#0F2B25">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Artemida Group">
<meta property="og:locale" content="{C['locale']}">
{locale_alts}<meta property="og:url" content="{url}">
<meta property="og:title" content="{e(og_title or title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:image" content="{og_img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{e(og_title or title)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{cx.asset('favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="{cx.asset('apple-touch-icon.png')}">
<link rel="preload" href="{cx.asset('fonts/flex-latin.woff2')}" as="font" type="font/woff2" crossorigin>
{'<link rel="preload" href="' + cx.asset('fonts/flex-cyrillic.woff2') + '" as="font" type="font/woff2" crossorigin>' if lang == 'ru' else ''}
<link rel="stylesheet" href="{cx.asset(ASSETS['css'])}">
<script src="{cx.asset(ASSETS['js'])}" defer></script>
{ld}
</head>
<body>
<a class="skip" href="#main">{e(C['ui']['skip'])}</a>
{header(cx, C)}
{mnav(cx, C)}
<main id="main">
{tidy_html(body)}
</main>
{footer(cx, C)}
{consent(cx, C)}
{l10n(C)}
</body>
</html>
'''


# ---------- sections ----------

def phero(cx, C, trail, h1, lead, ctas=True, plain=False, extra=''):
    U = C['ui']
    btns = ''
    if ctas:
        btns = (f'<div class="ctas"><a class="btn btn--moon" href="#contact">{e(U["quote"])}</a>'
                f'<a class="link" href="{cx.href("pricing")}">{e(U["see_pricing"])}</a></div>')
    lead_html = ''.join(f'<p>{e(p)}</p>' for p in ([lead] if isinstance(lead, str) else lead))
    return f'''<section class="phero on-dark{' phero--plain' if plain else ''}">
  <div class="wrap">
    {crumbs_html(cx, C, trail)}
    <h1 class="display">{e(h1)}</h1>
    <div class="phero__grid"><div class="phero__lead">{lead_html}{btns}</div></div>
    {extra}
  </div>
</section>'''


def cases_html(cx, C, as_h1=False, show_more=True, fog=False):
    K = C['cases']
    arts = ''
    for c in K['items']:
        stats = ''.join(f'<div><dt>{e(v)}</dt><dd>{e(l)}</dd></div>' for v, l in c['stats'])
        arts += f'''<article class="case">
          <h3 class="case__who">{e(c['who'])}</h3>
          <p class="case__num">{e(c['num'])}</p>
          <p class="case__unit">{e(c['unit'])}</p>
          <p class="case__body">{e(c['body'])}</p>
          <dl class="case__stats">{stats}</dl>
        </article>'''
    more = f'<p class="more"><a class="link" href="{cx.href("portfolio")}">{e(C["ui"]["all_work"])}</a></p>' if show_more else \
        f'<p class="cases__note">{e(K["note"])}</p>'
    return f'''<section class="section{' on-fog' if fog else ''}" id="work" aria-labelledby="work-t">
  <div class="wrap">
    <div class="head"><h2 id="work-t" class="display">{e(K['h'])}</h2><p>{e(K['p'])}</p></div>
    <div class="cases">{arts}</div>
    {more}
  </div>
</section>'''


def groups_html(cx, C, long=False, h=None, p=None, sid='services'):
    G = C['groups']
    cols = ''
    for gname, items in G:
        rows = ''
        for k, name, short, longd in items:
            title = f'<a href="{cx.href(k)}">{e(name)}</a>' if k in ROUTES else e(name)
            rows += f'<div class="svc"><h4>{title}</h4><p>{e(longd if long else short)}</p></div>'
        cols += f'<div class="group"><h3>{e(gname)}</h3>{rows}</div>'
    S = C['services_block']
    return f'''<section class="section on-fog" id="{sid}" aria-labelledby="{sid}-t">
  <div class="wrap">
    <div class="head"><h2 id="{sid}-t" class="display">{e(h or S['h'])}</h2><p>{e(p or S['p'])}</p></div>
    <div class="groups">{cols}</div>
  </div>
</section>'''


def process_html(C):
    P = C['process']
    steps = ''.join(f'<li class="step"><p class="step__n" aria-hidden="true">{i}</p><h3>{e(h)}</h3><p>{e(t)}</p></li>'
                    for i, (h, t) in enumerate(P['steps'], 1))
    return f'''<section class="section on-dark" aria-labelledby="process-t">
  <div class="wrap">
    <div class="head"><h2 id="process-t" class="display">{e(P['h'])}</h2><p>{e(P['p'])}</p></div>
    <ol class="steps">{steps}</ol>
  </div>
</section>'''


def founder_html(cx, C, more=True, heading_tag='h2'):
    F = C['founder']
    paras = ''.join(f'<p>{e(x)}</p>' for x in F['text'])
    link = f'<p class="sign"><a class="link" href="{cx.href("about")}">{e(C["ui"]["more_about"])}</a></p>' if more else ''
    return f'''<section class="section" id="about" aria-labelledby="about-t">
  <div class="wrap founder">
    <div class="founder__name"><{heading_tag} id="about-t" class="display">{e(F['h'])}</{heading_tag}><p>Artem Vitiuk, {e(F['role'].lower() if cx.lang != 'en' else F['role'].lower())}</p></div>
    <div class="founder__text">{paras}{link}</div>
  </div>
</section>'''


def prices_html(cx, C, full=False):
    P = C['pricing']
    rows = ''
    for name, desc, val, sub, quiet in P['rows']:
        span = f'<span>{e(sub)}</span>' if sub else ''
        rows += (f'<div class="price"><h3>{e(name)}</h3><p>{e(desc)}</p>'
                 f'<div class="price__val{" price__val--quiet" if quiet else ""}"><strong>{e(val)}</strong>{span}</div></div>')
    more = '' if full else f' <a class="link" href="{cx.href("pricing")}">{e(C["ui"]["full_pricing"])}</a>'
    head = '' if full else f'<div class="head"><h2 id="pricing-t" class="display">{e(P["h"])}</h2><p>{e(P["p"])}</p></div>'
    lab = '' if full else ' aria-labelledby="pricing-t"'
    return f'''<section class="section on-fog" id="pricing"{lab}>
  <div class="wrap">
    {head}
    <div class="prices">{rows}</div>
    <p class="note">{e(P['note'])}{more}</p>
  </div>
</section>'''


def faq_html(C, items, h=None, fog=True, tight=True):
    det = ''.join(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in items)
    cls = 'section' + (' on-fog' if fog else '') + (' section--tight' if tight else '')
    return f'''<section class="{cls}" id="faq" aria-labelledby="faq-t">
  <div class="wrap faq">
    <div class="faq__head"><h2 id="faq-t" class="display">{e(h or C['ui']['faq_h'])}</h2></div>
    <div class="faq__list">{det}</div>
  </div>
</section>'''


def items_html(h, p, items, dark=False, sid=None):
    its = ''.join(f'<div class="item"><h3>{e(a)}</h3><p>{e(b)}</p></div>' for a, b in items)
    idattr = f' id="{sid}"' if sid else ''
    tid = (sid or 'it') + '-t'
    hp = f'<p>{e(p)}</p>' if p else '<p></p>'
    return f'''<section class="section{' on-dark' if dark else ''}"{idattr} aria-labelledby="{tid}">
  <div class="wrap">
    <div class="head"><h2 id="{tid}" class="display">{e(h)}</h2>{hp}</div>
    <div class="items">{its}</div>
  </div>
</section>'''


def who_html(h, items):
    lis = ''.join(f'<li>{e(x)}</li>' for x in items)
    return f'''<section class="section on-fog" aria-labelledby="who-t">
  <div class="wrap who"><h2 id="who-t" class="display">{e(h)}</h2><ul>{lis}</ul></div>
</section>'''


def pricebox_html(cx, C, val, text, quiet=False):
    return f'''<section class="section" aria-labelledby="price-t">
  <div class="wrap pricebox{' pricebox--quiet' if quiet else ''}">
    <h2 id="price-t" class="display">{e(C['ui']['price_h'])}</h2>
    <div><strong>{e(val)}</strong><p>{e(text)}</p><p><a class="link" href="{cx.href('pricing')}">{e(C['ui']['full_pricing'])}</a></p></div>
  </div>
</section>'''


def related_html(cx, C, keys):
    links = ''.join(f'<a href="{cx.href(k)}">{e(C["names"][k])}<span>{e(C["related_desc"][k])}</span></a>' for k in keys)
    return f'''<section class="section on-fog section--tight" aria-labelledby="rel-t">
  <div class="wrap">
    <h2 id="rel-t" class="sr-only">{e(C['ui']['related_h'])}</h2>
    <p class="foot__h" style="color:var(--moss)" aria-hidden="true">{e(C['ui']['related_h'])}</p>
    <div class="related">{links}</div>
  </div>
</section>'''


def contact_html(cx, C, as_page=False):
    U = C['ui']; F = U['form']; K = U['contact']
    opts = ''.join(f'<option>{e(o)}</option>' for o in F['services'])
    tag = 'h1' if as_page else 'h2'
    crumbs = crumbs_html(cx, C, ['contact']) if as_page else ''
    company = ''
    if as_page:
        company = (f'<div><dt>{e(K["company"])}</dt><dd style="font-size:1rem;font-weight:400;line-height:1.6">'
                   f'{e(ORG["legal"])}<br>{e(ORG["street"])}<br>{ORG["zip"]} {ORG["city"]}<br>NIP {ORG["nip"]}</dd></div>'
                   f'<div><dt>{e(K["map"])}</dt><dd><a href="https://www.google.com/maps/search/?api=1&amp;query=Sowi%C5%84skiego%2046%2C%2040-018%20Katowice" rel="noopener">{e(K["map_link"])}</a></dd></div>')
    return f'''<section class="section on-dark{' contact--page' if as_page else ''}" id="contact" aria-labelledby="contact-t">
  <div class="wrap">
  {crumbs}
  <div class="contact">
    <div class="contact__intro">
      <{tag} id="contact-t" class="display">{('<span class="hero__kicker">' + e(C['pages']['contact']['crumb']) + '<span class="sr-only">.</span></span> ') if as_page else ''}{e(K['h'])}</{tag}>
      <p>{e(K['p'])}</p>
      <dl class="direct">
        <div><dt>{e(K['phone'])}</dt><dd><a href="tel:{ORG['tel']}">{ORG['phone']}</a></dd></div>
        <div><dt>E-mail</dt><dd><a href="mailto:{ORG['email']}">{ORG['email']}</a></dd></div>
        <div><dt>{e(K['office'])}</dt><dd>{e(K['office_short'])}</dd></div>
        {company}
      </dl>
    </div>
    <form class="form" id="form" novalidate>
      <div class="field"><label for="f-name">{e(F['name'])}</label><input id="f-name" name="name" required maxlength="120" autocomplete="name"></div>
      <div class="field"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" required maxlength="160" autocomplete="email"></div>
      <div class="field"><label for="f-site">{e(F['site'])}</label><input id="f-site" name="website" maxlength="200" autocomplete="url" placeholder="{e(F['site_ph'])}"></div>
      <div class="field"><label for="f-service">{e(F['service'])}</label><select id="f-service" name="service">{opts}</select></div>
      <fieldset class="field field--full"><legend>{e(F['channel'])}</legend>
        <div class="chips">
          <label><input type="radio" name="channel" value="E-mail" checked><span>E-mail</span></label>
          <label><input type="radio" name="channel" value="Telegram"><span>Telegram</span></label>
          <label><input type="radio" name="channel" value="WhatsApp"><span>WhatsApp</span></label>
          <label><input type="radio" name="channel" value="Viber"><span>Viber</span></label>
        </div>
      </fieldset>
      <div class="field field--full" id="handle-field" hidden><label for="f-handle" id="f-handle-label">{e(U['js']['handleTg'])}</label><input id="f-handle" name="handle" maxlength="80"></div>
      <div class="field field--full"><label for="f-msg">{e(F['msg'])}</label><textarea id="f-msg" name="message" required maxlength="4000" placeholder="{e(F['msg_ph'])}"></textarea></div>
      <div class="hp" aria-hidden="true"><label for="f-hp">-</label><input id="f-hp" name="company" tabindex="-1" autocomplete="off"></div>
      <p class="form__legal">{e(F['legal'])} <a href="{cx.href('privacy')}">{e(F['legal_link'])}</a>.</p>
      <div class="form__send"><button class="btn btn--moon" type="submit">{e(F['send'])}</button><p class="form__status" id="form-status" role="status" aria-live="polite"></p></div>
    </form>
  </div>
  </div>
</section>'''


# ---------- pages ----------

def webpage_node(cx, C, P, ptype='WebPage', trail=True):
    n = {'@type': ptype, '@id': absurl(cx.key, cx.lang) + '#webpage', 'url': absurl(cx.key, cx.lang),
         'name': P['title'], 'description': P['desc'], 'isPartOf': {'@id': BASE + '/#website'},
         'about': {'@id': BASE + '/#firma'}, 'inLanguage': C['lang'],
         'primaryImageOfPage': {'@type': 'ImageObject', 'url': f'{BASE}/og/{cx.lang}-{cx.key}.png', 'width': 1200, 'height': 630}}
    if trail:
        n['breadcrumb'] = {'@id': absurl(cx.key, cx.lang) + '#breadcrumb'}
    return n


def build_home(cx, C):
    P = C['pages']['home']; H = C['hero']
    lines = H['lines']
    spans = ''
    for i, ln in enumerate(lines):
        if i == len(lines) - 1:
            spans += f'<span class="hero__line display">{e(ln)}.</span>'
        else:
            spans += f'<span class="hero__line display">{e(ln)}</span>'
    body = f'''<section class="hero on-dark{' hero--long' if H.get('long') else ''}" aria-label="{e(H['aria'])}">
  <div class="wrap">
    <h1><span class="hero__kicker">{e(H['kicker'])}<span class="sr-only">.</span></span> {spans}</h1>
    <div class="hero__foot"><div class="hero__lead">
      <p>{e(H['lead'])}</p>
      <div class="ctas"><a class="btn btn--moon" href="#contact">{e(H['cta'])}</a><a class="link" href="#work">{e(H['cta2'])}</a></div>
    </div></div>
  </div>
</section>
{cases_html(cx, C)}
{groups_html(cx, C)}
{process_html(C)}
{founder_html(cx, C)}
{prices_html(cx, C)}
{faq_html(C, C['faq_general'])}
{contact_html(cx, C)}'''
    wp = webpage_node(cx, C, P, trail=False)
    graph = [org_node(C), person_node(C), website_node(), wp, faq_node(C['faq_general'], 'home', cx.lang)]
    return page(cx, C, P['title'], P['desc'], body, graph, og_title=P['og'])


def build_services(cx, C):
    P = C['pages']['services']
    body = (phero(cx, C, ['services'], P['h1'], P['lead']) +
            groups_html(cx, C, long=True, h=P['groups_h'], p=P['groups_p']) +
            process_html(C) + faq_html(C, P['faq'], fog=False, tight=False) + contact_html(cx, C))
    items = []
    for _, its in C['groups']:
        for k, name, short, _l in its:
            items.append({'@type': 'ListItem', 'position': len(items) + 1, 'name': name,
                          **({'url': absurl(k, cx.lang)} if k in ROUTES else {})})
    graph = [org_node(C), website_node(), webpage_node(cx, C, P, 'CollectionPage'), crumbs_ld(C, ['services'], cx.lang),
             {'@type': 'ItemList', '@id': absurl('services', cx.lang) + '#list', 'itemListElement': items},
             faq_node(P['faq'], 'services', cx.lang)]
    return page(cx, C, P['title'], P['desc'], body, graph, og_title=P['og'])


def service_node(cx, C, P):
    n = {'@type': 'Service', '@id': absurl(cx.key, cx.lang) + '#service', 'name': P['h1'],
         'serviceType': P['service_type'], 'description': P['desc'], 'url': absurl(cx.key, cx.lang),
         'provider': {'@id': BASE + '/#firma'},
         'areaServed': [{'@type': 'City', 'name': 'Katowice'}, {'@type': 'Country', 'name': 'Polska'}],
         'availableLanguage': ['pl', 'ru', 'en']}
    if P.get('min_price'):
        n['offers'] = {'@type': 'Offer', 'priceCurrency': 'EUR',
                       'priceSpecification': {'@type': 'UnitPriceSpecification', 'minPrice': P['min_price'],
                                              'priceCurrency': 'EUR', 'unitCode': 'MON'}}
    return n


def build_service(cx, C):
    P = C['pages'][cx.key]
    body = phero(cx, C, ['services', cx.key], P['h1'], P['lead'])
    body += items_html(P['what_h'], P.get('what_p'), P['what'], sid='what')
    body += who_html(P['who_h'], P['who'])
    if P.get('cases'):
        body += cases_html(cx, C)
    body += process_html(C)
    body += pricebox_html(cx, C, P['price'], P['price_text'], quiet=not P.get('min_price'))
    body += faq_html(C, P['faq'], fog=True, tight=False)
    body += related_html(cx, C, P['related'])
    body += contact_html(cx, C)
    graph = [org_node(C), website_node(), webpage_node(cx, C, P), crumbs_ld(C, ['services', cx.key], cx.lang),
             service_node(cx, C, P), faq_node(P['faq'], cx.key, cx.lang)]
    return page(cx, C, P['title'], P['desc'], body, graph, og_title=P['og'])


def build_production(cx, C):
    P = C['pages']['production']
    fm = ''.join(f'<div class="format format--{c}">{e(l)}</div>' for c, l in [('169', '16:9'), ('11', '1:1'), ('916', '9:16')])
    body = phero(cx, C, ['services', 'production'], P['h1'], P['lead'], extra=f'<div class="formats" aria-hidden="true">{fm}</div>')
    body += items_html(P['what_h'], P.get('what_p'), P['what'], sid='what')
    body += items_html(P['why_h'], P.get('why_p'), P['why'], dark=True, sid='why')
    body += cases_html(cx, C, fog=True)
    body += pricebox_html(cx, C, P['price'], P['price_text'], quiet=True)
    body += faq_html(C, P['faq'], fog=True, tight=False)
    body += related_html(cx, C, P['related'])
    body += contact_html(cx, C)
    graph = [org_node(C), website_node(), webpage_node(cx, C, P), crumbs_ld(C, ['services', 'production'], cx.lang),
             service_node(cx, C, P), faq_node(P['faq'], cx.key, cx.lang)]
    return page(cx, C, P['title'], P['desc'], body, graph, og_title=P['og'])


def build_portfolio(cx, C):
    P = C['pages']['portfolio']
    body = phero(cx, C, ['portfolio'], P['h1'], P['lead'], ctas=False) + cases_html(cx, C, show_more=False) + \
        related_html(cx, C, ['tiktok', 'production', 'meta']) + contact_html(cx, C)
    graph = [org_node(C), website_node(), webpage_node(cx, C, P, 'CollectionPage'), crumbs_ld(C, ['portfolio'], cx.lang)]
    return page(cx, C, P['title'], P['desc'], body, graph, og_title=P['og'])


def build_pricing(cx, C):
    P = C['pages']['pricing']
    body = phero(cx, C, ['pricing'], P['h1'], P['lead'], ctas=False) + prices_html(cx, C, full=True) + \
        faq_html(C, P['faq'], fog=False, tight=False) + contact_html(cx, C)
    offers = []
    for (name, desc, val, sub, quiet), mp, monthly in zip(C['pricing']['rows'], [169, 179, 299, None, None], [False, True, True, False, False]):
        if mp:
            spec = {'@type': 'UnitPriceSpecification' if monthly else 'PriceSpecification', 'minPrice': mp, 'priceCurrency': 'EUR'}
            if monthly:
                spec['unitCode'] = 'MON'
            offers.append({'@type': 'Offer', 'name': name, 'description': desc, 'priceCurrency': 'EUR',
                           'priceSpecification': spec, 'seller': {'@id': BASE + '/#firma'}})
    graph = [org_node(C), website_node(), webpage_node(cx, C, P), crumbs_ld(C, ['pricing'], cx.lang),
             {'@type': 'OfferCatalog', '@id': absurl('pricing', cx.lang) + '#offers', 'name': P['h1'], 'itemListElement': offers},
             faq_node(P['faq'], 'pricing', cx.lang)]
    return page(cx, C, P['title'], P['desc'], body, graph, og_title=P['og'])


def build_about(cx, C):
    P = C['pages']['about']
    body = phero(cx, C, ['about'], P['h1'], P['lead'], ctas=False) + founder_html(cx, C, more=False) + \
        items_html(P['why_h'], P.get('why_p'), P['why'], dark=True, sid='why') + \
        cases_html(cx, C, fog=True) + contact_html(cx, C)
    graph = [org_node(C), person_node(C), website_node(), webpage_node(cx, C, P, 'AboutPage'), crumbs_ld(C, ['about'], cx.lang)]
    return page(cx, C, P['title'], P['desc'], body, graph, og_title=P['og'])


def build_contact(cx, C):
    P = C['pages']['contact']
    body = contact_html(cx, C, as_page=True)
    graph = [org_node(C), website_node(), webpage_node(cx, C, P, 'ContactPage'), crumbs_ld(C, ['contact'], cx.lang)]
    return page(cx, C, P['title'], P['desc'], body, graph, og_title=P['og'])


def legal_body(doc):
    out = ''
    for sec in doc['sections']:
        out += f'<h2>{e(sec["h"])}</h2>'
        for b in sec['body']:
            if isinstance(b, str):
                out += f'<p>{e(b)}</p>'
            elif 'list' in b:
                out += '<ul>' + ''.join(f'<li>{e(x)}</li>' for x in b['list']) + '</ul>'
            elif 'table' in b:
                head, *rows = b['table']
                out += ('<div class="tbl"><table><thead><tr>' + ''.join(f'<th scope="col">{e(h)}</th>' for h in head) +
                        '</tr></thead><tbody>' + ''.join('<tr>' + ''.join(f'<td>{e(c)}</td>' for c in r) + '</tr>' for r in rows) +
                        '</tbody></table></div>')
    return out


def build_legal(cx, C):
    D = LEGAL[cx.lang][cx.key]
    binding = f'<p class="binding">{e(LEGAL[cx.lang]["binding"])}</p>' if LEGAL[cx.lang].get('binding') else ''
    body = phero(cx, C, [cx.key], D['title'], D['intro'], ctas=False, plain=True)
    body += f'''<section class="section"><div class="wrap"><article class="legal">
  <p class="meta">{e(LEGAL[cx.lang]['updated'])}: {e(D['date'])}</p>
  {binding}{legal_body(D)}
</article></div></section>'''
    P = {'title': D['title'] + ' | Artemida Group', 'desc': D['desc']}
    graph = [org_node(C), website_node(), webpage_node(cx, C, P), crumbs_ld(C, [cx.key], cx.lang)]
    return page(cx, C, P['title'], P['desc'], body, graph, og_key='home', og_title=D['title'])


def build_404(cx, C):
    N = C['ui']['nf']
    links = ''.join(f'<li><a class="link" href="{cx.href(k)}">{e(C["names"][k] if k in C["names"] else C["pages"][k]["crumb"])}</a></li>'
                    for k in ['services', 'meta', 'google', 'tiktok', 'contact'] if k in C['names'] or k in C['pages'])
    body = f'''<section class="nf on-dark"><div class="wrap">
  <h1 class="display">{e(N['h'])}</h1>
  <p style="font-size:var(--t-lg);max-width:30em;color:var(--lichen)">{e(N['p'])}</p>
  <div class="ctas"><a class="btn btn--moon" href="{cx.href('home')}">{e(N['home'])}</a></div>
  <ul style="display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:40px">{links}</ul>
</div></section>'''
    return page(cx, C, N['title'], N['p'], body, None, og_key='home', robots='noindex, follow', indexable=False)


BUILDERS = {'home': build_home, 'services': build_services, 'production': build_production, 'portfolio': build_portfolio,
            'pricing': build_pricing, 'about': build_about, 'contact': build_contact}
for k in SERVICE_PAGES:
    BUILDERS[k] = build_service
for k in LEGAL_PAGES:
    BUILDERS[k] = build_legal


# ---------- build ----------

def write(rel, text):
    p = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(p) or OUT, exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(text)


def sitemap():
    x = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for k in ROUTES:
        for l in ORDER:
            x.append('  <url>')
            x.append(f'    <loc>{absurl(k, l)}</loc>')
            x.append(f'    <lastmod>{TODAY}</lastmod>')
            for l2 in ORDER:
                x.append(f'    <xhtml:link rel="alternate" hreflang="{l2}" href="{absurl(k, l2)}"/>')
            x.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{absurl(k, "pl")}"/>')
            x.append('  </url>')
    x.append('</urlset>')
    return '\n'.join(x) + '\n'


ASSETS = {}


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)
    # assets with content hash
    for kind in ['css', 'js']:
        src = open(os.path.join(HERE, 'static', f'site.{kind}'), encoding='utf-8').read()
        h = hashlib.md5(src.encode()).hexdigest()[:8]
        name = f'assets/site.{h}.{kind}'
        write(name, src)
        ASSETS[kind] = name
    for d in ['fonts']:
        shutil.copytree(os.path.join(HERE, 'static', d), os.path.join(OUT, d))
    for f in ['favicon.svg', 'apple-touch-icon.png']:
        shutil.copy(os.path.join(HERE, 'static', f), OUT)
    shutil.copytree(os.path.join(HERE, 'static', 'brand'), os.path.join(OUT, 'brand'))
    n = 0
    for l in ORDER:
        C = LANGS[l]
        for k, fn in BUILDERS.items():
            cx = Ctx(k, l)
            cx.has_form = k not in LEGAL_PAGES
            write(cx.file, fn(cx, C)); n += 1
        cx = Ctx('404', l); cx.key = '404'; cx.has_form = False
        write(cx.file, build_404(cx, C))
    if MODE == 'dist':
        write('sitemap.xml', sitemap())
        write('robots.txt', f'User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: {BASE}/sitemap.xml\n')
        write('_headers', open(os.path.join(HERE, 'static', '_headers'), encoding='utf-8').read())
        write('_redirects', open(os.path.join(HERE, 'static', '_redirects'), encoding='utf-8').read())
        if os.path.isdir(os.path.join(HERE, 'og')):
            shutil.copytree(os.path.join(HERE, 'og'), os.path.join(OUT, 'og'))
    print(f'{MODE}: {n} stron + 3x 404 -> {OUT}')


if __name__ == '__main__':
    main()
