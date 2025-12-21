import json

def get_keys(d, prefix=''):
    keys = []
    for k, v in d.items():
        full_key = f"{prefix}.{k}" if prefix else k
        keys.append(full_key)
        if isinstance(v, dict):
            keys.extend(get_keys(v, full_key))
    return set(keys)

with open('/Users/hyeonwoo/Documents/cheatset/src/dictionaries/ko.json', 'r') as f:
    ko_data = json.load(f)

with open('/Users/hyeonwoo/Documents/cheatset/src/dictionaries/ja.json', 'r') as f:
    ja_data = json.load(f)

ko_keys = get_keys(ko_data)
ja_keys = get_keys(ja_data)

missing_in_ja = ko_keys - ja_keys
missing_sorted = sorted(list(missing_in_ja))

print("Missing keys in ja.json (vs ko.json):")
for key in missing_sorted:
    print(key)

print(f"\nTotal missing: {len(missing_sorted)}")
