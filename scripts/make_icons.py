#!/usr/bin/env python3
"""Draws the Educator AI Toolkit mark and renders every icon from code.
Run only when the brand changes; the PNG outputs are committed to assets/."""
from PIL import Image, ImageDraw, ImageFont
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "assets"
SS = 4  # supersampling

def lerp(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def quad(p0, p1, p2, n=24):
    pts = []
    for i in range(n + 1):
        t = i / n
        pts.append(((1-t)**2*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0],
                    (1-t)**2*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1]))
    return pts

def gradient_tile(size, radius, full_bleed=False):
    c1, c2 = (20, 178, 111), (7, 94, 60)
    g = Image.new("RGB", (size, size))
    px = g.load()
    for y in range(size):
        for x in range(size):
            px[x, y] = lerp(c1, c2, (x + y) / (2 * size))
    mask = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(mask)
    if full_bleed: d.rectangle([0, 0, size, size], fill=255)
    else: d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    tile = g.convert("RGBA"); tile.putalpha(mask)
    return tile

def glyph(canvas, scale, ox, oy):
    """Open book plus gold spark, drawn in a 64-unit space."""
    d = ImageDraw.Draw(canvas)
    def P(pts): return [(ox + x * scale, oy + y * scale) for x, y in pts]
    left = quad((13, 24), (23, 21), (31, 25)) + [(31, 46)] + quad((31, 46), (23, 42), (13, 45)[::1])[::1] + [(13, 24)]
    right = quad((51, 24), (41, 21), (33, 25)) + [(33, 46)] + quad((33, 46), (41, 42), (51, 45)) + [(51, 24)]
    d.polygon(P(left), fill=(255, 255, 255, 255))
    d.polygon(P(right), fill=(255, 255, 255, 235))
    star = [(47, 8), (49.2, 13.8), (55, 16), (49.2, 18.2), (47, 24), (44.8, 18.2), (39, 16), (44.8, 13.8)]
    d.polygon(P(star), fill=(255, 211, 90, 255))

def render(size, maskable=False):
    big = size * SS
    tile = gradient_tile(big, int(big * 0.25), full_bleed=maskable)
    scale = big / 64 * (0.62 if maskable else 1.0)
    off = (big - 64 * scale) / 2
    glyph(tile, scale, off, off)
    return tile.resize((size, size), Image.LANCZOS)

def save(img, name, **kw):
    img.save(OUT / name, optimize=True, **kw)

save(render(192), "icon-192.png")
save(render(512), "icon-512.png")
save(render(512, maskable=True), "icon-maskable-512.png")
save(render(180, maskable=True), "apple-touch-icon.png")  # iOS rounds its own corners
ico = render(256)
ico.save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

# Social card 1200x630
W, H = 1200, 630
card = Image.new("RGB", (W * 2, H * 2), (250, 251, 249))
d = ImageDraw.Draw(card)
for y in range(H * 2):
    d.line([(0, y), (W * 2, y)], fill=lerp((250, 251, 249), (236, 250, 242), y / (H * 2)))
d.ellipse([W * 2 - 900, -500, W * 2 + 300, 700], fill=(255, 241, 194))
mark = render(300)
card.paste(mark, (140, 150), mark)
def font(path, size):
    try: return ImageFont.truetype(path, size)
    except OSError: return ImageFont.load_default()
bold = font("/usr/share/fonts/opentype/inter/Inter-Bold.otf", 112)
reg = font("/usr/share/fonts/opentype/inter/Inter-Medium.otf", 56)
small = font("/usr/share/fonts/opentype/inter/Inter-SemiBold.otf", 44)
d.text((140, 520), "Educator AI", font=bold, fill=(15, 25, 19))
d.text((140, 660), "Toolkit", font=bold, fill=(10, 127, 80))
d.text((140, 860), "One Claude Project. Two kinds of documents.", font=reg, fill=(77, 94, 83))
d.rounded_rectangle([140, 1000, 1640, 1100], radius=50, fill=(10, 127, 80))
d.text((190, 1022), "Lesson notes and exams, in plain words", font=small, fill=(255, 255, 255))
card = card.resize((W, H), Image.LANCZOS)
card.save(OUT / "og-image.png", optimize=True)
card.convert("P", palette=Image.ADAPTIVE, colors=128).save(OUT / "og-image.png", optimize=True)
print("icons written")
