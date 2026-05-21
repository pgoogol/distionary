// Quill — Stany brzegowe: pusty, brak wyników, ładowanie, filtry, usuwanie, nowy wpis

// ─── Empty table state ────────────────────────────────────────────────
function EmptyTableState({ variant = 'fresh', dict, searchQuery = '' }) {
  const isFresh = variant === 'fresh';
  return (
    <div style={{
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)',
      padding: '64px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--fg-muted)',
        marginBottom: 14,
      }}>
        <Icon name={isFresh ? 'database' : 'search'} size={22} />
      </div>

      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', marginBottom: 6, letterSpacing: '-0.01em' }}>
        {isFresh
          ? 'Słownik jest pusty'
          : <>Brak wyników dla „<span style={{ color: 'var(--fg)' }}>{searchQuery || 'XYZ'}</span>"</>}
      </div>
      <div style={{ fontSize: 13, color: 'var(--fg-muted)', maxWidth: 420, margin: '0 auto 18px', lineHeight: 1.5 }}>
        {isFresh
          ? <>Zacznij od dodania pojedynczego wpisu lub zaimportuj cały zestaw danych z pliku CSV / JSON / XLSX.</>
          : <>Spróbuj zmienić frazę wyszukiwania, wyczyść filtry albo dodaj nowy wpis, jeśli takiego brakuje.</>}
      </div>

      <div className="q-row" style={{ gap: 8, justifyContent: 'center' }}>
        {isFresh ? (
          <>
            <Btn icon="plus">Dodaj pierwszy wpis</Btn>
            <Btn kind="primary" icon="upload">Importuj z pliku</Btn>
          </>
        ) : (
          <>
            <Btn icon="x">Wyczyść filtry</Btn>
            <Btn kind="primary" icon="plus">Dodaj wpis „{(searchQuery || 'XYZ').toUpperCase().slice(0, 5)}"</Btn>
          </>
        )}
      </div>

      {isFresh && (
        <div style={{
          marginTop: 28, padding: 14,
          background: 'var(--bg-subtle)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          maxWidth: 520, margin: '28px auto 0',
          textAlign: 'left',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 999,
            background: 'var(--info-soft)', color: 'var(--info)',
            border: '1px solid var(--info-border)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
          }}>
            <Icon name="info" size={14} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', marginBottom: 3 }}>
              Wskazówka dla nowych słowników
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.55 }}>
              Plik powinien zawierać minimum dwie kolumny: <code className="q-code" style={{ background: 'var(--bg)', padding: '1px 5px', borderRadius: 4 }}>kod</code> i <code className="q-code" style={{ background: 'var(--bg)', padding: '1px 5px', borderRadius: 4 }}>wartość</code>. Reszta kolumn zostanie automatycznie zmapowana.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Loading skeleton ────────────────────────────────────────────────
function LoadingTableState({ dict }) {
  const Bar = ({ w, h = 12, dark }) => (
    <span style={{
      display: 'inline-block', width: w, height: h, borderRadius: 4,
      background: dark ? '#e4e4e7' : '#ececef',
      animation: 'q-pulse 1.4s ease-in-out infinite',
    }} />
  );

  return (
    <>
      <style>{`@keyframes q-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.55 } }`}</style>
      <div className="q-table-wrap">
        <table className="q-table">
          <thead>
            <tr>
              <th style={{ width: 36, paddingRight: 0 }}><Check /></th>
              <th style={{ width: 160 }}>Kod / Klucz</th>
              <th>Opis / Wartość</th>
              <th style={{ width: 130 }}>Status</th>
              <th style={{ width: 120, textAlign: 'right' }}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i}>
                <td style={{ paddingRight: 0 }}><Check /></td>
                <td><Bar w={36} h={14} dark /></td>
                <td><Bar w={`${55 + (i * 7) % 30}%`} /></td>
                <td><Bar w={72} h={18} /></td>
                <td style={{ textAlign: 'right' }}>
                  <div className="q-row" style={{ gap: 6, justifyContent: 'flex-end' }}>
                    <Bar w={22} h={22} /><Bar w={22} h={22} /><Bar w={22} h={22} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="q-table-foot">
          <div className="q-row" style={{ gap: 8, color: 'var(--fg-muted)' }}>
            <Icon name="refresh" size={12} />
            <span>Ładowanie wpisów…</span>
          </div>
          <div className="q-spacer" />
          <Bar w={120} h={14} />
        </div>
      </div>
    </>
  );
}

// ─── Filter popover (rozwinięty panel filtrów) ───────────────────────
function FilterPopover({ dict = 'countries' }) {
  const Section = ({ title, count, children, last }) => (
    <div style={{ borderBottom: last ? '0' : '1px solid var(--border-soft)', padding: '12px 16px' }}>
      <div className="q-row" style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
          {title}
        </span>
        {count !== undefined && (
          <span style={{ fontSize: 11, color: 'var(--fg-faint)', fontWeight: 500 }}>
            ({count})
          </span>
        )}
        <div className="q-spacer" />
        {count > 0 && <span style={{ fontSize: 11, color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>Wyczyść</span>}
      </div>
      {children}
    </div>
  );

  const CheckRow = ({ checked, label, count, indeterminate }) => (
    <div className="q-row" style={{ gap: 8, padding: '5px 0', cursor: 'pointer' }}>
      <Check checked={checked} indeterminate={indeterminate} />
      <span style={{ flex: 1, fontSize: 13, color: 'var(--fg)' }}>{label}</span>
      <span style={{ fontSize: 11, color: 'var(--fg-faint)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
    </div>
  );

  return (
    <div style={{
      position: 'absolute', top: 138, left: 28,
      width: 360,
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 12,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-subtle)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Icon name="filter" size={14} color="var(--fg-muted)" />
        <span style={{ fontSize: 13, fontWeight: 600 }}>Filtry</span>
        <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>2 aktywne</span>
        <div className="q-spacer" />
        <Btn sm kind="ghost" iconOnly icon="x" />
      </div>

      <Section title="Status" count={1}>
        <CheckRow checked label="Aktywny" count={241} />
        <CheckRow label="Szkic" count={5} />
        <CheckRow label="Archiwum" count={8} />
      </Section>

      <Section title="Data ostatniej zmiany" count={1}>
        <div className="q-row" style={{ gap: 6, flexWrap: 'wrap' }}>
          {['Dziś', '7 dni', '30 dni', 'Zakres…'].map((l, i) => (
            <div key={l} style={{
              padding: '5px 10px', fontSize: 12,
              border: '1px solid ' + (i === 2 ? 'var(--fg)' : 'var(--border)'),
              background: i === 2 ? 'var(--bg-muted)' : 'var(--bg)',
              borderRadius: 'var(--r-pill)', cursor: 'pointer',
              fontWeight: i === 2 ? 600 : 400, color: i === 2 ? 'var(--fg)' : 'var(--fg-soft)',
            }}>{l}</div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
          20 kwi 2026 — 20 maj 2026
        </div>
      </Section>

      <Section title="Autor ostatniej zmiany" count={1} last>
        <div className="q-input-wrap">
          <Icon name="search" size={13} className="q-input-icon" />
          <input className="q-input" placeholder="Szukaj autora…" defaultValue="" style={{ height: 30, fontSize: 12 }} />
        </div>
        <div style={{ marginTop: 8 }}>
          <CheckRow checked label="M. Kowalska" count={48} />
          <CheckRow label="A. Nowak" count={31} />
          <CheckRow label="P. Wójcik" count={12} />
          <CheckRow label="sys.bot" count={142} />
        </div>
      </Section>

      <div style={{
        padding: '10px 16px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-subtle)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
          <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>27</strong> wpisów spełnia kryteria
        </span>
        <div className="q-spacer" />
        <Btn sm kind="ghost">Resetuj</Btn>
        <Btn sm kind="primary">Zastosuj</Btn>
      </div>
    </div>
  );
}

// ─── Delete confirmation modal ───────────────────────────────────────
// Cleaner, more visual layout — stat tiles + strikethrough preview, bez typed confirmation
function SceneDeleteConfirm({ count = 3 }) {
  const entries = [
    { code: 'PL', desc: 'Polska — Rzeczpospolita Polska' },
    { code: 'DE', desc: 'Niemcy — Republika Federalna Niemiec' },
    { code: 'CZ', desc: 'Czechy — Republika Czeska' },
  ];

  return (
    <div className="q-modal" style={{ width: 560 }}>

      {/* Header — minimalist, no big red icon */}
      <div className="q-modal-head" style={{ alignItems: 'flex-start', padding: '18px 20px 14px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }}>
            Słownik: Kraje · usuwanie wpisów
          </div>
          <h2 style={{ fontSize: 19, fontWeight: 600, margin: 0, letterSpacing: '-0.015em', color: 'var(--fg)' }}>
            Na pewno usunąć <span style={{ color: 'var(--danger)' }}>{count} {count === 1 ? 'wpis' : count < 5 ? 'wpisy' : 'wpisów'}</span>?
          </h2>
        </div>
        <Btn sm kind="ghost" iconOnly icon="x" />
      </div>

      <div className="q-modal-body" style={{ paddingTop: 4 }}>

        {/* Strikethrough entry preview — czyta się jak fragment tabeli "po usunięciu" */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 8, marginTop: 8 }}>
          Podgląd po usunięciu
        </div>
        <div style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          {entries.map((r, i) => (
            <div key={r.code} className="q-row" style={{
              padding: '11px 14px',
              borderTop: i === 0 ? '0' : '1px solid var(--border-soft)',
              gap: 12,
            }}>
              <code className="q-code" style={{
                background: 'var(--bg)', color: 'var(--fg-faint)',
                padding: '2px 7px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                textDecoration: 'line-through', textDecorationColor: 'var(--danger)',
                textDecorationThickness: '1.5px',
                minWidth: 36, textAlign: 'center',
              }}>{r.code}</code>
              <span style={{
                fontSize: 13, color: 'var(--fg-faint)',
                flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                textDecoration: 'line-through', textDecorationColor: 'var(--fg-faint)',
              }}>
                {r.desc}
              </span>
              <Pill kind="danger" style={{ fontFamily: 'var(--font-mono)' }}>—deleted—</Pill>
            </div>
          ))}
        </div>

        {/* Acknowledgement */}
        <label className="q-row" style={{
          gap: 10, padding: 12,
          border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
          background: 'var(--bg)', cursor: 'pointer',
          alignItems: 'flex-start',
        }}>
          <Check checked />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: 'var(--fg)', fontWeight: 500, lineHeight: 1.45 }}>
              Rozumiem, że powiązania pozostaną jako <code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4, color: 'var(--danger)' }}>—deleted—</code> w aplikacjach klienckich
            </div>
          </div>
        </label>

      </div>

      <div className="q-modal-foot">
        <div className="q-spacer" />
        <Btn kind="ghost">Anuluj</Btn>
        <Btn kind="danger" icon="trash">Usuń {count} {count === 1 ? 'wpis' : 'wpisy'}</Btn>
      </div>
    </div>
  );
}

// ─── New entry modal (tworzenie) ─────────────────────────────────────
function SceneNewEntry({ dict = 'countries' }) {
  return (
    <div className="q-modal" style={{ width: 720 }}>
      <div className="q-modal-head" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 0, paddingBottom: 14 }}>
        <div className="q-row" style={{ alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }}>
              Kraje · nowy wpis
            </div>
            <div className="q-row" style={{ gap: 10 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
                Dodaj nowy wpis
              </h2>
              <Pill kind="warning"><span className="q-pill-dot" />Szkic</Pill>
            </div>
          </div>
          <Btn sm kind="ghost" iconOnly icon="x" />
        </div>
      </div>

      <div className="q-modal-body">

        <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 16, lineHeight: 1.5 }}>
          Wypełnij <strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>kod</strong>, <strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>wartość</strong> i wybierz <strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>status</strong>. To wszystko — dodatkowe metadane można uzupełnić później w trybie edycji wpisu.
        </div>

        <div className="q-col" style={{ gap: 16 }}>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
            <Field label="Kod / Klucz" required hint="2–3 znaki, WIELKIE LITERY. Po utworzeniu kod jest niezmienny.">
              <input className="q-input" placeholder="np. SK" autoFocus
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 14, textTransform: 'uppercase' }} />
            </Field>
            <Field label="Wartość" required hint="Pełna nazwa widoczna w aplikacjach klienckich. Max. 255 znaków.">
              <input className="q-input" placeholder="np. Słowacja — Republika Słowacka" />
            </Field>
          </div>

          <Field label="Status początkowy">
            <div className="q-row" style={{ gap: 6 }}>
              {[
                { s: 'draft', label: 'Szkic', sub: 'niewidoczny dla użytkowników', sel: true },
                { s: 'active', label: 'Aktywny', sub: 'natychmiastowa publikacja' },
              ].map(o => (
                <div key={o.s} className={`q-radio-card ${o.sel ? 'is-checked' : ''}`} style={{ flex: 1 }}>
                  <Radio checked={!!o.sel} />
                  <div style={{ flex: 1 }}>
                    <div className="q-radio-card-title"><StatusPill status={o.s} /></div>
                    <div className="q-radio-card-sub" style={{ marginTop: 4 }}>{o.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Field>
        </div>

      </div>

      <div className="q-modal-foot">
        <div className="q-row" style={{ gap: 6, fontSize: 12, color: 'var(--fg-muted)' }}>
          <Icon name="info" size={12} />
          <span>Wszystkie pola można edytować po utworzeniu, oprócz kodu</span>
        </div>
        <div className="q-spacer" />
        <Btn kind="ghost">Anuluj</Btn>
        <Btn icon="plus">Utwórz i dodaj kolejny</Btn>
        <Btn kind="primary" icon="check">Utwórz wpis</Btn>
      </div>
    </div>
  );
}

Object.assign(window, {
  EmptyTableState, LoadingTableState, FilterPopover,
  SceneDeleteConfirm, SceneNewEntry,
});
