// Quill — Lista słowników + kreator nowego słownika

// ─── Wszystkie słowniki — landing page ──────────────────────────────
const Q_DICT_INDEX = [
  { key: 'countries',  name: 'Kraje',               icon: 'globe',     total: 254, source: 'ISO 3166-1',         changed: 'dziś, 14:22',     who: 'M. Kowalska', activeRatio: 246 },
  { key: 'currencies', name: 'Waluty',              icon: 'coins',     total: 168, source: 'ISO 4217',           changed: 'wczoraj, 09:18',  who: 'sys.bot',     activeRatio: 168 },
  { key: 'languages',  name: 'Języki',              icon: 'languages', total: 184, source: 'ISO 639-1',          changed: '15 maja',         who: 'A. Nowak',    activeRatio: 180 },
  { key: 'units',      name: 'Jednostki miar',      icon: 'ruler',     total: 47,  source: 'wewnętrzny',         changed: '12 maja',         who: 'P. Wójcik',   activeRatio: 47 },
  { key: 'doctypes',   name: 'Typy dokumentów',     icon: 'file',      total: 23,  source: 'wewnętrzny',         changed: '11 maja',         who: 'M. Kowalska', activeRatio: 21,  draft: 2 },
  { key: 'statuses',   name: 'Statusy zamówień',    icon: 'package',   total: 12,  source: 'wewnętrzny',         changed: '15 maja',         who: 'A. Nowak',    activeRatio: 9,   archive: 3 },
  { key: 'categories', name: 'Kategorie produktów', icon: 'layers',    total: 86,  source: 'wewnętrzny',         changed: '08 maja',         who: 'A. Nowak',    activeRatio: 84,  draft: 2 },
  { key: 'roles',      name: 'Role użytkowników',   icon: 'user',      total: 9,   source: 'RBAC engine v2',     changed: '02 maja',         who: 'sys.bot',     activeRatio: 9 },
];

