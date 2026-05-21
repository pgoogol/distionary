import { useEffect, useState } from 'react'

type HealthResponse = { status: string; service: string }

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<HealthResponse>
      })
      .then(setHealth)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <h1>Distionary</h1>
      <p>System zarządzania słownikami — szkielet aplikacji.</p>
      <section style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #e4e4e7', borderRadius: 8 }}>
        <h2 style={{ margin: 0, fontSize: '1rem' }}>Backend status</h2>
        {health && (
          <pre style={{ margin: '0.5rem 0 0', color: '#16a34a' }}>{JSON.stringify(health, null, 2)}</pre>
        )}
        {error && (
          <pre style={{ margin: '0.5rem 0 0', color: '#dc2626' }}>Błąd: {error}</pre>
        )}
        {!health && !error && <p style={{ margin: '0.5rem 0 0', color: '#71717a' }}>Sprawdzam…</p>}
      </section>
      <p style={{ marginTop: '2rem', color: '#71717a', fontSize: '0.875rem' }}>
        Referencja designu: <code>/design-reference/index.html</code>
      </p>
    </main>
  )
}

export default App
