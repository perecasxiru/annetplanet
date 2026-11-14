"""Run after adding a new comic to comics_eng/ and comics_cat/.

1. creates the /eng/cmc/comicN and /cat/cmc/comicN pages (direct links to each comic)
2. updates num_last_eng.txt / num_last_cat.txt
3. generates the optimized WebP versions (needs: pip install pillow)
"""
import os
import shutil

os.chdir(os.path.dirname(os.path.abspath(__file__)))

for lang, src in (("eng", "comics_eng"), ("cat", "comics_cat")):
    files = [f for f in os.listdir(src) if f.upper().startswith("COMIC")]
    template = os.path.join(lang, "index.html")
    cmc = os.path.join(lang, "cmc")
    shutil.rmtree(cmc, ignore_errors=True)  # regenerate so pages always match the template
    for name in files:
        n = name.split(".")[0].split("_")[0].lower()  # COMIC12_CAT.png -> comic12
        os.makedirs(os.path.join(cmc, n), exist_ok=True)
        shutil.copy(template, os.path.join(cmc, n, "index.html"))
    with open("num_last_%s.txt" % lang, "w") as f:
        f.write(str(len(files)))

try:
    import optimize_images
    optimize_images.run()
except ImportError:
    print("Pillow not installed: run 'pip install pillow' then 'python optimize_images.py'")