function SceneDictionaryList() {
  return (
    <div className="q-app">
      <TopBar />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <SideBar active="all" />
        <div className="q-content">
          <div className="q-page">

            <div className="q-crumb">
              <span className="q-crumb-current">Słowniki referencyjne</span>
            </div>

            <div className="q-page-head">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 className="q-page-title">Wszystkie słowniki</h1>
                <div className="q-page-meta">
                  <span><strong style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>8</strong> słowników</span>
                  <span className="dot" />
                  <span><strong style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>783</strong> wpisów łącznie</span>
                  <span className="dot" />
                  <span>ostatnia zmiana <strong style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>dziś, 14:22</strong></span>
                </div>
              </div>
              <Btn icon="history">Historia globalna</Btn>
              <Btn kind="primary" icon="plus">Nowy słownik</Btn>
            </div>

            {/* Toolbar — bez filtrów kategorii */}
            <div className="q-toolbar">
              <div className="q-input-wrap" style={{ flex: 1, maxWidth: 360 }}>
                <Icon name="search" size={14} className="q-input-icon" />
                <input className="q-input" placeholder="Szukaj słownika…" />
              </div>
              <Btn icon="sort" iconRight="chevron-down">Sortuj: ostatnia zmiana</Btn>
              <div className="q-spacer" />
              <div className="q-row" style={{ gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
                <button className="q-btn q-btn-sm" style={{ border: 0, borderRadius: 0, background: 'var(--bg-muted)' }}><Icon name="grid" size={14} /></button>
                <button className="q-btn q-btn-sm q-btn-ghost" style={{ border: 0, borderRadius: 0 }}><Icon name="list" size={14} /></button>
              </div>
            </div>

            {/* Cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {Q_DICT_INDEX.map(d => (
                <div key={d.key} className="q-card" style={{ padding: 16, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div className="q-row" style={{ alignItems: 'flex-start' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                      color: 'var(--fg-soft)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flex: '0 0 auto',
                    }}>
                      <Icon name={d.icon} size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="q-row" style={{ gap: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.01em' }}>{d.name}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>{d.source}</div>
                    </div>
                    <Btn sm kind="ghost" iconOnly icon="kebab-h" />
                  </div>

                  <div className="q-row" style={{ alignItems: 'baseline', gap: 8, marginTop: 2 }}>
                    <span style={{ fontSize: 26, fontWeight: 600, color: 'var(--fg)', lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                      {d.total}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>wpisów</span>
                  </div>

                  <div className="q-row" style={{ gap: 6, paddingTop: 8, borderTop: '1px solid var(--border-soft)', marginTop: 2, fontSize: 11, color: 'var(--fg-muted)' }}>
                    <Icon name="history" size={11} />
                    <span>zmiana <strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>{d.changed}</strong></span>
                    <span style={{ color: 'var(--fg-faint)' }}>·</span>
                    <span>{d.who}</span>
                  </div>
                </div>
              ))}

              {/* New dict CTA card */}
              <div style={{
                padding: 16, borderRadius: 'var(--r-lg)',
                border: '1.5px dashed var(--border-hover)',
                background: 'transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', minHeight: 200, gap: 8,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  color: 'var(--fg-muted)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="plus" size={18} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-soft)' }}>Utwórz nowy słownik</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', textAlign: 'center', maxWidth: 220 }}>
                  Zacznij od pustego lub zaimportuj plik źródłowy
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Kreator nowego słownika ────────────────────────────────────────
//
// Kroki:
//  1. Podstawowe       — nazwa, klucz, opis, ikona
//  2. Schemat danych   — dodatkowe kolumny (poza wymaganymi: kod, wartość, status)
//  3. Źródło danych    — pusty / import z pliku / kopia istniejącego
//  4. Podsumowanie     — preview + utwórz

const Q_NEW_DICT_STEPS = [
  { id: 1, label: 'Podstawowe' },
  { id: 2, label: 'Schemat danych' },
  { id: 3, label: 'Źródło danych' },
  { id: 4, label: 'Podsumowanie' },
];

function NewDictStepper({ step }) {
  return (
    <div className="q-stepper" style={{ paddingTop: 14, paddingBottom: 14 }}>
      {Q_NEW_DICT_STEPS.map((s, i) => {
        const isActive = s.id === step;
        const isDone = s.id < step;
        return (
          <React.Fragment key={s.id}>
            <div className={`q-step ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}>
              <span className="q-step-dot">{isDone ? <Icon name="check" size={11} strokeWidth={3} /> : s.id}</span>
              <span style={{ fontWeight: isActive ? 600 : 500 }}>{s.label}</span>
            </div>
            {i < Q_NEW_DICT_STEPS.length - 1 && <span className="q-step-bar" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function NewDictHead({ step }) {
  return (
    <div className="q-modal-head" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 0, padding: 0 }}>
      <div className="q-row" style={{ padding: '16px 20px 0', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }}>
            Krok {step} z {Q_NEW_DICT_STEPS.length}
          </div>
          <div className="q-row" style={{ gap: 10 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
              Utwórz nowy słownik
            </h2>
          </div>
        </div>
        <Btn sm kind="ghost" iconOnly icon="x" />
      </div>
      <NewDictStepper step={step} />
    </div>
  );
}

function NewDictFoot({ step }) {
  const isLast = step === Q_NEW_DICT_STEPS.length;
  return (
    <div className="q-modal-foot">
      <Btn kind="ghost">Anuluj</Btn>
      <div className="q-spacer" />
      {step > 1 && <Btn icon="arrow-left">Wstecz</Btn>}
      {isLast
        ? <Btn kind="primary" icon="check">Utwórz słownik</Btn>
        : <Btn kind="primary" iconRight="arrow-right">Dalej</Btn>}
    </div>
  );
}

// ─── KROK 1 — Podstawowe ────────────────────────────────────────────
function SceneNewDictionary({ step = 1 }) {
  return (
    <div className="q-modal" style={{ width: 780 }}>
      <NewDictHead step={step} />
      <div className="q-modal-body">
        {step === 1 && <Step1Basic />}
        {step === 2 && <Step2Schema />}
        {step === 3 && <Step3Source />}
        {step === 4 && <Step4Summary />}
      </div>
      <NewDictFoot step={step} />
    </div>
  );
}

function Step1Basic() {
  const icons = [
    { n: 'globe',     sel: false },
    { n: 'coins',     sel: false },
    { n: 'languages', sel: false },
    { n: 'ruler',     sel: false },
    { n: 'file',      sel: false },
    { n: 'package',   sel: true },
    { n: 'layers',    sel: false },
    { n: 'user',      sel: false },
    { n: 'tag',       sel: false },
    { n: 'flag',      sel: false },
    { n: 'database',  sel: false },
    { n: 'book',      sel: false },
  ];

  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Podstawowe informacje</div>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 18 }}>
        Nazwa i klucz identyfikujący słownik w API. Można je później edytować.
      </div>

      <div className="q-col" style={{ gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Nazwa słownika" required hint="Widoczna w panelu i nawigacji.">
            <input className="q-input" placeholder="np. Metody płatności" defaultValue="Metody płatności" autoFocus />
          </Field>
          <Field label="Klucz API" required hint="Używany w endpointach REST i webhookach.">
            <input className="q-input" defaultValue="payment-methods"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500 }} />
          </Field>
        </div>

        <Field label="Opis" hint="Krótka informacja dla innych administratorów. Opcjonalne.">
          <textarea
            className="q-input"
            placeholder="Do czego służy ten słownik?"
            defaultValue="Lista dostępnych metod płatności dla zamówień B2B i B2C. Synchronizowana z bramkami płatniczymi raz dziennie."
            style={{ height: 72, padding: '8px 10px', resize: 'vertical', lineHeight: 1.5 }} />
        </Field>

        <Field label="Ikona" hint="Pomaga rozpoznać słownik na liście.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 6 }}>
            {icons.map(it => (
              <div key={it.n} style={{
                aspectRatio: '1 / 1',
                border: '1px solid ' + (it.sel ? 'var(--primary)' : 'var(--border)'),
                background: it.sel ? 'var(--primary-soft)' : 'var(--bg)',
                color: it.sel ? 'var(--primary)' : 'var(--fg-soft)',
                borderRadius: 'var(--r)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: it.sel ? '0 0 0 3px rgba(37,99,235,0.10)' : 'none',
              }}>
                <Icon name={it.n} size={16} />
              </div>
            ))}
          </div>
        </Field>
      </div>
    </>
  );
}

// ─── KROK 2 — Schemat danych ────────────────────────────────────────
function Step2Schema() {
  const required = [
    { name: 'kod',     type: 'string (2–10)', desc: 'Unikalny identyfikator wpisu, readonly po utworzeniu' },
    { name: 'wartość', type: 'string (255)',  desc: 'Pełna nazwa widoczna w aplikacjach' },
    { name: 'status',  type: 'enum',          desc: 'aktywny / szkic / archiwum' },
  ];

  const extras = [
    { name: 'kolor',       type: 'color',   visible: true,  sortable: false, desc: 'Hex z palety brandowej' },
    { name: 'opłata',      type: 'decimal', visible: true,  sortable: true,  desc: 'Prowizja w PLN, 2 m.dz.' },
    { name: 'aktywna_od',  type: 'date',    visible: false, sortable: true,  desc: '' },
  ];

  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Schemat danych</div>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 18 }}>
        Każdy wpis ma trzy pola wymagane. Możesz dodać kolumny niestandardowe — pojawią się w tabeli i formularzu.
      </div>

      {/* Wymagane */}
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 8 }}>
        Pola wymagane (zarządzane przez system)
      </div>
      <div style={{
        border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
        overflow: 'hidden', marginBottom: 24, background: 'var(--bg-subtle)',
      }}>
        {required.map((f, i) => (
          <div key={f.name} className="q-row" style={{
            padding: '10px 14px',
            borderTop: i === 0 ? '0' : '1px solid var(--border-soft)',
            gap: 14,
          }}>
            <code className="q-code" style={{ background: 'var(--bg)', padding: '2px 7px', borderRadius: 4, fontSize: 12, fontWeight: 600, minWidth: 90 }}>
              {f.name}
            </code>
            <span style={{ fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', minWidth: 110 }}>{f.type}</span>
            <span style={{ flex: 1, fontSize: 12, color: 'var(--fg-soft)' }}>{f.desc}</span>
            <Pill ghost><Icon name="lock" size={10} /> systemowe</Pill>
          </div>
        ))}
      </div>

      {/* Kolumny niestandardowe — wyszarzone, niedostępne na MVP */}
      <div style={{ position: 'relative', opacity: 0.55, pointerEvents: 'none', userSelect: 'none' }}>
        <div className="q-row" style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
            Kolumny niestandardowe
          </span>
          <span style={{ fontSize: 11, color: 'var(--fg-faint)' }}>(0)</span>
          <Pill ghost style={{ marginLeft: 4, opacity: 1 }}><Icon name="lock" size={10} /> dostępne wkrótce</Pill>
          <div className="q-spacer" />
          <Btn sm kind="ghost" icon="plus" disabled>Dodaj kolumnę</Btn>
        </div>

        <div style={{
          border: '1px dashed var(--border-hover)', borderRadius: 'var(--r-md)', overflow: 'hidden',
          background: 'var(--bg-subtle)',
        }}>
          {/* Header */}
          <div className="q-row" style={{
            padding: '8px 14px',
            borderBottom: '1px dashed var(--border-hover)',
            fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--fg-muted)',
          }}>
            <span style={{ minWidth: 130 }}>Nazwa pola</span>
            <span style={{ minWidth: 110 }}>Typ</span>
            <span style={{ flex: 1 }}>Opis</span>
            <span style={{ width: 70, textAlign: 'center' }}>Widoczne</span>
            <span style={{ width: 70, textAlign: 'center' }}>Sortowanie</span>
            <span style={{ width: 28 }}></span>
          </div>

          {extras.map((f, i) => (
            <div key={f.name} className="q-row" style={{
              padding: '10px 14px',
              borderTop: i === 0 ? '0' : '1px dashed var(--border-hover)',
            }}>
              <code className="q-code" style={{
                background: 'var(--bg)', padding: '2px 7px', borderRadius: 4, fontSize: 12, fontWeight: 600, minWidth: 130, color: 'var(--fg-muted)',
              }}>{f.name}</code>
              <span style={{ fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', minWidth: 110 }}>{f.type}</span>
              <span style={{ flex: 1, fontSize: 12, color: 'var(--fg-faint)' }}>{f.desc || <span style={{ color: 'var(--fg-faint)' }}>—</span>}</span>
              <span style={{ width: 70, display: 'flex', justifyContent: 'center' }}>
                <Check checked={false} />
              </span>
              <span style={{ width: 70, display: 'flex', justifyContent: 'center' }}>
                <Check checked={false} />
              </span>
              <span style={{ width: 28, display: 'flex', justifyContent: 'flex-end' }}>
                <Btn sm kind="ghost" iconOnly icon="kebab-h" />
              </span>
            </div>
          ))}

          <div style={{
            padding: '10px 14px',
            borderTop: '1px dashed var(--border-hover)',
          }}>
            <span style={{ fontSize: 12, color: 'var(--fg-faint)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="plus" size={12} />
              Dodaj kolejną kolumnę
            </span>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="info" size={12} />
        Kolumny niestandardowe pojawią się w następnej wersji. W MVP słowniki mają sztywny schemat <code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4 }}>kod · wartość · status</code>.
      </div>
    </>
  );
}

// ─── KROK 3 — Źródło danych ─────────────────────────────────────────
function Step3Source() {
  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Źródło danych</div>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 18 }}>
        Skąd wziąć początkowe wpisy. Każdą z opcji można zmienić — wpisy można dodawać i importować również po utworzeniu.
      </div>

      <div className="q-col" style={{ gap: 10 }}>

        {/* Opcja 1: pusty */}
        <div className="q-radio-card">
          <Radio />
          <div style={{ flex: 1 }}>
            <div className="q-radio-card-title">Pusty słownik</div>
            <div className="q-radio-card-sub">Utwórz strukturę, wpisy dodaj ręcznie później. Najszybsze do testów.</div>
          </div>
          <Pill ghost>0 wpisów</Pill>
        </div>

        {/* Opcja 2: import z pliku - selected */}
        <div className="q-radio-card is-checked">
          <Radio checked />
          <div style={{ flex: 1 }}>
            <div className="q-radio-card-title">Import z pliku</div>
            <div className="q-radio-card-sub" style={{ marginBottom: 10 }}>
              Wgraj CSV / JSON / XLSX. Pierwsza kolumna zmapuje się jako <code className="q-code" style={{ background: 'var(--bg)', padding: '1px 5px', borderRadius: 4 }}>kod</code>, druga jako <code className="q-code" style={{ background: 'var(--bg)', padding: '1px 5px', borderRadius: 4 }}>wartość</code>.
            </div>

            {/* Dropzone */}
            <div style={{
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              padding: '12px 14px',
              borderRadius: 'var(--r-md)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'var(--success-soft)', color: 'var(--success)',
                border: '1px solid var(--success-border)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
              }}>
                <Icon name="file-csv" size={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>metody-platnosci.csv</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
                  18 wierszy · 4 kolumny · 2.4 KB · UTF-8
                </div>
              </div>
              <Btn sm kind="ghost" icon="x">Usuń</Btn>
            </div>
          </div>
        </div>

        {/* Opcja 3: kopia */}
        <div className="q-radio-card">
          <Radio />
          <div style={{ flex: 1 }}>
            <div className="q-radio-card-title">Kopia istniejącego słownika</div>
            <div className="q-radio-card-sub">Skopiuj wszystkie wpisy z innego słownika — przydatne dla wariantów (np. statusy per region).</div>
          </div>
          <Btn sm icon="database" iconRight="chevron-down" disabled>Wybierz słownik</Btn>
        </div>
      </div>
    </>
  );
}

// ─── KROK 4 — Podsumowanie ──────────────────────────────────────────
function Step4Summary() {
  const Row = ({ label, value, mono }) => (
    <div style={{
      display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16,
      padding: '10px 14px', borderTop: '1px solid var(--border-soft)',
      alignItems: 'baseline',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </div>
      <div style={{ fontSize: 13, color: 'var(--fg)', fontFamily: mono ? 'var(--font-mono)' : 'inherit', fontWeight: mono ? 500 : 400 }}>
        {value}
      </div>
    </div>
  );

  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Podsumowanie</div>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 18 }}>
        Sprawdź wszystko przed utworzeniem. Cofnij się jeśli chcesz coś zmienić.
      </div>

      {/* Card preview */}
      <div className="q-card" style={{ padding: 16, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="q-row" style={{ alignItems: 'flex-start' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: 'var(--bg-subtle)', border: '1px solid var(--border)',
            color: 'var(--fg-soft)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
          }}>
            <Icon name="package" size={16} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>Metody płatności</div>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>wewnętrzny</div>
          </div>
          <Pill kind="warning"><span className="q-pill-dot" />Szkic</Pill>
        </div>
        <div className="q-row" style={{ alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 26, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>18</span>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>wpisów (z importu)</span>
        </div>
        <div style={{ display: 'flex', height: 4, borderRadius: 99, overflow: 'hidden', background: 'var(--bg-muted)' }}>
          <div style={{ width: '100%', background: 'var(--success)' }} />
        </div>
      </div>

      {/* Details */}
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden', background: 'var(--bg)' }}>
        <Row label="Nazwa" value="Metody płatności" />
        <Row label="Klucz API" value="payment-methods" mono />
        <Row label="Opis" value="Lista dostępnych metod płatności dla zamówień B2B i B2C. Synchronizowana z bramkami płatniczymi raz dziennie." />
        <Row label="Kolumny" value={<>kod · wartość · status <span style={{ color: 'var(--fg-muted)' }}>+ 3 niestandardowe (kolor, opłata, aktywna_od)</span></>} />
        <Row label="Źródło danych" value={<>Import z pliku <code className="q-code" style={{ background: 'var(--bg-muted)', padding: '1px 5px', borderRadius: 4 }}>metody-platnosci.csv</code> · 18 wpisów</>} />
        <Row label="Status początkowy" value={<StatusPill status="draft" />} />
      </div>

      <div className="q-banner q-banner-info" style={{ marginTop: 16 }}>
        <span className="q-banner-icon is-info"><Icon name="info" size={14} /></span>
        <div style={{ flex: 1 }}>
          <div className="q-banner-title">Co się stanie po utworzeniu</div>
          <div className="q-banner-sub" style={{ marginTop: 4 }}>
            Słownik powstanie jako <strong>szkic</strong> — niewidoczny dla użytkowników końcowych. Import 18 wpisów rozpocznie się natychmiast. Po zakończeniu możesz zatwierdzić i opublikować z poziomu widoku słownika.
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { SceneDictionaryList, SceneNewDictionary });
