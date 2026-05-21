// Quill — Kebab menus: kontekstowe menu dla słownika i wpisu w słowniku

// ─── Reusable menu popover ────────────────────────────────────────────
function MenuPopover({ items, style }) {
  return (
    <div style={{
      position: 'absolute',
      minWidth: 240,
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)',
      boxShadow: 'var(--shadow-lg)',
      padding: 4,
      fontSize: 13,
      zIndex: 30,
      ...style,
    }}>
      {items.map((it, i) => {
        if (it.divider) {
          return <div key={'d' + i} style={{ height: 1, background: 'var(--border)', margin: '4px 2px' }} />;
        }
        if (it.label) {
          return (
            <div key={'l' + i} style={{
              padding: '6px 10px 4px',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
              textTransform: 'uppercase', color: 'var(--fg-faint)',
            }}>{it.label}</div>
          );
        }
        const danger = it.kind === 'danger';
        const disabled = !!it.disabled;
        return (
          <div key={it.text}
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 10px',
              borderRadius: 'var(--r-sm)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              color: disabled ? 'var(--fg-faint)' : danger ? 'var(--danger)' : 'var(--fg-soft)',
              opacity: disabled ? 0.55 : 1,
            }}
            onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = danger ? 'var(--danger-soft)' : 'var(--bg-muted)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; }}
          >
            {it.icon && (
              <Icon name={it.icon} size={14}
                color={disabled ? 'var(--fg-faint)' : danger ? 'var(--danger)' : 'var(--fg-muted)'} />
            )}
            <span style={{ flex: 1, fontWeight: 500 }}>{it.text}</span>
            {it.sub && (
              <span style={{ fontSize: 11, color: 'var(--fg-faint)' }}>{it.sub}</span>
            )}
            {it.kbd && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-faint)' }}>{it.kbd}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Kebab menu: słownik (na liście słowników) ───────────────────────
const DICT_KEBAB_ITEMS = [
  { label: 'Akcje' },
  { text: 'Otwórz słownik',     icon: 'arrow-right', kbd: '↵' },
  { text: 'Eksportuj wpisy…',   icon: 'download' },
  { text: 'Duplikuj słownik',   icon: 'paperclip',   sub: 'kopia szkicu' },
  { divider: true },
  { label: 'Zarządzanie' },
  { text: 'Ustawienia',         icon: 'settings' },
  { text: 'Historia zmian',     icon: 'history' },
  { text: 'Uprawnienia',        icon: 'lock',        disabled: true },
  { divider: true },
  { text: 'Usuń słownik…',      icon: 'trash', kind: 'danger' },
];

function SceneDictKebab() {
  return (
    <>
      <SceneDictionaryList />
      {/* Highlight ring around the kebab button of the first dict card */}
      <div style={{
        position: 'absolute',
        top: 246, left: 540,  // pierwsza karta słownika, kebab w prawym górnym rogu
        width: 26, height: 26, borderRadius: 'var(--r)',
        background: 'var(--bg-muted)',
        border: '1px solid var(--border)',
        zIndex: 25,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--fg)',
      }}>
        <Icon name="kebab-h" size={14} />
      </div>
      <MenuPopover items={DICT_KEBAB_ITEMS} style={{ top: 280, left: 328 }} />
    </>
  );
}

// ─── Kebab menu: wpis w słowniku (wiersz tabeli) ─────────────────────
const ROW_KEBAB_ITEMS = [
  { label: 'Podgląd i edycja' },
  { text: 'Podgląd wpisu',      icon: 'eye',     kbd: '↵' },
  { text: 'Edytuj wpis',        icon: 'edit',    kbd: 'E' },
  { text: 'Duplikuj wpis',      icon: 'paperclip' },
  { divider: true },
  { label: 'Skopiuj do schowka' },
  { text: 'Skopiuj kod',        icon: 'paperclip', sub: 'PL' },
  { text: 'Skopiuj jako JSON',  icon: 'file' },
  { divider: true },
  { text: 'Eksportuj wpis',     icon: 'download' },
  { text: 'Historia wpisu',     icon: 'history',   sub: '14 zmian' },
  { divider: true },
  { text: 'Zmień status…',      icon: 'tag' },
  { text: 'Usuń wpis…',         icon: 'trash', kind: 'danger' },
];

function SceneRowKebab() {
  return (
    <>
      <SceneMainView dict="countries" selectedRows={[]} />
      {/* Highlight kebab button on the first row */}
      <div style={{
        position: 'absolute',
        top: 276, left: 1197,  // pierwszy wiersz tabeli, kolumna akcji
        width: 26, height: 26, borderRadius: 'var(--r)',
        background: 'var(--bg-muted)',
        border: '1px solid var(--border)',
        zIndex: 25,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--fg)',
      }}>
        <Icon name="kebab-h" size={14} />
      </div>
      <MenuPopover items={ROW_KEBAB_ITEMS} style={{ top: 308, right: 50 }} />
    </>
  );
}

Object.assign(window, { MenuPopover, SceneDictKebab, SceneRowKebab });
