#!/usr/bin/env python3
"""Generuje obrazki OG 1200x630 dla każdej strony i języka -> og/<lang>-<key>.png"""
import html, json, os
from playwright.sync_api import sync_playwright
from content_pl import C as PL
from content_ru import C as RU
from content_en import C as EN
from build import ROUTES, LEGAL_PAGES, tidy

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, 'static', 'fonts')
OUT = os.path.join(HERE, 'og')
os.makedirs(OUT, exist_ok=True)

TPL = '''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:F;src:url(file://%(f)s/flex-latin.woff2);font-weight:300 800;font-stretch:100%% 151%%;unicode-range:U+0000-00FF,U+2010-2027,U+20AC}
@font-face{font-family:F;src:url(file://%(f)s/flex-latin-ext.woff2);font-weight:300 800;font-stretch:100%% 151%%;unicode-range:U+0104-0107,U+0118-0119,U+0141-0144,U+015A-015B,U+0179-017C}
@font-face{font-family:F;src:url(file://%(f)s/flex-cyrillic.woff2);font-weight:300 800;font-stretch:100%% 151%%;unicode-range:U+0401,U+0404,U+0406-0407,U+0410-044F,U+0451,U+0454,U+0456-0457,U+0490-0491}
html,body{margin:0}
body{width:1200px;height:630px;background:#0F2B25;color:#EDEFD2;font-family:F;position:relative;overflow:hidden}
.k{position:absolute;left:72px;top:64px;font-size:30px;font-weight:480;color:#9BAEA3}
.box{position:absolute;left:72px;right:72px;top:132px;height:350px;display:flex;align-items:center}
.h{font-stretch:151%%;font-weight:640;letter-spacing:-.035em;line-height:.95;font-size:120px}
.nw{white-space:nowrap}
.bull{display:inline-block;width:.62em;height:.62em;margin-left:.1em;vertical-align:-.02em}
.b{position:absolute;left:72px;bottom:60px;font-size:28px;font-stretch:151%%;font-weight:680;letter-spacing:-.02em}
.b i{font-style:normal;font-weight:380;color:#9BAEA3}
.u{position:absolute;right:72px;bottom:62px;font-size:24px;color:#9BAEA3}
</style></head><body>
<div class="k">%(kicker)s</div>
<div class="box"><div class="h" id="h">%(title)s</div></div>
<div class="b">Artemida <i>Group</i></div>
<div class="u">%(url)s</div>
<script>
document.fonts.ready.then(()=>{const h=document.getElementById('h'),box=h.parentElement;let s=120;
while((h.scrollHeight>box.clientHeight||h.scrollWidth>box.clientWidth)&&s>48){s-=4;h.style.fontSize=s+'px'}
document.body.dataset.ready=1});
</script></body></html>'''

TARGET = ('<span class="bull"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="none" stroke="#EDEFD2" stroke-width="5"/>'
          '<circle cx="50" cy="50" r="32" fill="none" stroke="#EDEFD2" stroke-width="5"/><circle cx="50" cy="50" r="17" fill="#EDEFD2"/></svg></span>')


def title_html(t):
    return html.escape(tidy(t))


def main():
    jobs = []
    for lang, C in [('pl', PL), ('ru', RU), ('en', EN)]:
        for key in ROUTES:
            if key in LEGAL_PAGES:
                continue
            P = C['pages'][key]
            slug = ROUTES[key][lang]
            jobs.append((f'{lang}-{key}.png', C['hero']['kicker'], P['og'], 'artemidagroup.eu/' + slug))
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg = b.new_page(viewport={'width': 1200, 'height': 630})
        for name, kicker, title, url in jobs:
            doc = TPL % {'f': FONTS, 'kicker': html.escape(kicker), 'title': title_html(title), 'url': html.escape(url.rstrip('/'))}
            path = '/tmp/og_job.html'
            open(path, 'w', encoding='utf-8').write(doc)
            pg.goto('file://' + path)
            pg.wait_for_selector('body[data-ready]')
            pg.screenshot(path=os.path.join(OUT, name))
        b.close()
    print(len(jobs), 'OG images')


if __name__ == '__main__':
    main()
