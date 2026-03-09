/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Central HTTP helper used by all services.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

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

export function buildUrl(path: string): string {
  return `${BASE_URL}${path}`
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  _fallback?: T,
): Promise<T> {
  if (_fallback !== undefined) return Promise.resolve(_fallback)
  throw { status: 501, message: 'Backend not connected' } as ApiError
}
