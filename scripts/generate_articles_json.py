import os, json

ARTICLES_DIR = "articles"
OUTPUT_FILE = "articles.json"

articles = []

for filename in sorted(os.listdir(ARTICLES_DIR)):
    if not filename.endswith(".md"):
        continue

    path = os.path.join(ARTICLES_DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        lines = f.read().splitlines()

    title = lines[0].lstrip("# ").strip() if lines else filename.replace(".md", "")
    tags, desc = [], ""

    # detect tag line
    if len(lines) > 1 and lines[1].startswith("@"):
        tags = [t.lstrip("@") for t in lines[1].split()]
        for line in lines[2:]:
            if line.strip():
                desc = line.strip()
                break
    else:
        for line in lines[1:]:
            if line.strip():
                desc = line.strip()
                break

    articles.append({
        "title": title,
        "desc": desc,
        "file": filename,
        "tags": tags
    })

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)

print(f"✅ Generated {OUTPUT_FILE} with {len(articles)} entries.")
