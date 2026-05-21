// Quill — Main dictionary view (table)

const Q_DICTIONARIES = {
  countries: {
    name: 'Kraje',
    nav: 'countries',
    total: 254,
    iso: 'ISO 3166-1',
    lastChange: '18 maja 2026, 14:22',
    lastAuthor: 'M. Kowalska',
    rows: [
      { code: 'PL', desc: 'Polska — Rzeczpospolita Polska',        tag: 'EU',   status: 'active' },
      { code: 'DE', desc: 'Niemcy — Republika Federalna Niemiec',  tag: 'EU',   status: 'active' },
      { code: 'FR', desc: 'Francja — Republika Francuska',         tag: 'EU',   status: 'active' },
      { code: 'UA', desc: 'Ukraina',                               tag: 'EUR',  status: 'active' },
      { code: 'CZ', desc: 'Czechy — Republika Czeska',             tag: 'EU',   status: 'active' },
      { code: 'IT', desc: 'Włochy — Republika Włoska',             tag: 'EU',   status: 'active' },
      { code: 'ES', desc: 'Hiszpania — Królestwo Hiszpanii',       tag: 'EU',   status: 'active' },
      { code: 'NO', desc: 'Norwegia — Królestwo Norwegii',         tag: 'EFTA', status: 'active' },
      { code: 'SE', desc: 'Szwecja — Królestwo Szwecji',           tag: 'EU',   status: 'active' },
      { code: 'XK', desc: 'Kosowo',                                tag: 'EUR',  status: 'draft' },
    ],
    columns: [
      { key: 'tag', label: 'Region', width: 110, render: r => {
        const k = r.tag === 'EU' ? 'primary' : r.tag === 'EFTA' ? 'info' : 'neutral';
        return <Pill kind={k}>{r.tag}</Pill>;
      }},
    ],
  },
  statuses: {
    name: 'Statusy zamówień',
    nav: 'statuses',
    total: 12,
    iso: 'wewnętrzny słownik',
    lastChange: '15 maja 2026, 11:08',
    lastAuthor: 'A. Nowak',
    rows: [
      { code: 'NEW',        desc: 'Nowe zamówienie',             color: '#2563eb', isDefault: true,  status: 'active' },
      { code: 'CONFIRMED',  desc: 'Potwierdzone przez klienta',  color: '#047857', isDefault: false, status: 'active' },
      { code: 'PROCESSING', desc: 'W trakcie realizacji',        color: '#b45309', isDefault: false, status: 'active' },
      { code: 'PACKED',     desc: 'Spakowane, czeka na kuriera', color: '#52525b', isDefault: false, status: 'active' },
      { code: 'SHIPPED',    desc: 'Wysłane do klienta',          color: '#1d4ed8', isDefault: false, status: 'active' },
      { code: 'DELIVERED',  desc: 'Dostarczone',                 color: '#047857', isDefault: false, status: 'active' },
      { code: 'CANCELLED',  desc: 'Anulowane',                   color: '#b91c1c', isDefault: false, status: 'active' },
      { code: 'RETURNED',   desc: 'Zwrot',                       color: '#71717a', isDefault: false, status: 'archived' },
      { code: 'REFUNDED',   desc: 'Zwrócono płatność',           color: '#71717a', isDefault: false, status: 'archived' },
    ],
    columns: [
      { key: 'color', label: 'Kolor', width: 130, render: r => (
        <div className="q-row" style={{ gap: 8 }}>
          <span className="q-swatch" style={{ background: r.color, width: 16, height: 16, borderRadius: 4 }} />
          <code className="q-mono" style={{ color: 'var(--fg-muted)' }}>{r.color}</code>
        </div>
      )},
      { key: 'default', label: 'Domyślny', width: 110, render: r => r.isDefault
          ? <span className="q-pill q-pill-warning"><Icon name="star-fill" size={10} /> Domyślny</span>
          : <span style={{ color: 'var(--fg-faint)' }}>—</span> },
    ],
  },
};

