# Design Reference — Hi-Fi Prototype

Statyczny prototyp Hi-Fi systemu zarządzania słownikami. Renderowany w przeglądarce
przez Babel Standalone (bez build-stepu) — służy **wyłącznie jako referencja
wizualna** dla docelowej implementacji w `/frontend`.

## Otwarcie

```bash
# z katalogu repo:
cd design-reference
python3 -m http.server 8000
# i otwórz http://localhost:8000/
```

Albo po prostu otwórz `index.html` w przeglądarce (file://) — działa, bo Babel
parsuje JSX in-browser.

## Struktura

| Plik                | Zawartość                                                  |
|---------------------|------------------------------------------------------------|
| `index.html`        | Punkt wejścia, ładuje React UMD + Babel + wszystkie sceny  |
| `ds.css`            | Design system (tokens, komponenty, layout)                 |
| `design-canvas.jsx` | Płótno z artboardami (zoom, pan)                           |
| `tweaks-panel.jsx`  | Panel narzędzi do tweakowania designu                      |
| `primitives.jsx`    | Atomy: Button, Input, Chip, Badge, Tag, …                  |
| `chrome.jsx`        | Chrome aplikacji (TopBar, Sidebar, layout)                 |
| `scene-*.jsx`       | Poszczególne ekrany / scenariusze UX                       |

## Rola

Ten katalog **nie jest częścią produkcyjnego builda** — żadne narzędzie z
`/frontend` ani `/backend` go nie importuje. Trzymamy go w repo, żeby:

1. mieć źródło prawdy dla designu,
2. móc porównywać implementację 1:1 z prototypem,
3. wycofać design tokens (`ds.css`) do produkcyjnego frontu w razie potrzeby.

Gdy implementacja w `/frontend` osiągnie parytet z prototypem, ten katalog
można zamrozić (read-only) lub zarchiwizować.
