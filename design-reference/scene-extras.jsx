// Quill — Dodatkowe ekrany: edycja masowa, walidacja, ustawienia słownika, błąd 500

// ─── Bulk status change modal ─────────────────────────────────────────
function SceneBulkStatus({ count = 12 }) {
  const sample = [
    { code: 'PL', desc: 'Polska — Rzeczpospolita Polska',         from: 'active' },
    { code: 'DE', desc: 'Niemcy — Republika Federalna Niemiec',   from: 'active' },
    { code: 'FR', desc: 'Francja — Republika Francuska',          from: 'draft' },
    { code: 'UA', desc: 'Ukraina',                                from: 'active' },
    { code: 'CZ', desc: 'Czechy — Republika Czeska',              from: 'active' },
  ];

  return (
    <div className="q-modal" style={{ width: 620 }}>

      <div className="q-modal-head" style={{ alignItems: 'flex-start', padding: '18px 20px 14px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }}>
            Słownik: Kraje · edycja masowa
          </div>
          <h2 style={{ fontSize: 19, fontWeight: 600, margin: 0, letterSpacing: '-0.015em' }}>
            Zmień status dla <span style={{ color: 'var(--primary)' }}>{count} wpisów</span>
          </h2>
        </div>
        <Btn sm kind="ghost" iconOnly icon="x" />
      </div>

      <div className="q-modal-body" style={{ paddingTop: 8 }}>

        {/* Cel: docelowy status */}
        <Field label="Nowy status" required hint="Zostanie ustawiony dla wszystkich zaznaczonych wpisów.">
          <div className="q-col" style={{ gap: 8 }}>
            {[
              { s: 'active',   sub: 'Wpis widoczny w aplikacjach klienckich i dostępny przez API.', sel: true },
              { s: 'draft',    sub: 'Roboczy — niewidoczny dla użytkowników. Wraca do edycji.' },
              { s: 'archived', sub: 'Zarchiwizowany — istniejące powiązania zachowane, nowe niemożliwe.' },
            ].map(o => (
              <div key={o.s} className={`q-radio-card ${o.sel ? 'is-checked' : ''}`}>
                <Radio checked={!!o.sel} />
                <div style={{ flex: 1 }}>
                  <div className="q-radio-card-title"><StatusPill status={o.s} /></div>
                  <div className="q-radio-card-sub" style={{ marginTop: 4 }}>{o.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Field>

        {/* Affected entries preview */}
        <div style={{ marginTop: 18 }}>
          <div className="q-row" style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
              Zaznaczone wpisy
            </span>
            <span style={{ fontSize: 11, color: 'var(--fg-faint)' }}>({count})</span>
            <div className="q-spacer" />
            <span style={{ fontSize: 12, color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>Pokaż wszystkie</span>
          </div>

          <div style={{
            border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden',
            background: 'var(--bg-subtle)',
          }}>
            {sample.map((r, i) => (
              <div key={r.code} className="q-row" style={{
                padding: '9px 14px',
                borderTop: i === 0 ? '0' : '1px solid var(--border-soft)',
                gap: 12,
              }}>
                <code className="q-code" style={{
                  background: 'var(--bg)', padding: '2px 7px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                  minWidth: 36, textAlign: 'center',
                }}>{r.code}</code>
                <span style={{ fontSize: 13, color: 'var(--fg)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.desc}
                </span>
                <div className="q-row" style={{ gap: 6, color: 'var(--fg-muted)' }}>
                  <StatusPill status={r.from} />
                  <Icon name="arrow-right" size={12} />
                  <StatusPill status="active" />
                </div>
              </div>
            ))}
            <div style={{
              padding: '9px 14px',
              borderTop: '1px solid var(--border-soft)',
              fontSize: 12, color: 'var(--fg-muted)',
              background: 'var(--bg-muted)',
            }}>
              + jeszcze <strong style={{ color: 'var(--fg-soft)', fontWeight: 600 }}>{count - sample.length}</strong> wpisów
            </div>
          </div>
        </div>

      </div>

      <div className="q-modal-foot">
        <div className="q-spacer" />
        <Btn kind="ghost">Anuluj</Btn>
        <Btn kind="primary" icon="check">Zastosuj do {count} wpisów</Btn>
      </div>
    </div>
  );
}


// ─── New entry — z walidacją (error state) ────────────────────────────
function SceneNewEntryErrors() {
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

        {/* Global error summary */}
        <div className="q-banner q-banner-danger" style={{ marginBottom: 18 }}>
          <span className="q-banner-icon is-danger"><Icon name="alert" size={15} /></span>
          <div style={{ flex: 1 }}>
            <div className="q-banner-title">Nie można zapisać wpisu — 2 pola wymagają poprawy</div>
            <div className="q-banner-sub" style={{ marginTop: 4 }}>
              Popraw <strong>Kod</strong> (duplikat istniejącego wpisu) i <strong>Wartość</strong> (przekroczona długość). Pozostałe pola są poprawne.
            </div>
          </div>
        </div>

        <div className="q-col" style={{ gap: 16 }}>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
            {/* Kod — duplikat */}
            <div>
              <label className="q-label">
                Kod / Klucz
                <span style={{ color: 'var(--danger)', fontWeight: 600 }}>*</span>
              </label>
              <div className="q-input-wrap">
                <input className="q-input is-error" defaultValue="PL"
                  style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', paddingRight: 32 }} />
                <Icon name="alert-circle" size={14} color="var(--danger)" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <div className="q-row" style={{ gap: 6, marginTop: 6, fontSize: 12, color: 'var(--danger)' }}>
                <Icon name="alert-circle" size={12} />
                <span><strong style={{ fontWeight: 600 }}>PL</strong> już istnieje w słowniku</span>
                <span style={{ color: 'var(--fg-muted)' }}>·</span>
                <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>Otwórz istniejący →</span>
              </div>
            </div>

            {/* Wartość — za długa */}
            <div>
              <label className="q-label">
                Wartość
                <span style={{ color: 'var(--danger)', fontWeight: 600 }}>*</span>
              </label>
              <input className="q-input is-error"
                defaultValue="Polska — Rzeczpospolita Polska, państwo unitarne położone w Europie Środkowej, członek Unii Europejskiej od 1 maja 2004 roku, należące również do NATO, OECD oraz strefy Schengen, ze stolicą w Warszawie i językiem urzędowym polskim oraz walutą złoty polski (PLN)" />
              <div className="q-row" style={{ marginTop: 6 }}>
                <div className="q-row" style={{ gap: 6, fontSize: 12, color: 'var(--danger)', flex: 1 }}>
                  <Icon name="alert-circle" size={12} />
                  <span>Maksymalnie <strong style={{ fontWeight: 600 }}>255</strong> znaków</span>
                </div>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--danger)', fontWeight: 600 }}>
                  287 / 255
                </span>
              </div>
            </div>
          </div>

          {/* Status — OK */}
          <Field label="Status początkowy">
            <div className="q-row" style={{ gap: 6 }}>
              {[
                { s: 'draft', sub: 'niewidoczny dla użytkowników', sel: true },
                { s: 'active', sub: 'natychmiastowa publikacja' },
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
        <div className="q-row" style={{ gap: 6, fontSize: 12, color: 'var(--danger)' }}>
          <Icon name="alert-circle" size={12} />
          <span><strong style={{ fontWeight: 600 }}>2 błędy</strong> wymagają poprawy przed zapisem</span>
        </div>
        <div className="q-spacer" />
        <Btn kind="ghost">Anuluj</Btn>
        <Btn kind="primary" icon="check" disabled>Utwórz wpis</Btn>
      </div>
    </div>
  );
}


// ─── Ustawienia słownika (per-dict, full page) ────────────────────────
function SettingsRow({ title, sub, control, last }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 340px',
      padding: '18px 0',
      borderBottom: last ? '0' : '1px solid var(--border-soft)',
      gap: 32, alignItems: 'flex-start',
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.55 }}>{sub}</div>
      </div>
      <div>{control}</div>
    </div>
  );
}

function SceneDictSettings() {
  const icons = ['globe', 'coins', 'languages', 'ruler', 'file', 'package', 'layers', 'user', 'tag', 'flag', 'database', 'book'];

  return (
    <div className="q-app">
      <TopBar />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <SideBar active="countries" />
        <div className="q-content">
          <div className="q-page">

            <div className="q-crumb">
              <span className="q-crumb-link">Słowniki referencyjne</span>
              <Icon name="chevron-right" size={12} />
              <span className="q-crumb-link">Kraje</span>
              <Icon name="chevron-right" size={12} />
              <span className="q-crumb-current">Ustawienia</span>
            </div>

            <div className="q-page-head">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 className="q-page-title">Ustawienia słownika</h1>
                <div className="q-page-meta">
                  <span>słownik <strong style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>Kraje</strong></span>
                  <span className="dot" />
                  <span>254 wpisów</span>
                  <span className="dot" />
                  <span>wymagane uprawnienia: <strong style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>edycja słownika</strong></span>
                </div>
              </div>
              <Btn icon="rotate-ccw">Cofnij zmiany</Btn>
              <Btn kind="primary" icon="check">Zapisz</Btn>
            </div>

            {/* Tabs */}
            <div className="q-tabs" style={{ marginBottom: 24 }}>
              {[
                { id: 'general',  label: 'Ogólne',         active: true },
                { id: 'schema',   label: 'Schemat danych', soon: true },
                { id: 'access',   label: 'Uprawnienia',    soon: true },
                { id: 'webhooks', label: 'Webhooki', count: 2, soon: true },
                { id: 'danger',   label: 'Strefa zagrożenia', soon: true },
              ].map(t => (
                <button key={t.id}
                  className={`q-tab ${t.active ? 'is-active' : ''}`}
                  disabled={t.soon}
                  style={t.soon ? { opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' } : null}>
                  {t.label}
                  {t.count && <span className="q-tab-count">{t.count}</span>}
                  {t.soon && (
                    <span style={{
                      marginLeft: 4,
                      fontSize: 9, fontWeight: 600,
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                      color: 'var(--fg-faint)',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-subtle)',
                      padding: '1px 5px', borderRadius: 99,
                      display: 'inline-flex', alignItems: 'center', gap: 3,
                    }}>
                      <Icon name="lock" size={8} />
                      wkrótce
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div style={{ maxWidth: 920 }}>

              {/* Section: identyfikacja */}
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px', letterSpacing: '-0.01em' }}>Identyfikacja</h2>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 4 }}>
                Jak słownik jest prezentowany w panelu i wywoływany z API
              </div>

              <SettingsRow
                title="Nazwa słownika"
                sub="Widoczna w nawigacji, breadcrumbach i nagłówkach widoku. Można zmieniać bez ograniczeń."
                control={<input className="q-input" defaultValue="Kraje" />}
              />

              <SettingsRow
                title="Klucz API"
                sub="Używany w endpointach REST i webhookach. Zmiana wymaga koordynacji z zespołami konsumującymi to API."
                control={
                  <div className="q-row" style={{ gap: 8 }}>
                    <input className="q-input is-readonly" defaultValue="countries" readOnly
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500 }} />
                    <Btn sm kind="ghost" icon="edit">Zmień</Btn>
                  </div>
                }
              />

              <SettingsRow
                title="Opis"
                sub="Krótki opis przeznaczenia słownika. Widoczny na liście słowników oraz w dokumentacji API."
                control={
                  <textarea
                    className="q-input"
                    defaultValue="Państwa świata zgodnie z normą ISO 3166-1 alpha-2. Synchronizowane z rejestrem ISO raz w kwartale."
                    style={{ height: 80, padding: '8px 10px', resize: 'vertical', lineHeight: 1.5 }} />
                }
              />

              <SettingsRow
                title="Ikona"
                sub="Pomaga rozpoznać słownik na liście. Wybierz z dostępnych ikon lub zostaw domyślną."
                control={
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                    {icons.map(n => {
                      const sel = n === 'globe';
                      return (
                        <div key={n} style={{
                          aspectRatio: '1 / 1',
                          border: '1px solid ' + (sel ? 'var(--primary)' : 'var(--border)'),
                          background: sel ? 'var(--primary-soft)' : 'var(--bg)',
                          color: sel ? 'var(--primary)' : 'var(--fg-soft)',
                          borderRadius: 'var(--r)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: sel ? '0 0 0 3px rgba(37,99,235,0.10)' : 'none',
                        }}>
                          <Icon name={n} size={16} />
                        </div>
                      );
                    })}
                  </div>
                }
              />

              <SettingsRow
                title="Źródło danych"
                sub="Informacja kontekstowa o pochodzeniu danych. Wyświetlana w widoku słownika."
                control={
                  <input className="q-input" defaultValue="ISO 3166-1" />
                }
                last
              />

              {/* Section: zachowanie */}
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: '32px 0 4px', letterSpacing: '-0.01em' }}>Zachowanie wpisów</h2>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 4 }}>
                Domyślne reguły dla nowych i istniejących wpisów w tym słowniku
              </div>

              <SettingsRow
                title="Domyślny status dla nowych wpisów"
                sub="Status przypisywany automatycznie przy tworzeniu wpisu — można go zmienić w formularzu."
                control={
                  <div className="q-row" style={{ gap: 6 }}>
                    {['active', 'draft'].map(s => (
                      <div key={s} style={{
                        padding: '6px 10px',
                        border: '1px solid ' + (s === 'draft' ? 'var(--fg)' : 'var(--border)'),
                        borderRadius: 'var(--r)', cursor: 'pointer',
                        background: s === 'draft' ? 'var(--bg-muted)' : 'var(--bg)',
                      }}>
                        <StatusPill status={s} />
                      </div>
                    ))}
                  </div>
                }
                last
              />



            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


// ─── 500 / network error ─────────────────────────────────────────────
function Scene500Error() {
  return (
    <div className="q-app">
      <TopBar />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <SideBar active="countries" />
        <div className="q-content">
          <div className="q-page">

            {/* Breadcrumb */}
            <div className="q-crumb">
              <span className="q-crumb-link">Słowniki referencyjne</span>
              <Icon name="chevron-right" size={12} />
              <span className="q-crumb-current">Kraje</span>
            </div>

            <div className="q-page-head">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 className="q-page-title">Kraje</h1>
                <div className="q-page-meta">
                  <span style={{ color: 'var(--danger)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--danger)', display: 'inline-block', marginRight: 6 }} />
                    Połączenie z serwerem przerwane
                  </span>
                  <span className="dot" />
                  <span>ostatnie udane odświeżenie <strong style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>2 min temu</strong></span>
                </div>
              </div>
              <Btn icon="rotate-ccw">Spróbuj ponownie</Btn>
              <Btn kind="primary" icon="plus" disabled>Dodaj wpis</Btn>
            </div>

            {/* Toolbar — disabled */}
            <div className="q-toolbar" style={{ opacity: 0.55, pointerEvents: 'none' }}>
              <div className="q-input-wrap" style={{ flex: 1, maxWidth: 360 }}>
                <Icon name="search" size={14} className="q-input-icon" />
                <input className="q-input" placeholder="Szukaj po kodzie lub opisie…" disabled />
              </div>
              <Btn icon="filter">Filtry</Btn>
              <div className="q-spacer" />
              <Btn icon="download">Eksportuj</Btn>
              <Btn kind="primary" icon="upload">Importuj</Btn>
            </div>

            {/* Error card replaces the table */}
            <div style={{
              background: 'var(--bg)',
              border: '1px solid var(--danger-border)',
              borderRadius: 'var(--r-lg)',
              padding: '52px 32px',
              textAlign: 'center',
              boxShadow: '0 0 0 4px rgba(185,28,28,0.04)',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: 'var(--danger-soft)',
                border: '1px solid var(--danger-border)',
                color: 'var(--danger)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon name="alert" size={28} />
              </div>

              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--danger)', marginBottom: 6 }}>
                500 · Internal server error
              </div>
              <div style={{ fontSize: 19, fontWeight: 600, color: 'var(--fg)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                Nie udało się załadować słownika
              </div>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', maxWidth: 480, margin: '0 auto 22px', lineHeight: 1.55 }}>
                Serwer odpowiedział błędem podczas pobierania listy wpisów. Twoje zmiany lokalne są bezpieczne — żadne dane nie zostały utracone.
              </div>

              <div className="q-row" style={{ gap: 8, justifyContent: 'center', marginBottom: 28 }}>
                <Btn kind="primary" icon="rotate-ccw">Spróbuj ponownie</Btn>
                <Btn icon="arrow-left">Wróć do listy słowników</Btn>
              </div>

              {/* Diagnostic info */}
              <div style={{
                maxWidth: 520, margin: '0 auto',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                textAlign: 'left',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '10px 14px',
                  borderBottom: '1px solid var(--border-soft)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <Icon name="info" size={13} color="var(--fg-muted)" />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Szczegóły diagnostyczne
                  </span>
                  <div className="q-spacer" />
                  <Btn sm kind="ghost" icon="paperclip">Kopiuj</Btn>
                </div>

                {[
                  { k: 'Endpoint',    v: 'GET /api/v2/dictionaries/countries/entries', mono: true },
                  { k: 'Status',      v: '500 Internal Server Error',  mono: true, danger: true },
                  { k: 'Request ID',  v: 'req_7c3f9d2a1e8b4f5c',       mono: true },
                  { k: 'Czas',        v: 'dziś, 14:24:18 (UTC+02:00)' },
                  { k: 'Retry',       v: 'Automatyczna próba za 8 s · 2/5' },
                ].map((r, i) => (
                  <div key={r.k} className="q-row" style={{
                    padding: '8px 14px',
                    borderTop: i === 0 ? '0' : '1px solid var(--border-soft)',
                    fontSize: 12,
                  }}>
                    <span style={{ color: 'var(--fg-muted)', minWidth: 90, fontWeight: 500 }}>{r.k}</span>
                    <span style={{
                      color: r.danger ? 'var(--danger)' : 'var(--fg)',
                      fontWeight: r.danger ? 600 : 400,
                      fontFamily: r.mono ? 'var(--font-mono)' : 'inherit',
                      fontSize: r.mono ? 11 : 12,
                    }}>{r.v}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--warning)', display: 'inline-block' }} />
                Status systemu: <span style={{ color: 'var(--warning)', fontWeight: 600 }}>częściowa awaria</span>
                <span style={{ color: 'var(--fg-faint)' }}>·</span>
                <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>Zobacz status page →</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


Object.assign(window, {
  SceneBulkStatus, SceneNewEntryErrors, SceneDictSettings, Scene500Error,
});
