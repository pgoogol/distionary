// Quill — Import wizard (3 states)

function ImportShell({ title, sub, step, onClose, children, footer }) {
  const steps = [
    { n: 1, label: 'Plik & konfiguracja' },
    { n: 2, label: 'Walidacja' },
    { n: 3, label: 'Podsumowanie' },
  ];
  return (
    <div className="q-modal" style={{ width: 760 }}>
      <div className="q-modal-head">
        <div style={{ flex: 1 }}>
          <div className="q-modal-title">{title}</div>
          <div className="q-modal-sub">{sub || 'Słownik: Kraje · obsługiwane formaty: CSV, JSON, XLSX · max. 5 MB'}</div>
        </div>
        <Btn sm kind="ghost" iconOnly icon="x" onClick={onClose} title="Zamknij" />
      </div>

      <div className="q-stepper">
        {steps.map((s, i) => {
          const isDone = s.n < step;
          const isActive = s.n === step;
          const cls = ['q-step', isActive ? 'is-active' : '', isDone ? 'is-done' : ''].filter(Boolean).join(' ');
          return (
            <React.Fragment key={s.n}>
              <div className={cls}>
                <span className="q-step-dot">
                  {isDone ? <Icon name="check" size={12} color="#fff" strokeWidth={3} /> : s.n}
                </span>
                <span style={{ fontWeight: isActive ? 600 : 500 }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <span className="q-step-bar" />}
            </React.Fragment>
          );
        })}
      </div>

      <div className="q-modal-body">{children}</div>
      {footer && <div className="q-modal-foot">{footer}</div>}
    </div>
  );
}

// ─── State 1: initial / drag-drop ──────────────────────────────────────
function SceneImportInitial() {
  return (
    <ImportShell
      title="Importuj wpisy do słownika"
      step={1}
      footer={<>
        <Pill ghost><Icon name="paperclip" size={10} /> nie wybrano pliku</Pill>
        <div className="q-spacer" />
        <Btn kind="ghost">Anuluj</Btn>
        <Btn kind="primary" iconRight="arrow-right" disabled>Waliduj plik</Btn>
      </>}
    >
      <div className="q-dropzone" style={{ marginBottom: 18 }}>
        <span className="q-dropzone-icon"><Icon name="upload" size={22} /></span>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>
          Przeciągnij plik tutaj
        </div>
        <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 14 }}>
          lub kliknij, aby wybrać z dysku · <span className="q-mono" style={{ color: 'var(--fg-soft)' }}>.csv .json .xlsx</span> · do 5 MB
        </div>
        <div className="q-row" style={{ justifyContent: 'center', gap: 8 }}>
          <Btn icon="file">Wybierz plik z dysku</Btn>
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: 'var(--fg-muted)' }}>
          Nie masz szablonu? <a href="#" className="q-btn-link" style={{ display: 'inline', padding: 0 }}>Pobierz szablon CSV</a> lub <a href="#" className="q-btn-link" style={{ display: 'inline', padding: 0 }}>JSON</a>
        </div>
      </div>

      {/* Conflict strategy */}
      <div style={{ marginBottom: 14 }}>
        <div className="q-label" style={{ marginBottom: 8 }}>
          Strategia konfliktów
          <span style={{ fontWeight: 400, color: 'var(--fg-muted)' }}>— co zrobić, gdy klucz z pliku już istnieje?</span>
        </div>
        <div className="q-col" style={{ gap: 8 }}>
          <RadioCard
            checked
            title="Nadpisz istniejące wpisy"
            sub="Zaktualizuj opis, metadane i tłumaczenia istniejących kluczy. Nowe klucze zostaną dodane."
          />
          <RadioCard
            title="Pomiń istniejące"
            sub="Dodaj tylko nowe klucze. Istniejące wpisy pozostaną bez zmian."
          />
          <RadioCard
            title="Tylko walidacja (dry-run)"
            sub="Pokaż co się zmieni, ale nic nie zapisuj w bazie."
          />
        </div>
      </div>

      {/* Advanced options collapsed */}
      <div style={{
        padding: '10px 14px',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--bg)', cursor: 'pointer',
      }}>
        <Icon name="chevron-right" size={14} color="var(--fg-muted)" />
        <span style={{ fontSize: 13, fontWeight: 500 }}>Opcje zaawansowane</span>
        <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>kodowanie · separator · mapowanie kolumn</span>
        <div className="q-spacer" />
        <Pill ghost><span className="q-mono" style={{ fontSize: 11 }}>UTF-8 · "," · auto</span></Pill>
      </div>
    </ImportShell>
  );
}

