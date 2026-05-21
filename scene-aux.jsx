// Quill — drawer historii (dict-level) + modal edycji wpisu + entry history + toast

// ─── Dictionary-level audit drawer ────────────────────────────────────
function SceneAuditDrawer({ dict = 'countries' }) {
  const dName = dict === 'countries' ? 'Kraje' : 'Statusy zamówień';

  const events = [
    {
      icon: 'upload', dot: 'is-success', tag: 'IMPORT', tagKind: 'success',
      title: 'Zaimportowano 150 wpisów',
      desc: <>z pliku <code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4 }}>kraje-import-v4.csv</code></>,
      stats: [{ k: 'nowych', v: 142 }, { k: 'aktualiz.', v: 8 }, { k: 'pominięto', v: 0 }],
      who: 'M. Kowalska', when: '14:22', details: true,
    },
    {
      icon: 'edit', dot: '', tag: 'EDYCJA', tagKind: 'neutral',
      title: <>Edytowano wpis <code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4 }}>PL</code></>,
      desc: 'zmieniono opis',
      diff: { from: 'Rzeczpospolita Polska', to: 'Polska — Rzeczpospolita Polska' },
      who: 'A. Nowak', when: '11:08',
    },
    {
      icon: 'plus', dot: 'is-success', tag: 'DODANIE', tagKind: 'success',
      title: <>Dodano wpis <code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4 }}>XK</code></>,
      desc: 'Kosowo · region: EUR · status: szkic',
      who: 'A. Nowak', when: '17:43',
    },
    {
      icon: 'trash', dot: 'is-danger', tag: 'USUNIĘCIE', tagKind: 'danger',
      title: <>Usunięto wpis <code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4 }}>YU</code></>,
      desc: 'Jugosławia (powód: nieaktualny kod ISO)',
      who: 'M. Kowalska', when: '09:12',
    },
    {
      icon: 'download', dot: '', tag: 'EKSPORT', tagKind: 'neutral',
      title: 'Wyeksportowano słownik',
      desc: <>kraje.json · 254 wpisy</>,
      who: 'M. Kowalska', when: '17 maja, 16:50',
    },
    {
      icon: 'edit', dot: 'is-info', tag: 'EDYCJA MASOWA', tagKind: 'info',
      title: 'Zaktualizowano 12 wpisów',
      desc: 'zmieniono region (EFTA → EU)',
      who: 'sys.bot', when: '17 maja, 04:00',
    },
  ];

  return (
    <div className="q-drawer">
      <div className="q-drawer-head">
        <div className="q-row" style={{ marginBottom: 10 }}>
          <Icon name="history" size={18} color="var(--fg-soft)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Historia zmian</div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
              poziom: <span style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>cały słownik</span>
            </div>
          </div>
          <Btn sm kind="ghost" iconOnly icon="x" />
        </div>

        <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 10 }}>
          Słownik: <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>{dName}</strong> · ostatnie 30 dni · <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>76 zdarzeń</strong>
        </div>

        <div className="q-row" style={{ gap: 6, flexWrap: 'wrap' }}>
          <Btn sm icon="filter" iconRight="chevron-down">Wszystkie typy</Btn>
          <Btn sm icon="user" iconRight="chevron-down">Wszyscy</Btn>
          <Btn sm icon="calendar" iconRight="chevron-down">30 dni</Btn>
        </div>
      </div>

      <div className="q-drawer-body">
        <div className="q-day-label" style={{ marginTop: 0 }}>Dzisiaj · 18 maja</div>
        <div className="q-timeline">
          {events.slice(0, 2).map((e, i) => <AuditEvent key={i} {...e} />)}
        </div>

        <div className="q-day-label">Wczoraj · 17 maja</div>
        <div className="q-timeline">
          {events.slice(2, 4).map((e, i) => <AuditEvent key={i} {...e} />)}
        </div>

        <div className="q-day-label">Wcześniej</div>
        <div className="q-timeline">
          {events.slice(4).map((e, i) => <AuditEvent key={i} {...e} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <Btn sm kind="ghost" iconRight="chevron-down">Załaduj starsze zdarzenia</Btn>
        </div>
      </div>

      <div className="q-drawer-foot">
        <Btn sm kind="ghost" icon="download">Eksportuj pełny dziennik (CSV)</Btn>
        <div className="q-spacer" />
      </div>
    </div>
  );
}

