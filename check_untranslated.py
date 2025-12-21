import json
import re

def is_mostly_english(text):
    if not isinstance(text, str):
        return False
    # Remove common symbols and numbers
    clean_text = re.sub(r'[0-9\W]+', '', text)
    if not clean_text:
        return False
    # Check if mostly ASCII (English characters)
    ascii_count = len([c for c in clean_text if ord(c) < 128])
    return (ascii_count / len(clean_text)) > 0.8

def find_untranslated(d, prefix=''):
    untranslated = []
    for k, v in d.items():
        full_key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            untranslated.extend(find_untranslated(v, full_key))
        elif isinstance(v, str):
            # Skip keys that are naturally English (e.g. codes, typical single words like 'UUID')
            # But descriptions and titles should definitely not be English.
            if "description" in full_key or "title" in full_key or "content" in full_key or "question" in full_key or "answer" in full_key:
                 if is_mostly_english(v):
                     untranslated.append((full_key, v))
    return untranslated

with open('/Users/hyeonwoo/Documents/cheatset/src/dictionaries/ja.json', 'r') as f:
    ja_data = json.load(f)

untranslated = find_untranslated(ja_data)

print("Potentially untranslated English content in ja.json:")
for key, value in untranslated:
    # Filter out obvious false positives if needed
    print(f"{key}: {value[:50]}...")

print(f"\nTotal potential untranslated: {len(untranslated)}")