// ─── State 1b: advanced options expanded ───────────────────────────────
function SceneImportAdvanced() {
  const mapping = [
    { src: 'kod',      dst: 'kod',      req: true,  status: 'ok' },
    { src: 'wartość', dst: 'wartość', req: true,  status: 'ok' },
    { src: 'status',   dst: 'status',   req: true,  status: 'ok' },
  ];
  const statusPill = (s) => {
    if (s === 'ok')     return <Pill kind="success"><Icon name="check" size={10} strokeWidth={3} /> auto</Pill>;
    if (s === 'manual') return <Pill kind="info"><Icon name="edit" size={10} /> ręcznie</Pill>;
    return <Pill ghost><Icon name="minus" size={10} /> pomiń</Pill>;
  };

  return (
    <ImportShell
      title="Importuj wpisy do słownika"
      sub="import-2026-05.csv · 150 wierszy · 1,2 MB · wykryto kodowanie UTF-8"
      step={1}
      footer={<>
        <Pill ghost><Icon name="file-csv" size={10} /> import-2026-05.csv</Pill>
        <Pill kind="info"><Icon name="check" size={10} strokeWidth={3} /> 3 z 3 kolumn zmapowanych</Pill>
        <div className="q-spacer" />
        <Btn kind="ghost">Anuluj</Btn>
        <Btn kind="primary" iconRight="arrow-right">Waliduj plik</Btn>
      </>}
    >
      {/* Selected file — replaces dropzone */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 14px', marginBottom: 16,
        border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
        background: 'var(--bg-subtle)',
      }}>
        <span style={{
          width: 36, height: 36, borderRadius: 8,
          background: 'var(--bg)', border: '1px solid var(--border)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--fg-soft)',
        }}><Icon name="file-csv" size={18} /></span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>import-2026-05.csv</div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>
            150 wierszy · 3 kolumny · 1,2 MB · ostatnia modyfikacja 14 maja 2026
          </div>
        </div>
        <Btn sm kind="ghost" icon="refresh">Zmień plik</Btn>
        <Btn sm kind="ghost" iconOnly icon="x" title="Usuń plik" />
      </div>

      {/* Conflict strategy — full stacked, identical to initial state */}
      <div style={{ marginBottom: 14 }}>
        <div className="q-label" style={{ marginBottom: 8 }}>
          Strategia konfliktów
          <span style={{ fontWeight: 400, color: 'var(--fg-muted)' }}>— co zrobić, gdy klucz z pliku już istnieje?</span>
        </div>
        <div className="q-col" style={{ gap: 8 }}>
          <RadioCard
            checked
            title="Nadpisz istniejące wpisy"
            sub="Zaktualizuj wartości pól dla istniejących kluczy. Nowe klucze zostaną dodane."
          />
          <RadioCard
            title="Pomiń istniejące"
            sub="Dodaj tylko nowe klucze. Istniejące wpisy pozostaną bez zmian."
          />
          <RadioCard
            title="Tylko walidacja (dry-run)"
            sub="Pokaż co się zmieni, ale nic nie zapisuj w bazie."
          />
        </div>
      </div>

      {/* Advanced options — EXPANDED */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px',
          background: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border)',
          cursor: 'pointer',
        }}>
          <Icon name="chevron-down" size={14} color="var(--fg-muted)" />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Opcje zaawansowane</span>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>parsowanie · kodowanie · mapowanie kolumn</span>
          <div className="q-spacer" />
          <Btn sm kind="link">Przywróć domyślne</Btn>
        </div>

        <div style={{ padding: 14 }}>

          {/* Parser settings — grid of fields */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginBottom: 16,
          }}>
            <Field label="Kodowanie pliku" hint="wykryto automatycznie">
              <select className="q-select" defaultValue="utf-8">
                <option value="utf-8">UTF-8 (zalecane)</option>
                <option value="utf-8-bom">UTF-8 z BOM</option>
                <option value="win-1250">Windows-1250</option>
                <option value="iso-8859-2">ISO-8859-2</option>
              </select>
            </Field>
            <Field label="Separator kolumn">
              <select className="q-select" defaultValue="comma">
                <option value="comma">, (przecinek)</option>
                <option value="semi">; (średnik)</option>
                <option value="tab">\t (tabulator)</option>
                <option value="auto">Wykryj automatycznie</option>
              </select>
            </Field>
            <Field label="Znak cytowania">
              <select className="q-select" defaultValue="dquote">
                <option value="dquote">" (cudzysłów)</option>
                <option value="squote">' (apostrof)</option>
                <option value="none">— brak —</option>
              </select>
            </Field>
            <Field label="Separator dziesiętny">
              <select className="q-select" defaultValue="dot">
                <option value="dot">. (kropka)</option>
                <option value="comma">, (przecinek)</option>
              </select>
            </Field>
            <Field label="Pomiń wierszy od góry" hint="np. komentarze przed nagłówkiem">
              <input className="q-input" type="number" defaultValue="0" min="0" style={{ width: '100%' }} />
            </Field>
            <Field label="Limit wierszy">
              <input className="q-input" type="text" defaultValue="bez limitu" style={{ width: '100%' }} />
            </Field>
          </div>

          {/* Toggles row */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 14,
            padding: '10px 12px', marginBottom: 16,
            border: '1px dashed var(--border)',
            borderRadius: 'var(--r)',
            background: 'var(--bg-subtle)',
          }}>
            {[
              { label: 'Pierwszy wiersz to nagłówek', on: true },
              { label: 'Pomiń puste wiersze', on: true },
              { label: 'Trim białych znaków', on: true },
              { label: 'Normalizuj puste pola do null', on: false },
              { label: 'Waliduj typy pól', on: true },
            ].map((it, i) => (
              <label key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 12.5, color: 'var(--fg-soft)', cursor: 'pointer',
              }}>
                <Check checked={it.on} />
                {it.label}
              </label>
            ))}
          </div>

          {/* Column mapping */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: 8,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>Mapowanie kolumn</div>
            <Pill ghost>{mapping.length}</Pill>
            <div className="q-spacer" />
            <Btn sm kind="ghost" icon="sparkle">Auto-dopasuj ponownie</Btn>
          </div>

          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--r)',
            overflow: 'hidden',
            background: 'var(--bg)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 24px 1.4fr 0.6fr 0.6fr',
              gap: 0,
              padding: '8px 12px',
              background: 'var(--bg-subtle)',
              borderBottom: '1px solid var(--border)',
              fontSize: 11.5, fontWeight: 600,
              color: 'var(--fg-muted)',
              textTransform: 'uppercase',
              letterSpacing: 0.4,
            }}>
              <span>Kolumna w pliku</span>
              <span />
              <span>Pole w słowniku</span>
              <span>Wymagane</span>
              <span style={{ textAlign: 'right' }}>Status</span>
            </div>
            {mapping.map((row, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 24px 1.4fr 0.6fr 0.6fr',
                alignItems: 'center',
                gap: 0,
                padding: '8px 12px',
                borderBottom: i < mapping.length - 1 ? '1px solid var(--border-soft)' : 'none',
                background: row.status === 'skip' ? 'var(--bg-subtle)' : 'var(--bg)',
              }}>
                <code className="q-mono" style={{
                  fontSize: 12, fontWeight: 500,
                  color: row.status === 'skip' ? 'var(--fg-muted)' : 'var(--fg)',
                }}>{row.src}</code>
                <Icon name="arrow-right" size={12} color="var(--fg-faint)" />
                <select className="q-select" defaultValue={row.dst} style={{ height: 28, fontSize: 12.5 }}>
                  <option>{row.dst}</option>
                </select>
                <span style={{ fontSize: 12, color: row.req ? 'var(--danger)' : 'var(--fg-muted)' }}>
                  {row.req ? 'tak' : '—'}
                </span>
                <span style={{ textAlign: 'right' }}>{statusPill(row.status)}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </ImportShell>
  );
}