function AuditEvent({ icon, dot, tag, tagKind, title, desc, stats, diff, who, when, details }) {
  return (
    <div className="q-tl-item">
      <div className={`q-tl-dot ${dot || ''}`}>
        <Icon name={icon} size={11} />
      </div>

      <div className="q-row" style={{ gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
        <Pill kind={tagKind}>{tag}</Pill>
        <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{when}</span>
        <span style={{ fontSize: 11, color: 'var(--fg-faint)' }}>·</span>
        <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{who}</span>
      </div>

      <div style={{ fontSize: 13, color: 'var(--fg)', fontWeight: 500, marginBottom: 3 }}>{title}</div>
      {desc && <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 6, lineHeight: 1.5 }}>{desc}</div>}

      {stats && (
        <div style={{
          display: 'flex', gap: 0, padding: '8px 10px',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          marginBottom: 6,
        }}>
          {stats.map((s, i) => (
            <React.Fragment key={s.k}>
              {i > 0 && <span style={{ width: 1, height: 28, background: 'var(--border)', margin: '0 12px' }} />}
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 3 }}>{s.k}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {diff && (
        <div className="q-diff" style={{ marginBottom: 6 }}>
          <div className="q-diff-old">− {diff.from}</div>
          <div className="q-diff-new">+ {diff.to}</div>
        </div>
      )}

      {details && (
        <div className="q-row" style={{ gap: 6 }}>
          <Btn sm kind="ghost">Zobacz szczegóły</Btn>
        </div>
      )}
    </div>
  );
}

// ─── Entry modal — preview-first, with Edit mode ─────────────────────
function SceneEditEntry({ dict = 'countries', initialTab = 'basic', mode = 'view' }) {
  const cfg = {
    code: 'PL',
    value: 'Polska — Rzeczpospolita Polska',
    dictLabel: 'Kraje',
    status: 'active',
  };

  const [activeTab, setActiveTab] = useState(initialTab);
  const tabs = [
    { id: 'basic',   label: 'Podstawowe' },
    { id: 'meta',    label: 'Metadane' },
    { id: 'history', label: 'Historia wpisu', count: 4 },
  ];

  const isView = mode === 'view';

  return (
    <div className="q-modal" style={{ width: 720 }}>
      <div className="q-modal-head" style={{ paddingBottom: 0, flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>
        <div className="q-row" style={{ alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }}>
              {cfg.dictLabel} · wpis
            </div>
            <div className="q-row" style={{ gap: 10 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
                {isView ? 'Podgląd wpisu' : 'Edytuj wpis'}
              </h2>
              <code className="q-code" style={{
                background: 'var(--fg)', color: 'var(--bg)',
                padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600,
              }}>{cfg.code}</code>
              <StatusPill status={cfg.status} />
            </div>
          </div>
          {isView && (
            <div className="q-row" style={{ gap: 6 }}>
              <Btn sm icon="download">Eksportuj</Btn>
              <Btn sm kind="primary" icon="edit">Edytuj</Btn>
            </div>
          )}
          <Btn sm kind="ghost" iconOnly icon="x" />
        </div>

        <div className="q-tabs" style={{ marginTop: 14, marginBottom: 0, marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>
          {tabs.map(t => (
            <button key={t.id}
              className={`q-tab ${activeTab === t.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(t.id)}>
              {t.label}
              {t.count && <span className="q-tab-count">{t.count}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="q-modal-body">

        {activeTab === 'basic' && (isView
          ? <BasicView cfg={cfg} />
          : <BasicEdit cfg={cfg} />
        )}

        {activeTab === 'meta' && <MetaAudit />}

        {activeTab === 'history' && (
          <EntryHistory dict={dict} code={cfg.code} />
        )}
      </div>

      <div className="q-modal-foot">
        <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
          {activeTab === 'history'
            ? <>4 zdarzenia od 03 stycznia 2024</>
            : <>Ostatnia zmiana: <strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>A. Nowak</strong> · dziś, 11:08</>}
        </span>
        <div className="q-spacer" />
        {isView ? (
          <>
            <Btn kind="ghost">Zamknij</Btn>
            <Btn kind="primary" icon="edit">Edytuj wpis</Btn>
          </>
        ) : activeTab === 'history' ? (
          <>
            <Btn icon="download">Eksportuj historię</Btn>
            <Btn kind="primary">Zamknij</Btn>
          </>
        ) : (
          <>
            <Btn kind="ghost">Anuluj</Btn>
            <Btn kind="primary" icon="check">Zapisz zmiany</Btn>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Preview (read-only) — Podstawowe ─────────────────────────────────
function BasicView({ cfg }) {
  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Podgląd wpisu</div>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 16 }}>
        Aktualne wartości tego wpisu. Aby coś zmienić, kliknij <strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>Edytuj</strong>.
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: 14, columnGap: 16,
        padding: 16, background: 'var(--bg-subtle)',
        border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
      }}>
        <ReadRowLabel>Kod</ReadRowLabel>
        <div>
          <code className="q-code" style={{
            background: 'var(--bg)', border: '1px solid var(--border)',
            padding: '3px 8px', borderRadius: 6, fontFamily: 'var(--font-mono)',
            fontWeight: 600, fontSize: 13,
          }}>{cfg.code}</code>
        </div>

        <ReadRowLabel>Wartość</ReadRowLabel>
        <div style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.45 }}>{cfg.value}</div>

        <ReadRowLabel>Status</ReadRowLabel>
        <div><StatusPill status={cfg.status} /></div>
      </div>
    </>
  );
}

function ReadRowLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase',
      letterSpacing: '0.04em', fontWeight: 600, paddingTop: 4,
    }}>{children}</div>
  );
}

// ─── Edit — Podstawowe (kod, wartość, status) ────────────────────────
function BasicEdit({ cfg }) {
  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Klucz, wartość, status</div>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 16 }}>
        Podstawowa para <strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>kod → wartość</strong> — rdzeń każdego wpisu w słowniku.
      </div>

      <div className="q-col" style={{ gap: 14, marginBottom: 4 }}>
        <Field label="Kod / Klucz" required hint="WIELKIE LITERY, 2–3 znaki, unikalny w słowniku">
          <div className="q-row" style={{ gap: 8 }}>
            <input className="q-input is-readonly" defaultValue={cfg.code} readOnly
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13, maxWidth: 200 }} />
            <Pill ghost><Icon name="lock" size={10} /> readonly po utworzeniu</Pill>
          </div>
        </Field>

        <Field label="Wartość" required hint="Max. 255 znaków. Pojawi się we wszystkich miejscach, gdzie używany jest ten wpis.">
          <input className="q-input" defaultValue={cfg.value} />
        </Field>

        <Field label="Status">
          <div className="q-row" style={{ gap: 6 }}>
            {['active', 'draft', 'archived'].map(s => (
              <div key={s}
                style={{
                  padding: '6px 10px',
                  border: '1px solid ' + (s === cfg.status ? 'var(--fg)' : 'var(--border)'),
                  borderRadius: 'var(--r)',
                  cursor: 'pointer',
                  background: s === cfg.status ? 'var(--bg-muted)' : 'var(--bg)',
                }}>
                <StatusPill status={s} />
              </div>
            ))}
          </div>
        </Field>
      </div>
    </>
  );
}

// ─── Meta — dane audytowe ────────────────────────────────────────────
function MetaAudit() {
  const rows = [
    { label: 'Utworzono',          value: '03 stycznia 2024, 16:45', sub: 'podczas importu początkowego ISO-3166' },
    { label: 'Autor utworzenia',   value: 'sys.bot',                  sub: 'konto serwisowe' },
    { label: 'Ostatnia modyfikacja', value: 'dziś, 11:08',           sub: 'pole: opis · poprzednia wartość zarchiwizowana' },
    { label: 'Autor modyfikacji',  value: 'A. Nowak',                 sub: 'anna.nowak@firma.pl' },
    { label: 'Wersja',             value: '14',                       sub: '13 poprzednich rewizji dostępnych w Historii wpisu' },
    { label: 'Liczba edytorów',    value: '3',                        sub: 'A. Nowak · M. Kowalska · sys.bot' },
  ];

  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Metadane audytowe</div>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 16 }}>
        Dane techniczne i audytowe rekordu — pola tylko do odczytu, zarządzane przez system.
      </div>

      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '180px 1fr',
            padding: '10px 14px',
            borderTop: i === 0 ? 'none' : '1px solid var(--border)',
            alignItems: 'baseline', gap: 12,
          }}>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              {r.label}
            </div>
            <div>
              <div style={{
                fontSize: 13, color: 'var(--fg)', fontWeight: 500,
                fontFamily: r.mono ? 'var(--font-mono)' : 'inherit',
              }}>{r.value}</div>
              {r.sub && (
                <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>{r.sub}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Entry-level history ──────────────────────────────────────────────
function EntryHistory({ dict = 'countries', code = 'PL' }) {
  const events = [
    { tag: 'EDYCJA',    kind: 'neutral', when: 'dziś, 11:08',          who: 'A. Nowak',     field: 'wartość',
      from: 'Rzeczpospolita Polska', to: 'Polska — Rzeczpospolita Polska' },
    { tag: 'AKTYWACJA', kind: 'success', when: '08 maja, 14:11',       who: 'M. Kowalska',  field: 'status',
      from: 'draft', to: 'active' },
    { tag: 'EDYCJA',    kind: 'neutral', when: '04 kwietnia, 10:02',   who: 'A. Nowak',     field: 'wartość',
      from: 'Polska', to: 'Rzeczpospolita Polska' },
    { tag: 'UTWORZONO', kind: 'success', when: '03 stycznia 2024, 16:45', who: 'sys.bot',   field: 'kod',
      from: null, to: 'PL', note: 'wpis utworzony podczas importu początkowego ISO-3166' },
  ];

  const iconForTag = t => t === 'UTWORZONO' ? 'plus' : t === 'AKTYWACJA' ? 'check' : 'edit';
  const dotClass = k => k === 'success' ? 'is-success' : k === 'info' ? 'is-info' : '';

  return (
    <>
      <div className="q-row" style={{ gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        <Pill kind="neutral">wpis: <code className="q-code" style={{ marginLeft: 4 }}>{code}</code></Pill>
        <Pill ghost>utworzony 03.01.2024</Pill>
        <Pill ghost>{events.length} zdarzeń</Pill>
        <Pill ghost>3 edytorów</Pill>
        <div className="q-spacer" />
        <Btn sm kind="ghost" icon="filter">Filtr pól</Btn>
      </div>

      <div style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 10 }}>
        Pełna oś czasu wpisu — pola: kod · wartość · status
      </div>

      <div className="q-timeline">
        {events.map((e, i) => (
          <div key={i} className="q-tl-item">
            <div className={`q-tl-dot ${dotClass(e.kind)}`}>
              <Icon name={iconForTag(e.tag)} size={10} />
            </div>
            <div className="q-row" style={{ gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
              <Pill kind={e.kind}>{e.tag}</Pill>
              <code className="q-code" style={{ fontSize: 11, color: 'var(--fg-soft)' }}>{e.field}</code>
              <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{e.when} · {e.who}</span>
            </div>
            {(e.from !== undefined || e.to !== undefined) && (e.from !== null || e.to !== null) && (
              <div className="q-diff" style={{ marginBottom: 6 }}>
                {e.from !== null && <div className="q-diff-old">− {e.from}</div>}
                {e.to !== null && <div className="q-diff-new">+ {e.to}</div>}
              </div>
            )}
            {e.note && <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 4 }}>{e.note}</div>}
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Success toast ────────────────────────────────────────────────────
function SuccessToast() {
  return (
    <div className="q-toast">
      <span className="q-toast-icon"><Icon name="check" size={12} color="#fff" strokeWidth={3.5} /></span>
      <div style={{ flex: 1 }}>
        <div className="q-toast-title">Import zakończony pomyślnie</div>
        <div className="q-toast-sub">150 wpisów · 142 nowych · 8 zaktualizowanych</div>
      </div>
      <div className="q-toast-actions">
        <span className="q-toast-link">Cofnij</span>
        <span className="q-toast-link" style={{ color: 'rgba(255,255,255,0.55)' }}>Historia</span>
      </div>
    </div>
  );
}

Object.assign(window, { SceneAuditDrawer, SceneEditEntry, EntryHistory, SuccessToast });
