"""Build a standalone offline preview containing only public website assets."""
import argparse
import base64
import json
import mimetypes
import re
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('output', type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1] / 'site'
html = (root / 'index.html').read_text(encoding='utf-8')
css = (root / 'styles.css').read_text(encoding='utf-8')
js = (root / 'app.js').read_text(encoding='utf-8')
menu = json.loads((root / 'menu.json').read_text(encoding='utf-8'))
photo_assets = {}
for detail in menu.get('dishDetails', {}).values():
    relative = detail.get('image')
    if relative and relative not in photo_assets:
        photo_assets[relative] = 'data:image/webp;base64,' + base64.b64encode((root / relative).read_bytes()).decode()
menu['photoAssets'] = photo_assets
html = html.replace('<link rel="stylesheet" href="styles.css"><script src="app.js" defer></script>', '<style>' + css + '</style>')
for relative in set(re.findall(r'src="(assets/[^\"]+)"', html)):
    mime = mimetypes.guess_type(relative)[0]
    if mime not in {'image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'}:
        raise ValueError(f'Unsupported image type: {relative}')
    uri = 'data:' + mime + ';base64,' + base64.b64encode((root / relative).read_bytes()).decode()
    html = html.replace('src="' + relative + '"', 'src="' + uri + '"')
start = js.index("fetch('menu.json').then(response => {")
end = js.index('}).then(menu =>', start)
js = js[:start] + 'Promise.resolve(' + json.dumps(menu, ensure_ascii=False).replace('<', '\\u003c') + ')' + js[end + 2:]
html = html.replace('</body>', '<script>' + js + '</script></body>')
args.output.write_text(html, encoding='utf-8')
print(f'Saved standalone preview: {args.output}')