// ─── State 2: validation error ─────────────────────────────────────────
function SceneImportError() {
  const errors = [
    { line: 12, key: 'BR', col: 'kod',     msg: 'Brak kodu w wierszu — kolumna „kod” jest pusta.' },
    { line: 17, key: 'jp', col: 'kod',     msg: 'Kod musi być pisany WIELKIMI literami (oczekiwano „JP”, znaleziono „jp”).' },
    { line: 23, key: 'PL', col: '—',       msg: 'Duplikat kodu „PL” — występuje już w wierszu 4.' },
    { line: 41, key: 'XX', col: 'status',  msg: 'Niepoprawna wartość statusu „enabled” — oczekiwano: active / draft / archived.' },
    { line: 58, key: 'CN', col: 'wartość', msg: 'Wartość przekracza limit 255 znaków (znaleziono 312).' },
  ];

  return (
    <ImportShell
      title="Walidacja pliku importu"
      sub="import-2026-05.csv · 142 wiersze · 38 KB"
      step={2}
      footer={<>
        <Pill kind="danger"><Icon name="alert-circle" size={11} /> 5 błędów · 0 ostrzeżeń</Pill>
        <div className="q-spacer" />
        <Btn kind="ghost">Anuluj import</Btn>
        <Btn icon="download">Pobierz raport błędów</Btn>
        <Btn kind="primary" icon="upload">Wgraj poprawiony plik</Btn>
      </>}
    >
      <div className="q-banner q-banner-danger" style={{ marginBottom: 18 }}>
        <span className="q-banner-icon is-danger"><Icon name="alert" size={16} /></span>
        <div style={{ flex: 1 }}>
          <div className="q-banner-title">Import przerwany — znaleziono błędy w strukturze pliku</div>
          <div className="q-banner-sub">
            Plik <strong style={{ fontWeight: 600 }}>import-2026-05.csv</strong> zawiera 142 wiersze, w tym <strong style={{ color: 'var(--danger)', fontWeight: 600 }}>5 błędów krytycznych</strong>. Popraw plik i wgraj ponownie, lub pobierz raport, aby zobaczyć szczegóły.
          </div>
        </div>
      </div>

      <div className="q-row" style={{ gap: 10, marginBottom: 18 }}>
        <div className="q-stat"><div className="q-stat-num">142</div><div className="q-stat-label">Wierszy</div></div>
        <div className="q-stat q-stat-danger"><div className="q-stat-num">5</div><div className="q-stat-label">Błędy</div></div>
        <div className="q-stat"><div className="q-stat-num">0</div><div className="q-stat-label">Ostrzeżenia</div></div>
        <div className="q-stat"><div className="q-stat-num">137</div><div className="q-stat-label">Poprawnych</div></div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        Lista problemów
        <Pill kind="danger">{errors.length}</Pill>
      </div>
      <div className="q-col" style={{ gap: 6, marginBottom: 18 }}>
        {errors.map(e => (
          <div key={e.line} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '8px 12px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            background: 'var(--bg)',
          }}>
            <Pill kind="danger"><span className="q-mono" style={{ fontSize: 10 }}>L{e.line}</span></Pill>
            <code className="q-mono" style={{
              fontSize: 11, fontWeight: 500,
              background: 'var(--bg-muted)', color: 'var(--fg-soft)',
              padding: '2px 6px', borderRadius: 4,
            }}>{e.col}</code>
            <div style={{ flex: 1, fontSize: 13, color: 'var(--fg-soft)' }}>{e.msg}</div>
            <Btn sm kind="ghost" icon="eye">Pokaż w pliku</Btn>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', marginBottom: 8 }}>
        Podgląd pliku <span style={{ color: 'var(--fg-muted)', fontWeight: 400, fontSize: 12 }}>(wokół błędów)</span>
      </div>
      <div className="q-codeblock">
        {[
          { n: 10, t: `AT,Austria,active` },
          { n: 11, t: `BE,Belgia,active` },
          { n: 12, t: `,Brazylia,active`, err: true, note: '← brak kodu' },
          { n: 13, t: `BG,Bułgaria,active` },
          { n: 14, t: `…`, dim: true },
          { n: 16, t: `IT,Włochy,active` },
          { n: 17, t: `jp,Japonia,active`, err: true, note: '← kod musi być wielkimi literami' },
          { n: 18, t: `KE,Kenia,active` },
        ].map((row, i) => (
          <div key={i} className={`q-cb-line ${row.err ? 'is-err' : ''}`}>
            <span className="q-cb-num">{row.err ? <span className="q-cb-marker">►</span> : row.n}</span>
            <span className="q-cb-text" style={row.dim ? { color: '#52525b' } : null}>
              {row.t}
              {row.note && <span style={{ color: '#fca5a5', marginLeft: 10 }}>{row.note}</span>}
            </span>
          </div>
        ))}
      </div>
    </ImportShell>
  );
}

// ─── State 3: success summary ──────────────────────────────────────────
function SceneImportSuccess() {
  return (
    <ImportShell
      title="Import zakończony pomyślnie"
      sub="import-2026-05.csv · 150 wierszy · 1,2 MB · czas operacji 4,8 s"
      step={3}
      footer={<>
        <Pill kind="success"><Icon name="check" size={10} /> wszystkie wiersze przetworzone</Pill>
        <div className="q-spacer" />
        <Btn icon="download">Pobierz raport</Btn>
        <Btn icon="history">Zobacz w historii</Btn>
        <Btn kind="success" icon="check">Zamknij i odśwież</Btn>
      </>}
    >
      <div className="q-banner q-banner-success" style={{ marginBottom: 18 }}>
        <span className="q-banner-icon is-success"><Icon name="check" size={16} strokeWidth={3} /></span>
        <div style={{ flex: 1 }}>
          <div className="q-banner-title">Plik został zaimportowany pomyślnie</div>
          <div className="q-banner-sub">
            Wszystkie 150 wierszy z pliku <strong style={{ fontWeight: 600 }}>import-2026-05.csv</strong> zostało przetworzonych. Słownik został zaktualizowany.
          </div>
        </div>
      </div>

      <div className="q-row" style={{ gap: 10, marginBottom: 18 }}>
        <div className="q-stat"><div className="q-stat-num">150</div><div className="q-stat-label">Przetworzono</div></div>
        <div className="q-stat q-stat-success"><div className="q-stat-num">142</div><div className="q-stat-label">Dodano</div></div>
        <div className="q-stat q-stat-info"><div className="q-stat-num">8</div><div className="q-stat-label">Zaktualizowano</div></div>
        <div className="q-stat"><div className="q-stat-num">0</div><div className="q-stat-label">Pominięto</div></div>
        <div className="q-stat"><div className="q-stat-num">0</div><div className="q-stat-label">Błędów</div></div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', marginBottom: 8 }}>
        Co dokładnie się zmieniło
      </div>
      <div className="q-col" style={{ gap: 4, marginBottom: 14 }}>
        {[
          { tag: 'NOWY', kind: 'success', body: <><code className="q-code">JP</code> · wartość: „Japonia” · status: <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>active</strong></> },
          { tag: 'NOWY', kind: 'success', body: <><code className="q-code">KR</code> · wartość: „Korea Południowa” · status: <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>active</strong></> },
          { tag: 'UPD',  kind: 'info', body: <><code className="q-code">UA</code> · status: <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>draft → active</strong></> },
          { tag: 'UPD',  kind: 'info', body: <><code className="q-code">NO</code> · wartość: <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>„Norwegia” → „Królestwo Norwegii”</strong></> },
          { tag: '+ 146', kind: 'neutral', body: <span style={{ color: 'var(--fg-muted)' }}>kliknij, aby rozwinąć pełną listę zmian</span> },
        ].map((row, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '7px 10px',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--r)',
            background: 'var(--bg)',
            fontSize: 13,
          }}>
            <Pill kind={row.kind}>{row.tag}</Pill>
            <div style={{ flex: 1 }}>{row.body}</div>
            {i < 4 && <Btn sm kind="ghost" iconOnly icon="eye" />}
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: '10px 14px', fontSize: 13, color: 'var(--fg-soft)',
      }}>
        <Icon name="history" size={16} color="var(--fg-muted)" />
        <span>
          Operacja zapisana w historii jako <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>„Import 150 wpisów z import-2026-05.csv”</strong>.
          Szczegóły zmian dostępne w zakładce <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>Historia słownika</strong>.
        </span>
        <div className="q-spacer" />
        <Btn sm kind="ghost" icon="history">Otwórz historię</Btn>
      </div>
    </ImportShell>
  );
}

Object.assign(window, { SceneImportInitial, SceneImportAdvanced, SceneImportError, SceneImportSuccess });
