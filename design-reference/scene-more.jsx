// Quill — Dodatkowe ekrany: mapowanie kolumn, column manager, global search, tooltips, eksport w toku

// ─── 1. Import: mapowanie kolumn ─────────────────────────────────────
function SceneImportMapping() {
  // Source columns from uploaded file
  const sourceCols = [
    { name: 'iso_code',     sample: 'PL · DE · FR · UA',                       target: 'kod' },
    { name: 'country_name', sample: 'Polska · Niemcy · Francja · Ukraina',     target: 'wartość' },
    { name: 'region',       sample: 'EU · EU · EU · EUR',                      target: 'ignore' },
    { name: 'is_active',    sample: 'true · true · true · false',              target: 'status' },
    { name: 'iso3',         sample: 'POL · DEU · FRA · UKR',                   target: 'ignore' },
  ];

  const targetOptions = [
    { v: 'kod',     label: 'kod / klucz',  req: true },
    { v: 'wartość', label: 'wartość',      req: true },
    { v: 'status',  label: 'status',       req: false },
    { v: 'ignore',  label: '— pomiń —',    skip: true },
  ];

  const mappedRequired = sourceCols.filter(c => c.target === 'kod' || c.target === 'wartość').length;

  return (
    <div className="q-modal" style={{ width: 820, maxHeight: 'calc(100% - 24px)' }}>

      {/* Header z mini-stepperem */}
      <div className="q-modal-head" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 0, padding: 0 }}>
        <div className="q-row" style={{ padding: '16px 20px 0', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }}>
              Import · krok 2 z 3
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
              Zmapuj kolumny pliku
            </h2>
          </div>
          <Btn sm kind="ghost" iconOnly icon="x" />
        </div>

        <div className="q-stepper" style={{ paddingTop: 12, paddingBottom: 12 }}>
          <div className="q-step is-done"><span className="q-step-dot"><Icon name="check" size={11} strokeWidth={3} /></span>Wgranie pliku</div>
          <span className="q-step-bar" />
          <div className="q-step is-active"><span className="q-step-dot">2</span>Mapowanie</div>
          <span className="q-step-bar" />
          <div className="q-step"><span className="q-step-dot">3</span>Podsumowanie</div>
        </div>
      </div>

      <div className="q-modal-body">

        {/* File info */}
        <div className="q-row" style={{ marginBottom: 16, padding: 12, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', gap: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: 'var(--success-soft)', color: 'var(--success)',
            border: '1px solid var(--success-border)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
          }}>
            <Icon name="file-csv" size={15} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>countries-export-2026.csv</div>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
              254 wierszy · 5 kolumn źródłowych · 18 KB · UTF-8 · separator <code className="q-code" style={{ background: 'var(--bg)', padding: '1px 5px', borderRadius: 4 }}>,</code>
            </div>
          </div>
          <Pill kind="success"><Icon name="check" size={10} /> auto-wykryto 3 mapowania</Pill>
        </div>

        <div className="q-row" style={{ marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
            Mapowanie kolumn
          </span>
          <div className="q-spacer" />
          <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
            <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>{mappedRequired}/2</strong> wymaganych zmapowanych
          </span>
        </div>

        {/* Mapping table */}
        <div style={{
          border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
          overflow: 'hidden', marginBottom: 16,
        }}>
          {/* Header */}
          <div className="q-row" style={{
            padding: '8px 14px',
            background: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--border)',
            fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--fg-muted)',
          }}>
            <span style={{ minWidth: 170 }}>Kolumna w pliku</span>
            <span style={{ flex: 1 }}>Podgląd (pierwsze 4 wiersze)</span>
            <span style={{ width: 28, textAlign: 'center' }}><Icon name="arrow-right" size={12} /></span>
            <span style={{ width: 200 }}>Pole w słowniku</span>
          </div>

          {sourceCols.map((col, i) => {
            const skip = col.target === 'ignore';
            return (
              <div key={col.name} className="q-row" style={{
                padding: '11px 14px',
                borderTop: i === 0 ? '0' : '1px solid var(--border-soft)',
                opacity: skip ? 0.55 : 1,
              }}>
                <code className="q-code" style={{
                  background: 'var(--bg-muted)', padding: '3px 8px', borderRadius: 4,
                  fontSize: 12, fontWeight: 600, minWidth: 170,
                  textDecoration: skip ? 'line-through' : 'none',
                  textDecorationColor: 'var(--fg-faint)',
                }}>{col.name}</code>
                <span style={{
                  flex: 1, fontSize: 11, color: 'var(--fg-muted)',
                  fontFamily: 'var(--font-mono)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  paddingRight: 10,
                }}>{col.sample}</span>
                <span style={{ width: 28, display: 'flex', justifyContent: 'center', color: 'var(--fg-faint)' }}>
                  <Icon name="arrow-right" size={12} />
                </span>
                <div style={{ width: 200, position: 'relative' }}>
                  <select className="q-input q-select" defaultValue={col.target} style={{ fontSize: 12, height: 30 }}>
                    {targetOptions.map(o => (
                      <option key={o.v} value={o.v}>
                        {o.label}{o.req ? ' *' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        {/* Validation summary */}
        <div className="q-banner q-banner-success" style={{ marginBottom: 0 }}>
          <span className="q-banner-icon is-success"><Icon name="check" size={14} strokeWidth={2.5} /></span>
          <div style={{ flex: 1 }}>
            <div className="q-banner-title">Mapowanie kompletne</div>
            <div className="q-banner-sub" style={{ marginTop: 4 }}>
              Pola wymagane (<strong>kod</strong>, <strong>wartość</strong>) i status zostały zmapowane. <strong>2</strong> kolumny zostaną pominięte (<code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4 }}>region</code>, <code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4 }}>iso3</code>).
            </div>
          </div>
        </div>

      </div>

      <div className="q-modal-foot">
        <div className="q-row" style={{ gap: 6, fontSize: 12, color: 'var(--fg-muted)' }}>
          <Icon name="info" size={12} />
          <span>Mapowanie zostanie zapamiętane jako szablon dla tego pliku</span>
        </div>
        <div className="q-spacer" />
        <Btn icon="arrow-left">Wstecz</Btn>
        <Btn kind="primary" iconRight="arrow-right">Dalej · podsumowanie</Btn>
      </div>
    </div>
  );
}


// ─── 2. Column manager popover ───────────────────────────────────────
function SceneColumnManager() {
  const cols = [
    { key: 'check',   label: 'Zaznaczenie',   visible: true,  locked: true },
    { key: 'code',    label: 'Kod / Klucz',   visible: true,  locked: true },
    { key: 'desc',    label: 'Opis / Wartość',visible: true,  locked: true },
    { key: 'region',  label: 'Region',        visible: true },
    { key: 'status',  label: 'Status',        visible: true },
    { key: 'actions', label: 'Akcje',         visible: true,  locked: true },
    { key: 'updated', label: 'Ostatnia zmiana',visible: false },
    { key: 'author',  label: 'Autor zmiany',  visible: false },
    { key: 'created', label: 'Data utworzenia',visible: false },
    { key: 'version', label: 'Wersja',        visible: false },
  ];

  return (
    <>
      <SceneMainView dict="countries" selectedRows={[]} />

      {/* Highlight ring on the columns button in toolbar */}
      <div style={{
        position: 'absolute',
        top: 196, left: 870, // przycisk "Konfiguracja kolumn" w toolbarze
        width: 26, height: 26, borderRadius: 'var(--r)',
        background: 'var(--bg-muted)',
        border: '1px solid var(--border)',
        zIndex: 25,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--fg)',
      }}>
        <Icon name="columns" size={14} />
      </div>

      {/* Popover */}
      <div style={{
        position: 'absolute',
        top: 228, left: 654,
        width: 320,
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 30,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '10px 14px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-subtle)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="columns" size={14} color="var(--fg-muted)" />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Kolumny</span>
          <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
            {cols.filter(c => c.visible).length}/{cols.length}
          </span>
          <div className="q-spacer" />
          <Btn sm kind="ghost" iconOnly icon="x" />
        </div>

        <div style={{ padding: 4, maxHeight: 360, overflowY: 'auto' }}>
          {cols.map(c => (
            <div key={c.key} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 10px',
              borderRadius: 'var(--r-sm)',
              cursor: c.locked ? 'not-allowed' : 'grab',
              color: 'var(--fg)',
              opacity: c.locked ? 0.55 : 1,
            }}
            onMouseEnter={e => { if (!c.locked) e.currentTarget.style.background = 'var(--bg-muted)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; }}
            >
              <Icon name="kebab" size={12} color="var(--fg-faint)" />
              <Check checked={c.visible} />
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{c.label}</span>
              {c.locked && (
                <span style={{ fontSize: 10, color: 'var(--fg-faint)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  <Icon name="lock" size={9} /> stała
                </span>
              )}
            </div>
          ))}
        </div>

        <div style={{
          padding: '8px 14px',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-subtle)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Btn sm kind="ghost">Resetuj domyślne</Btn>
          <div className="q-spacer" />
          <Btn sm kind="primary">Zastosuj</Btn>
        </div>
      </div>
    </>
  );
}


// ─── 3. Global search results (Cmd+K spotlight) ──────────────────────
function SceneGlobalSearch() {
  return (
    <>
      <SceneDictionaryList />
      <div className="q-scrim" style={{ alignItems: 'flex-start', paddingTop: 100 }}>
        <div style={{
          width: 640,
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          maxHeight: 560, display: 'flex', flexDirection: 'column',
        }}>

          {/* Search input */}
          <div className="q-row" style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border)',
            gap: 10,
          }}>
            <Icon name="search" size={16} color="var(--fg-muted)" />
            <input
              autoFocus
              defaultValue="polska"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 15, color: 'var(--fg)', fontFamily: 'var(--font-sans)',
              }}
            />
            <span style={{ fontSize: 11, color: 'var(--fg-faint)', fontFamily: 'var(--font-mono)',
              border: '1px solid var(--border)', padding: '1px 6px', borderRadius: 4, background: 'var(--bg-subtle)' }}>
              ESC
            </span>
          </div>

          {/* Results scroll */}
          <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>

            {/* Group: Wpisy */}
            <div style={{
              padding: '6px 18px 4px',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
              textTransform: 'uppercase', color: 'var(--fg-muted)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ flex: 1 }}>Wpisy w słownikach</span>
              <span style={{ color: 'var(--fg-faint)', fontWeight: 500 }}>3 wyniki</span>
            </div>

            {[
              { dict: 'Kraje', code: 'PL', desc: <>Pol<strong style={{ background: 'rgba(37,99,235,0.16)', color: 'var(--primary)', padding: '0 1px' }}>ska</strong> — Rzeczpospolita Polska</>, status: 'active', icon: 'globe', selected: true },
              { dict: 'Waluty', code: 'PLN', desc: <>Złoty <strong style={{ background: 'rgba(37,99,235,0.16)', color: 'var(--primary)', padding: '0 1px' }}>pol</strong>ski</>, status: 'active', icon: 'coins' },
              { dict: 'Języki', code: 'pl', desc: <>język <strong style={{ background: 'rgba(37,99,235,0.16)', color: 'var(--primary)', padding: '0 1px' }}>pol</strong>ski</>, status: 'active', icon: 'languages' },
            ].map((r, i) => (
              <div key={i} className="q-row" style={{
                padding: '9px 18px', gap: 12,
                background: r.selected ? 'var(--bg-muted)' : 'transparent',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: 'var(--bg-subtle)', border: '1px solid var(--border)',
                  color: 'var(--fg-soft)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
                }}>
                  <Icon name={r.icon} size={13} />
                </div>
                <code className="q-code" style={{
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  padding: '2px 7px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                  minWidth: 50, textAlign: 'center',
                }}>{r.code}</code>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.desc}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>w słowniku <strong style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>{r.dict}</strong></div>
                </div>
                <StatusPill status={r.status} />
                {r.selected && (
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)',
                    border: '1px solid var(--border)', padding: '1px 5px', borderRadius: 4, background: 'var(--bg)' }}>
                    ↵ otwórz
                  </span>
                )}
              </div>
            ))}

            {/* Group: Słowniki */}
            <div style={{
              padding: '14px 18px 4px',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
              textTransform: 'uppercase', color: 'var(--fg-muted)',
              display: 'flex', alignItems: 'center', gap: 8,
              borderTop: '1px solid var(--border-soft)', marginTop: 4,
            }}>
              <span style={{ flex: 1 }}>Słowniki</span>
              <span style={{ color: 'var(--fg-faint)', fontWeight: 500 }}>1 wynik</span>
            </div>

            <div className="q-row" style={{ padding: '9px 18px', gap: 12, cursor: 'pointer' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: 'var(--bg-subtle)', border: '1px solid var(--border)',
                color: 'var(--fg-soft)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
              }}>
                <Icon name="globe" size={13} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--fg)' }}>Kraje</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>
                  ISO 3166-1 · 254 wpisów
                </div>
              </div>
              <Pill ghost>słownik</Pill>
            </div>

            {/* Group: Historia */}
            <div style={{
              padding: '14px 18px 4px',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
              textTransform: 'uppercase', color: 'var(--fg-muted)',
              display: 'flex', alignItems: 'center', gap: 8,
              borderTop: '1px solid var(--border-soft)', marginTop: 4,
            }}>
              <span style={{ flex: 1 }}>Historia zmian</span>
              <span style={{ color: 'var(--fg-faint)', fontWeight: 500 }}>2 wyniki</span>
            </div>

            {[
              { who: 'A. Nowak', desc: <>edytowała opis <code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4 }}>PL</code> w słowniku <strong style={{ color: 'var(--fg-soft)' }}>Kraje</strong></>, when: 'dziś, 11:08' },
              { who: 'sys.bot',  desc: <>zaimportowano <strong style={{ color: 'var(--fg-soft)' }}>Polska</strong> w słowniku <strong style={{ color: 'var(--fg-soft)' }}>Kraje</strong></>, when: '03 sty 2024' },
            ].map((e, i) => (
              <div key={i} className="q-row" style={{ padding: '9px 18px', gap: 12, cursor: 'pointer' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: 'var(--bg-subtle)', border: '1px solid var(--border)',
                  color: 'var(--fg-muted)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
                }}>
                  <Icon name="history" size={13} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--fg)' }}><strong style={{ fontWeight: 600 }}>{e.who}</strong> {e.desc}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>{e.when}</div>
                </div>
              </div>
            ))}

          </div>

          {/* Foot — keyboard shortcuts */}
          <div className="q-row" style={{
            padding: '10px 18px',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-subtle)',
            fontSize: 11, color: 'var(--fg-muted)', gap: 14,
          }}>
            <span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--fg-soft)' }}>↑↓</span> nawiguj</span>
            <span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--fg-soft)' }}>↵</span> otwórz</span>
            <span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--fg-soft)' }}>⌘↵</span> w nowej karcie</span>
            <div className="q-spacer" />
            <span><strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>6</strong> wyników w <strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>3</strong> słownikach</span>
          </div>
        </div>
      </div>
    </>
  );
}


