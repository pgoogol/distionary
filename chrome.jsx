// Quill — app chrome (top bar + sidebar)

function TopBar() {
  return (
    <div className="q-topbar">
      <div className="q-topbar-logo">
        <span className="q-topbar-logo-mark">D</span>
        <span>DictAdmin</span>
      </div>
      <span className="q-topbar-divider" />
      <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Panel administracyjny</span>

      <div style={{ flex: 1 }} />

      <div className="q-topbar-search">
        <Icon name="search" size={14} className="q-topbar-search-icon" />
        <input placeholder="Szukaj globalnie w słownikach…" />
        <span className="q-topbar-kbd">⌘K</span>
      </div>

      <span className="q-avatar">MK</span>
    </div>
  );
}

const NAV_ITEMS = [
  { key: 'countries',  name: 'Kraje',              count: 254, icon: 'globe' },
  { key: 'currencies', name: 'Waluty',             count: 168, icon: 'coins' },
  { key: 'languages',  name: 'Języki',             count: 184, icon: 'languages' },
  { key: 'units',      name: 'Jednostki miar',     count: 47,  icon: 'ruler' },
  { key: 'doctypes',   name: 'Typy dokumentów',    count: 23,  icon: 'file' },
  { key: 'statuses',   name: 'Statusy zamówień',   count: 12,  icon: 'package' },
  { key: 'categories', name: 'Kategorie produktów',count: 86,  icon: 'layers' },
  { key: 'roles',      name: 'Role użytkowników',  count: 9,   icon: 'user' },
];

function SideBar({ active = 'countries' }) {
  const sysItems = [
    { key: 'history-global', name: 'Historia globalna', icon: 'history' },
  ];
  return (
    <aside className="q-sidebar">
      <div className="q-sidebar-label" style={{ padding: '0 8px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="database" size={12} color="var(--fg-muted)" />
        <span>Słowniki referencyjne</span>
      </div>

      <div className={`q-nav-item ${active === 'all' ? 'active' : ''}`} style={{ marginBottom: 4 }}>
        <Icon name="grid" size={14} className="q-nav-icon" />
        <span style={{ flex: 1 }}>Wszystkie słowniki</span>
        <span className="q-nav-count">8</span>
      </div>

      <div className="q-col" style={{ gap: 2 }}>
        {NAV_ITEMS.map(it => {
          if (it.label) {
            return (
              <div key={it.key} className="q-sidebar-label" style={{ paddingTop: 12 }}>
                {it.label}
              </div>
            );
          }
          const isActive = active === it.key;
          return (
            <div key={it.key} className={`q-nav-item ${isActive ? 'active' : ''}`}>
              <Icon name={it.icon} size={14} className="q-nav-icon" />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.name}</span>
              <span className="q-nav-count">{it.count}</span>
            </div>
          );
        })}
      </div>

      <hr className="q-sidebar-divider" />

      <div className="q-sidebar-label">System</div>
      <div className="q-col" style={{ gap: 2 }}>
        {sysItems.map(it => (
          <div key={it.key} className={`q-nav-item ${active === it.key ? 'active' : ''}`}>
            <Icon name={it.icon} size={14} className="q-nav-icon" />
            <span>{it.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

Object.assign(window, { TopBar, SideBar });
