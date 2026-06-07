# BakerLektor — Weboldal

> **PRIVÁT REPOSITORY** — GitHub Pages jelenleg kikapcsolva.

A BakerLektor weboldal forrásrepója. Kizárólag a nyilvános weboldal HTML, CSS, JavaScript, képi és dokumentációs tartalmait kezeli.

---

## Projekt célja

Ez a repo a BakerLektor dokumentumoptimalizáló alkalmazás **nyilvános bemutató weboldalát** tartalmazza. Célja:

- Az alkalmazás bemutatása potenciális felhasználóknak
- Letöltési linkek és SHA256 ellenőrzőösszegek publikálása
- Screenshotok, bemutató videók és útmutatók megjelenítése
- Supporter és kapcsolati információk közzététele

---

## Repo tartalma — engedélyezett fájltípusok

| Típus | Példa |
|-------|-------|
| HTML | `index.html`, aloldalak |
| CSS | `assets/css/style.css` |
| JavaScript | `assets/js/main.js` |
| Képek | `assets/img/logo/`, screenshotok |
| Videók | `assets/img/video/` |
| Dokumentáció | `docs/*.md` |

---

## Biztonsági szabályok

**Ez a repo NEM tartalmaz és NEM tartalmazhat:**

- Baker motor Python forráskódját
- Licencrendszert (`LICENSE_SYSTEM/`)
- Privát vagy nyilvános kriptográfiai kulcsokat (`.pem`, `.key`)
- Licencfájlokat (`license.json`, `trial.json`, `.lic`)
- `BAKER_PRIVATE_APP/` repó tartalmát
- `.env` fájlokat, titkos konfigurációkat
- Bármilyen futtatható binárist (`.exe`, `.msi`)

A részletes biztonsági szabályok: [`docs/biztonsagi_szabalyok.md`](docs/biztonsagi_szabalyok.md)

---

## Tiltott tartalmak

| Tiltott elem | Miért |
|---|---|
| `private_key.pem` | Kriptográfiai privát kulcs |
| `generate_license.py` | Licencgeneráló logika |
| `LICENSE_SYSTEM/` | Teljes licencrendszer |
| `baker_ai_optimalizalo.py` és társai | Zárt motor forráskód |
| `BAKER_PRIVATE_APP/` | Privát fejlesztői repo |
| `.env` | Titkos konfiguráció |

---

## GitHub Pages

**GitHub Pages jelenleg KIKAPCSOLVA.**

Az oldal aktiválása külön döntést igényel. Aktiválás előtt kötelező:

1. A `docs/biztonsagi_szabalyok.md` ellenőrzése
2. A `.gitignore` teljes körű áttekintése
3. Push előtti manuális ellenőrzés

---

## Repo státusz

| Property | Érték |
|---|---|
| Láthatóság | **PRIVATE** |
| GitHub Pages | **Kikapcsolva** |
| Branch | `main` |
| Kapcsolódó privát repo | `BAKER_PRIVATE_APP` (külön, zárolt) |

---

## Kapcsolódó projekt

A BakerLektor alkalmazás forráskódja a **`BAKER_PRIVATE_APP`** privát repóban van — ez a két repo teljesen elkülönített, semmilyen forráskód nem kerül át közöttük.

---

*„Az AI gyorsít. Az ember dönt."*