// ─── 9. Tooltips showcase ────────────────────────────────────────────
function Tooltip({ text, sub, x, y, anchor = 'top' }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 40, pointerEvents: 'none' }}>
      {/* Arrow */}
      <span style={{
        position: 'absolute',
        left: 14, top: anchor === 'top' ? -4 : 'auto', bottom: anchor === 'top' ? 'auto' : -4,
        width: 8, height: 8,
        background: 'var(--fg)',
        transform: 'rotate(45deg)',
      }} />
      <div style={{
        background: 'var(--fg)', color: 'var(--fg-inverse)',
        padding: '8px 12px',
        borderRadius: 'var(--r)',
        fontSize: 12,
        boxShadow: 'var(--shadow-lg)',
        maxWidth: 260,
        lineHeight: 1.45,
        position: 'relative',
      }}>
        <div style={{ fontWeight: 600 }}>{text}</div>
        {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 3 }}>{sub}</div>}
      </div>
    </div>
  );
}

function SceneTooltips() {
  return (
    <>
      <SceneMainView dict="countries" selectedRows={[]} />

      {/* Tooltip 1: status pill — hover na pierwszym wierszu */}
      <Tooltip
        x={870} y={350}
        text="Status: aktywny"
        sub="Wpis widoczny dla użytkowników końcowych i dostępny przez API od 04.01.2024"
      />

      {/* Tooltip 2: liczba wpisów w nagłówku */}
      <Tooltip
        x={185} y={138}
        text="254 wpisów łącznie"
        sub="246 aktywnych · 1 szkic · 7 archiwum"
      />

      {/* Tooltip 3: na ikonce sidebar (Kraje) */}
      <Tooltip
        x={180} y={186}
        text="Kraje"
        sub="ISO 3166-1 · 254 wpisów · ostatnia zmiana dziś, 14:22"
      />

      {/* Tooltip 4: na akcji w prawym górnym rogu */}
      <Tooltip
        x={1010} y={170}
        text="Historia zmian"
        sub="Pełen dziennik audytowy słownika"
        anchor="top"
      />
    </>
  );
}


