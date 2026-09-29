"""Build the business cards: src/template.html + src/people.json -> <slug>/index.html

Usage: python3 build.py
Edit src/people.json (names, bio, links) and re-run; never edit <slug>/index.html by hand.
"""
import base64
import html
import json
import pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"

template = (SRC / "template.html").read_text()
logo = (SRC / "logo.svg").read_text().replace('width="185" height="43" ', "")
people = json.loads((SRC / "people.json").read_text())

for slug, p in people.items():
    photo = base64.b64encode((SRC / p["photo"]).read_bytes()).decode()
    data = {k: p[k] for k in ("firstName", "lastName", "role", "company", "bio", "links", "vcf")}
    page = (template
            .replace("__NAME__", html.escape(f'{p["firstName"]} {p["lastName"]}'))
            .replace("__ROLE_SHORT__", html.escape(p["roleShort"]))
            .replace("__ROLE__", html.escape(p["role"]))
            .replace("__FIRST__", html.escape(p["firstName"]))
            .replace("__LOGO__", logo)
            .replace("__PHOTO__", photo)
            .replace("__DATA__", json.dumps(data, ensure_ascii=False, indent=2)))
    out = ROOT / slug / "index.html"
    out.parent.mkdir(exist_ok=True)
    out.write_text(page)
    print("built", out.relative_to(ROOT))
