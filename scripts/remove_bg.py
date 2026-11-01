import sys
import os
from PIL import Image

sys.path.insert(0, '/Users/mohammedanas/Library/Python/3.9/lib/python/site-packages')
from rembg import remove

images = [
    ('public/gingelly-oil.jpg', 'public/gingelly-oil-nobg.png'),
    ('public/coconut-oil.jpg', 'public/coconut-oil-nobg.png'),
    ('public/groundnut-oil.jpg', 'public/groundnut-oil-nobg.png'),
    ('public/hero-bottles.jpg', 'public/hero-bottles-nobg.png')
]

for src, dst in images:
    if os.path.exists(src):
        print(f"Processing {src} -> {dst}...")
        inp = Image.open(src)
        out = remove(inp)
        out.save(dst)
        print(f"Saved {dst}")
    else:
        print(f"Not found: {src}")

print("All background removals complete!")