// ─── 10. Eksport w toku — toast z progress ──────────────────────────
function ExportProgressToast({ percent = 47, eta = '8 s', count = 254 }) {
  return (
    <div style={{
      position: 'absolute', right: 20, bottom: 20,
      width: 360,
      background: 'var(--fg)', color: 'var(--fg-inverse)',
      borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: '14px 16px',
      zIndex: 20,
    }}>
      <div className="q-row" style={{ marginBottom: 10 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 999,
          background: 'rgba(255,255,255,0.10)',
          color: '#93c5fd',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
        }}>
          <Icon name="download" size={14} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Eksportowanie słownika</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>
            Kraje · CSV · {count} wpisów
          </div>
        </div>
        <Btn sm kind="ghost" iconOnly icon="x" style={{ color: 'rgba(255,255,255,0.55)' }} />
      </div>

      {/* Progress bar */}
      <div style={{
        height: 6, background: 'rgba(255,255,255,0.12)',
        borderRadius: 99, overflow: 'hidden', marginBottom: 8,
      }}>
        <div style={{
          width: `${percent}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
          borderRadius: 99,
          transition: 'width .3s ease',
        }} />
      </div>

      <div className="q-row" style={{ fontSize: 11 }}>
        <span style={{ color: 'rgba(255,255,255,0.75)' }}>
          <strong style={{ color: '#fff', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{Math.round(count * percent / 100)}</strong>
          {' / '}{count} wierszy
        </span>
        <div className="q-spacer" />
        <span style={{ color: 'rgba(255,255,255,0.65)' }}>~{eta} pozostało</span>
        <span style={{
          color: '#fff', fontWeight: 600, fontVariantNumeric: 'tabular-nums',
          marginLeft: 8,
        }}>{percent}%</span>
      </div>

      {/* Footer actions */}
      <div className="q-row" style={{ gap: 8, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <Icon name="info" size={11} />
          Plik zostanie pobrany automatycznie po zakończeniu
        </span>
        <div className="q-spacer" />
        <span style={{
          fontSize: 11, fontWeight: 500, color: '#fca5a5', cursor: 'pointer',
        }}>Anuluj</span>
      </div>
    </div>
  );
}

function SceneExportProgress() {
  return (
    <>
      <SceneMainView dict="countries" selectedRows={[]} />
      <ExportProgressToast percent={47} eta="8 s" count={254} />
    </>
  );
}

Object.assign(window, {
  SceneImportMapping, SceneColumnManager, SceneGlobalSearch,
  Tooltip, SceneTooltips, ExportProgressToast, SceneExportProgress,
});
