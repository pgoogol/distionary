export type DictionaryStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED'
export type DictionarySource = 'INTERNAL' | 'ISO' | 'SYNC'

export type Dictionary = {
  id: number
  apiKey: string
  name: string
  description: string | null
  icon: string | null
  dataSource: DictionarySource
  status: DictionaryStatus
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: string | null
}

export type CreateDictionaryRequest = {
  apiKey: string
  name: string
  description?: string
  icon?: string
  dataSource?: DictionarySource
  status?: DictionaryStatus
}

type ProblemDetail = {
  title?: string
  detail?: string
  status?: number
  errors?: Record<string, string>
}

export class ApiError extends Error {
  status: number
  fieldErrors?: Record<string, string>

  constructor(status: number, message: string, fieldErrors?: Record<string, string>) {
    super(message)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

async function handle<T>(res: Response): Promise<T> {
  if (res.ok) {
    if (res.status === 204) return undefined as T
    return (await res.json()) as T
  }
  let problem: ProblemDetail = {}
  try {
    problem = (await res.json()) as ProblemDetail
  } catch {
    /* non-JSON error body */
  }
  throw new ApiError(
    res.status,
    problem.detail ?? problem.title ?? `HTTP ${res.status}`,
    problem.errors,
  )
}

export function listDictionaries(): Promise<Dictionary[]> {
  return fetch('/api/dictionaries').then(handle<Dictionary[]>)
}

export function createDictionary(req: CreateDictionaryRequest): Promise<Dictionary> {
  return fetch('/api/dictionaries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  }).then(handle<Dictionary>)
}
