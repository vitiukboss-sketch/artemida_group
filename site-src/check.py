#!/usr/bin/env python3
"""Automatyczny audyt SEO dla dist/: linki, hreflang, canonical, JSON-LD, tytuły, H1, duplikaty."""
import json, os, re, sys
from collections import defaultdict
from html.parser import HTMLParser

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')
BASE = 'https://artemidagroup.eu'


def url_to_file(u):
    p = u.replace(BASE, '')
    p = p.split('#')[0].split('?')[0]
    if p.endswith('/'):
        return p.lstrip('/') + 'index.html'
    cand = p.lstrip('/')
    if os.path.splitext(cand)[1]:
        return cand
    return cand + '.html'


class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.alts, self.ld, self.h1, self.meta = [], {}, [], 0, {}
        self.canon = None; self.title = ''; self._t = False; self._ld = False; self._buf = ''; self.ids = set(); self.lang = None
        self.imgs_noalt = 0

    def handle_starttag(self, tag, a):
        a = dict(a)
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'link' and a.get('rel') == 'alternate' and a.get('hreflang'): self.alts[a['hreflang']] = a['href']
        if tag == 'link' and a.get('rel') == 'canonical': self.canon = a['href']
        if tag == 'link' and a.get('rel') in ('stylesheet', 'icon', 'apple-touch-icon', 'preload'): self.links.append(a['href'])
        if tag == 'script' and a.get('src'): self.links.append(a['src'])
        if tag == 'meta': self.meta[a.get('name') or a.get('property')] = a.get('content')
        if tag == 'h1': self.h1 += 1
        if tag == 'title': self._t = True
        if tag == 'script' and a.get('type') == 'application/ld+json': self._ld = True; self._buf = ''
        if tag == 'img' and not a.get('alt'): self.imgs_noalt += 1

    def handle_endtag(self, tag):
        if tag == 'title': self._t = False
        if tag == 'script' and self._ld: self.ld.append(self._buf); self._ld = False

    def handle_data(self, d):
        if self._t: self.title += d
        if self._ld: self._buf += d


pages = {}
for dp, _, fs in os.walk(ROOT):
    for f in fs:
        if f.endswith('.html'):
            rel = os.path.relpath(os.path.join(dp, f), ROOT)
            p = P(); p.feed(open(os.path.join(dp, f), encoding='utf-8').read()); pages[rel] = p

errors, warns = [], []
titles, descs = defaultdict(list), defaultdict(list)
for rel, p in pages.items():
    is404 = rel.endswith('404.html')
    for h in p.links:
        if h.startswith(('mailto:', 'tel:', 'https://www.google.com/maps')): continue
        if h.startswith('#'):
            if h[1:] and h[1:] not in p.ids: errors.append(f'{rel}: missing anchor {h}')
            continue
        if h.startswith('http'): continue
        f = url_to_file(h)
        if not os.path.exists(os.path.join(ROOT, f)): errors.append(f'{rel}: broken link {h}')
    if p.h1 != 1: errors.append(f'{rel}: {p.h1} x H1')
    if p.imgs_noalt: errors.append(f'{rel}: img without alt')
    for x in p.ld:
        try: json.loads(x)
        except Exception as ex: errors.append(f'{rel}: bad JSON-LD {ex}')
    if is404:
        if 'noindex' not in (p.meta.get('robots') or ''): errors.append(f'{rel}: 404 without noindex')
        continue
    if not p.canon: errors.append(f'{rel}: no canonical'); continue
    if url_to_file(p.canon) != rel: errors.append(f'{rel}: canonical points to {p.canon}')
    if set(p.alts) != {'pl', 'ru', 'en', 'x-default'}: errors.append(f'{rel}: hreflang set {sorted(p.alts)}')
    if p.alts.get(p.lang) != p.canon: errors.append(f'{rel}: self hreflang mismatch')
    for l, u in p.alts.items():
        tf = url_to_file(u)
        if tf not in pages: errors.append(f'{rel}: hreflang {l} -> missing {u}'); continue
        back = pages[tf].alts
        if back.get(p.lang) != p.canon: errors.append(f'{rel}: hreflang {l} not reciprocal')
    tl, dl = len(p.title), len(p.meta.get('description') or '')
    if tl > 65 or tl < 30: warns.append(f'{rel}: title {tl} chars: {p.title}')
    if dl > 160 or dl < 110: warns.append(f'{rel}: description {dl} chars')
    titles[p.title].append(rel); descs[p.meta.get('description')].append(rel)
    if not (p.meta.get('og:image') or '').startswith(BASE + '/og/'): errors.append(f'{rel}: og:image')
    elif not os.path.exists(os.path.join(ROOT, url_to_file(p.meta['og:image']))): errors.append(f'{rel}: og image file missing')

for t, rs in titles.items():
    if len(rs) > 1: errors.append(f'duplicate title {t!r}: {rs}')
for d, rs in descs.items():
    if len(rs) > 1: errors.append(f'duplicate description: {rs}')

# sitemap
sm = open(os.path.join(ROOT, 'sitemap.xml'), encoding='utf-8').read()
locs = re.findall(r'<loc>(.*?)</loc>', sm)
for u in locs:
    if url_to_file(u) not in pages: errors.append(f'sitemap: {u} has no file')
indexable = [r for r in pages if not r.endswith('404.html')]
if len(locs) != len(indexable): errors.append(f'sitemap has {len(locs)} urls, site has {len(indexable)} pages')

print(f'pages: {len(pages)}, sitemap urls: {len(locs)}')
print('ERRORS:', len(errors)); [print('  ', x) for x in errors[:60]]
print('WARNINGS:', len(warns)); [print('  ', x) for x in warns[:60]]
sys.exit(1 if errors else 0)
