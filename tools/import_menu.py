"""Extract public menu fields from a RestoFlow backup; never copy operational data."""
import argparse
import json
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('backup', type=Path)
args = parser.parse_args()
source = json.loads(args.backup.read_text(encoding='utf-8'))
categories = [{k: c[k] for k in ('id', 'ru', 'ro', 'route')} for c in source['categories'] if c.get('active')]
if any(c['route'] not in ('bar', 'kitchen') for c in categories):
    raise ValueError('Every active category must belong to bar or kitchen')
category_ids = {c['id'] for c in categories}
items = [{k: m.get(k) for k in ('id', 'ru', 'ro', 'category', 'price', 'unit', 'weighted')}
         for m in source['menu'] if m.get('active') and m['category'] in category_ids]
for item in items:
    if not isinstance(item['price'], (int, float)) or item['price'] < 0:
        raise ValueError(f"Invalid price for {item['id']}")
# Correct the single visibly misencoded litre unit; names and prices stay as supplied.
for item in items:
    if item['unit'] == '0,5 Р»':
        item['unit'] = '0,5 л'
# Keep English translations outside the backup so refreshes preserve them.
english = json.loads(Path(__file__).with_name('menu_en.json').read_text(encoding='utf-8'))
for category in categories:
    category['en'] = english['categories'].get(category['id'], '')
for item in items:
    item['en'] = english['items'].get(item['id'], '')
missing = [entry['id'] for entry in categories + items if not entry['en']]
if missing:
    raise ValueError('Add English translations to tools/menu_en.json for: ' + ', '.join(missing))
output = Path(__file__).resolve().parents[1] / 'site' / 'menu.json'
profiles = json.loads(Path(__file__).with_name('beer_profiles.json').read_text(encoding='utf-8'))
dish_details = json.loads(Path(__file__).with_name('dish_details.json').read_text(encoding='utf-8'))
if not set(dish_details).issubset({item['id'] for item in items}):
    dish_details = {key: value for key, value in dish_details.items() if key in {item['id'] for item in items}}
output.write_text(json.dumps({'currency': source['restaurant']['currency'], 'categories': categories, 'items': items, 'beerProfiles': profiles, 'dishDetails': dish_details}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Exported {len(items)} items in {len(categories)} categories to {output}')
