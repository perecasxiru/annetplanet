"""Generate small WebP versions of every comic so the website loads fast.

    comics_eng/COMIC12.png      -> comics_web/eng/12.webp   (full size view, 1600px wide)
                                -> comics_web/eng/t12.webp  (archive thumbnail, 480px wide)
    comics_cat/COMIC12_CAT.png  -> comics_web/cat/12.webp / t12.webp

Only missing files are generated, so it is fast to re-run after adding a comic.
Requires Pillow:  pip install pillow
"""
import os
import re

from PIL import Image

SOURCES = {"eng": "comics_eng", "cat": "comics_cat"}
FULL_WIDTH, FULL_QUALITY = 1600, 80
THUMB_WIDTH, THUMB_QUALITY = 480, 72


def save(img, path, width, quality):
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    img.save(path, "WEBP", quality=quality, method=6)


def run():
    made = 0
    for lang, src in SOURCES.items():
        out = os.path.join("comics_web", lang)
        os.makedirs(out, exist_ok=True)
        for name in os.listdir(src):
            m = re.match(r"COMIC(\d+)", name, re.I)
            if not m:
                continue
            n = m.group(1)
            full, thumb = os.path.join(out, n + ".webp"), os.path.join(out, "t" + n + ".webp")
            if os.path.exists(full) and os.path.exists(thumb):
                continue
            with Image.open(os.path.join(src, name)) as img:
                img = img.convert("RGB")
                save(img, full, FULL_WIDTH, FULL_QUALITY)
                save(img, thumb, THUMB_WIDTH, THUMB_QUALITY)
            made += 1
    print("optimized %d comics" % made)


if __name__ == "__main__":
    run()
