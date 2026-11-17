"""Ikony marki z wektorowego znaku AG (static/brand/ag.svg).

Uruchom po zmianie znaku lub kolorów: python3 make_icons.py (wymaga rsvg-convert i Pillow).
Tło na całą powierzchnię, znak mieści się w kole: Google przycina favikonę do koła.
"""
import os, re, subprocess, io
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ST = os.path.join(HERE, 'static')
BG, FG = '#0F2B25', '#EDEFD2'
LOGO_W = 410  # szerokość znaku na płótnie 512

d = re.search(r' d="([^"]+)"', open(os.path.join(ST, 'brand', 'ag.svg'), encoding='utf-8').read()).group(1)


def square(w=LOGO_W):
    s = w / 631
    tx, ty = (512 - 631 * s) / 2, (512 - 375 * s) / 2 + 6 * s
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="{BG}"/>'
            f'<path fill="{FG}" fill-rule="evenodd" transform="translate({tx:.1f} {ty:.1f}) scale({s:.4f})" d="{d}"/></svg>')


def png(svg, size):
    out = subprocess.run(['rsvg-convert', '-w', str(size), '-h', str(size)], input=svg.encode(), capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(out)).convert('RGB')


svg = square()
open(os.path.join(ST, 'favicon.svg'), 'w', encoding='utf-8').write(svg)
png(svg, 180).save(os.path.join(ST, 'apple-touch-icon.png'), optimize=True)
for name in ('ag-512.png', 'logo.png'):  # ag-512.png: nowa nazwa omija stary cache CDN pod logo.png
    png(svg, 512).save(os.path.join(ST, 'brand', name), optimize=True)
png(svg, 192).save(os.path.join(ST, 'icon-192.png'), optimize=True)
png(svg, 256).save(os.path.join(ST, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])
print('ok')
