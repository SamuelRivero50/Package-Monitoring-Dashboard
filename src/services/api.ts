// =============================================================
// API Client
// Central HTTP helper used by all services.
// Set VITE_API_BASE_URL in your .env to point at the backend.
// =============================================================

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// --- Response shapes ---

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiError {
  status: number
  message: string
  details?: Record<string, string[]>
}

// --- Helpers ---

export function buildUrl(path: string): string {
  return `${BASE_URL}${path}`
}

// Main fetch wrapper.
// While the backend isn't ready, it returns the `fallback` value passed by each service.
// To go live: remove the stub block and uncomment the real fetch below.
export async function apiFetch<T>(path: string, options?: RequestInit, _fallback?: T): Promise<T> {
  // --- Real implementation (uncomment when backend is connected) ---
  // const token = localStorage.getItem('auth_token')
  // const res = await fetch(buildUrl(path), {
  //   ...options,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     ...options?.headers,
  //   },
  // })
  // if (!res.ok) {
  //   const err: ApiError = await res.json()
  //   throw err
  // }
  // return res.json() as Promise<T>

  // --- Stub (offline / mock mode) ---
  if (_fallback !== undefined) return Promise.resolve(_fallback)
  throw { status: 501, message: 'Backend not connected' } as ApiError
}
