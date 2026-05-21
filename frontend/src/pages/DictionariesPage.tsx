import { useEffect, useState } from 'react'
import {
  ApiError,
  createDictionary,
  listDictionaries,
  type CreateDictionaryRequest,
  type Dictionary,
  type DictionarySource,
} from '../api/dictionaries'

const STATUS_COLORS: Record<Dictionary['status'], string> = {
  ACTIVE: '#16a34a',
  DRAFT: '#a16207',
  ARCHIVED: '#71717a',
}

export function DictionariesPage() {
  const [dictionaries, setDictionaries] = useState<Dictionary[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const reload = () => {
    setError(null)
    listDictionaries()
      .then(setDictionaries)
      .catch((e: Error) => setError(e.message))
  }

  useEffect(reload, [])

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>Słowniki</h1>
          <p style={{ margin: '0.25rem 0 0', color: '#71717a' }}>
            {dictionaries === null ? 'Ładowanie…' : `${dictionaries.length} słowników`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          style={btnPrimary}
        >
          {showForm ? 'Anuluj' : '+ Nowy słownik'}
        </button>
      </header>

      {showForm && (
        <CreateForm
          onCreated={() => {
            setShowForm(false)
            reload()
          }}
        />
      )}

      {error && (
        <div style={{ padding: '1rem', background: '#fef2f2', color: '#991b1b', borderRadius: 8, marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {dictionaries && dictionaries.length === 0 && !showForm && (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#71717a', border: '1px dashed #d4d4d8', borderRadius: 8 }}>
          Brak słowników. Dodaj pierwszy klikając „+ Nowy słownik".
        </div>
      )}

      {dictionaries && dictionaries.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
          {dictionaries.map((d) => (
            <li key={d.id} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{d.name}</h3>
                  <code style={{ color: '#71717a', fontSize: '0.85rem' }}>{d.apiKey}</code>
                  {d.description && <p style={{ margin: '0.5rem 0 0', color: '#52525b' }}>{d.description}</p>}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ ...badgeStyle, background: STATUS_COLORS[d.status] }}>{d.status}</span>
                  <span style={{ ...badgeStyle, background: '#3f3f46' }}>{d.dataSource}</span>
                </div>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#a1a1aa' }}>
                Zmodyfikowano: {new Date(d.lastModifiedAt).toLocaleString('pl-PL')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

function CreateForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState<CreateDictionaryRequest>({
    apiKey: '',
    name: '',
    description: '',
    dataSource: 'INTERNAL',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setFieldErrors({})
    createDictionary({
      apiKey: form.apiKey.trim(),
      name: form.name.trim(),
      description: form.description?.trim() || undefined,
      dataSource: form.dataSource,
    })
      .then(onCreated)
      .catch((e: Error) => {
        if (e instanceof ApiError) {
          setError(e.message)
          if (e.fieldErrors) setFieldErrors(e.fieldErrors)
        } else {
          setError(e.message)
        }
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <form onSubmit={submit} style={{ padding: '1.25rem', border: '1px solid #e4e4e7', borderRadius: 8, marginBottom: '1rem', background: '#fafafa' }}>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <Field label="API key" error={fieldErrors.apiKey} hint="lowercase, np. 'countries'">
          <input
            value={form.apiKey}
            onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
            required
            style={inputStyle}
          />
        </Field>
        <Field label="Nazwa" error={fieldErrors.name}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={inputStyle}
          />
        </Field>
        <Field label="Opis (opcjonalnie)">
          <textarea
            value={form.description ?? ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </Field>
        <Field label="Źródło danych">
          <select
            value={form.dataSource}
            onChange={(e) => setForm({ ...form, dataSource: e.target.value as DictionarySource })}
            style={inputStyle}
          >
            <option value="INTERNAL">Wewnętrzny</option>
            <option value="ISO">ISO</option>
            <option value="SYNC">Synchronizacja</option>
          </select>
        </Field>
      </div>
      {error && <div style={{ marginTop: '0.75rem', color: '#dc2626', fontSize: '0.875rem' }}>{error}</div>}
      <div style={{ marginTop: '1rem' }}>
        <button type="submit" disabled={submitting} style={btnPrimary}>
          {submitting ? 'Zapisywanie…' : 'Utwórz'}
        </button>
      </div>
    </form>
  )
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.25rem' }}>{label}</div>
      {children}
      {hint && !error && <div style={{ fontSize: '0.75rem', color: '#71717a', marginTop: '0.25rem' }}>{hint}</div>}
      {error && <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.25rem' }}>{error}</div>}
    </label>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid #d4d4d8',
  borderRadius: 6,
  fontSize: '0.95rem',
  boxSizing: 'border-box',
}

const btnPrimary: React.CSSProperties = {
  padding: '0.5rem 1rem',
  background: '#18181b',
  color: '#fafafa',
  border: 'none',
  borderRadius: 6,
  fontSize: '0.9rem',
  cursor: 'pointer',
  fontWeight: 500,
}

const cardStyle: React.CSSProperties = {
  padding: '1rem',
  border: '1px solid #e4e4e7',
  borderRadius: 8,
  background: '#fff',
}

const badgeStyle: React.CSSProperties = {
  padding: '0.15rem 0.5rem',
  color: '#fff',
  borderRadius: 4,
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: 0.5,
}