function SceneMainView({
  showExportMenu = false,
  selectedRows = [],
  dict = 'countries',
  density = 'comfortable',
  state = 'normal',           // 'normal' | 'empty' | 'no-results' | 'loading'
  searchQuery = '',
  showFilterPopover = false,
}) {
  const d = Q_DICTIONARIES[dict];
  const navKey = d.nav;
  const isEmpty = state === 'empty';
  const isNoResults = state === 'no-results';
  const isLoading = state === 'loading';

  return (
    <div className="q-app">
      <TopBar />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <SideBar active={navKey} />
        <div className="q-content">
          <div className="q-page">

            {/* Breadcrumb */}
            <div className="q-crumb">
              <span className="q-crumb-link">Słowniki referencyjne</span>
              <Icon name="chevron-right" size={12} />
              <span className="q-crumb-current">{d.name}</span>
            </div>

            {/* Page header */}
            <div className="q-page-head">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 className="q-page-title">{d.name}</h1>
                <div className="q-page-meta">
                  <span><strong style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>{isEmpty ? 0 : d.total}</strong> wpisów</span>
                  <span className="dot" />
                  <span>{d.iso}</span>
                  <span className="dot" />
                  <span>ostatnia zmiana <strong style={{ color: 'var(--fg-soft)', fontWeight: 500 }}>{d.lastChange}</strong></span>
                  <span className="dot" />
                  <span>{d.lastAuthor}</span>
                </div>
              </div>
              <Btn icon="history">Historia zmian</Btn>
              <Btn kind="primary" icon="plus">Dodaj wpis</Btn>
            </div>

            {/* Filter / toolbar row */}
            <div className="q-toolbar">
              <div className="q-input-wrap" style={{ flex: 1, maxWidth: 360 }}>
                <Icon name="search" size={14} className="q-input-icon" />
                <input className="q-input" placeholder="Szukaj po kodzie lub opisie…" defaultValue={searchQuery} key={searchQuery} />
              </div>
              <Btn icon="filter">Filtry <span style={{ color: 'var(--fg-muted)', marginLeft: 2 }}>2</span></Btn>
              <div className="q-row" style={{ gap: 6 }}>
                <Chip onRemove={() => {}}>status: <strong style={{ marginLeft: 2 }}>aktywne</strong></Chip>
                {dict === 'countries' && <Chip onRemove={() => {}}>region: <strong style={{ marginLeft: 2 }}>EU</strong></Chip>}
              </div>
              <div className="q-spacer" />
              <Btn icon="columns" iconOnly sm title="Konfiguracja kolumn" />
              <span style={{ width: 1, height: 20, background: 'var(--border)' }} />

              <div className="q-split" style={{ position: 'relative' }}>
                <Btn icon="download">Eksportuj</Btn>
                <Btn iconRight="chevron-down" />
                {showExportMenu && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 5,
                    minWidth: 220, background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: 4, fontSize: 13,
                  }}>
                    {[
                      { label: 'Eksportuj jako CSV',   icon: 'file-csv', kbd: '⌘E' },
                      { label: 'Eksportuj jako JSON',  icon: 'file' },
                      { label: 'Eksportuj jako XLSX',  icon: 'file' },
                    ].map(it => (
                      <div key={it.label} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '7px 10px', borderRadius: 'var(--r)', cursor: 'pointer', color: 'var(--fg-soft)',
                      }} onMouseEnter={e=>e.currentTarget.style.background='var(--bg-muted)'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                        <Icon name={it.icon} size={14} color="var(--fg-muted)" />
                        <span style={{ flex: 1 }}>{it.label}</span>
                        {it.kbd && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-faint)' }}>{it.kbd}</span>}
                      </div>
                    ))}
                    <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
                    {[
                      { label: 'Eksportuj zaznaczone',    sub: '0 zaznaczonych', icon: 'check' },
                      { label: 'Eksportuj z bieżącym filtrem', sub: '142 wpisy', icon: 'filter' },
                    ].map(it => (
                      <div key={it.label} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '7px 10px', borderRadius: 'var(--r)', cursor: 'pointer', color: 'var(--fg-soft)',
                      }} onMouseEnter={e=>e.currentTarget.style.background='var(--bg-muted)'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                        <Icon name={it.icon} size={14} color="var(--fg-muted)" />
                        <span style={{ flex: 1 }}>{it.label}</span>
                        <span style={{ fontSize: 11, color: 'var(--fg-faint)' }}>{it.sub}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Btn kind="primary" icon="upload">Importuj</Btn>
            </div>

            {/* Bulk action bar */}
            {selectedRows.length > 0 && (
              <div className="q-bulkbar">
                <Check checked indeterminate />
                <strong>{selectedRows.length} zaznaczono</strong>
                <span style={{ color: 'rgba(255,255,255,0.55)' }}>z {d.total}</span>
                <span className="q-divider-v" />
                <Btn sm icon="edit">Edytuj masowo</Btn>
                <Btn sm icon="download">Eksportuj zaznaczone</Btn>
                <Btn sm icon="tag">Zmień status</Btn>
                <span className="q-divider-v" />
                <Btn sm icon="trash" kind="danger">Usuń</Btn>
                <div className="q-spacer" />
                <Btn sm kind="ghost" style={{ color: 'rgba(255,255,255,0.85)' }} icon="x">Wyczyść</Btn>
              </div>
            )}

            {/* Table */}
            {(isEmpty || isNoResults) ? (
              <EmptyTableState variant={isEmpty ? 'fresh' : 'no-results'} dict={d} searchQuery={searchQuery} />
            ) : isLoading ? (
              <LoadingTableState dict={d} />
            ) : (
            <div className="q-table-wrap">
              <table className="q-table">
                <thead>
                  <tr>
                    <th style={{ width: 36, paddingRight: 0 }}><Check /></th>
                    <th style={{ width: 160 }}>
                      <span className="q-row" style={{ gap: 4 }}>Kod / Klucz <Icon name="sort" size={11} color="var(--fg-faint)" /></span>
                    </th>
                    <th>Opis / Wartość</th>
                    <th style={{ width: 130 }}>Status</th>
                    <th style={{ width: 120, textAlign: 'right' }}>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {d.rows.map((r, idx) => {
                    const sel = selectedRows.includes(r.code);
                    return (
                      <tr key={r.code} className={sel ? 'is-selected' : ''}>
                        <td style={{ paddingRight: 0 }}><Check checked={sel} /></td>
                        <td><code className="q-code">{r.code}</code></td>
                        <td style={{ color: 'var(--fg)', maxWidth: 560 }}>{r.desc}</td>
                        <td><StatusPill status={r.status} /></td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="q-row" style={{ gap: 2, justifyContent: 'flex-end' }}>
                            <Btn sm kind="ghost" iconOnly icon="edit" title="Edytuj" />
                            <Btn sm kind="ghost" iconOnly icon="history" title="Historia wpisu" />
                            <Btn sm kind="ghost" iconOnly icon="kebab-h" title="Więcej" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="q-table-foot">
                <span>Pokazuję <strong style={{ color: 'var(--fg)' }}>1–{d.rows.length}</strong> z <strong style={{ color: 'var(--fg)' }}>{d.total}</strong> wpisów</span>
                <span style={{ color: 'var(--fg-faint)' }}>·</span>
                <span>Wierszy na stronę</span>
                <select className="q-input q-select" style={{ width: 70, height: 26, fontSize: 12, padding: '0 22px 0 8px' }}>
                  <option>25</option><option>50</option><option>100</option>
                </select>
                <div className="q-spacer" />
                <button className="q-pager-btn" disabled={true} style={{ opacity: 0.4 }}><Icon name="chevron-left" size={12} /></button>
                {(d.total > 50 ? ['1', '2', '3', '…', '11'] : ['1', '2']).map((p, i) => (
                  <button key={i} className={`q-pager-btn ${p === '1' ? 'is-active' : ''}`}>{p}</button>
                ))}
                <button className="q-pager-btn"><Icon name="chevron-right" size={12} /></button>
              </div>
            </div>
            )}

            {showFilterPopover && <FilterPopover dict={dict} />}

          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SceneMainView, Q_DICTIONARIES });
