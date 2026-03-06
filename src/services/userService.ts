// =============================================================
// User Service
// CRUD operations and authentication for the User entity.
// =============================================================

import { apiFetch } from './api'
import type { User, CreateUserDTO, UpdateUserDTO, LoginDTO, AuthResponse } from '@/models'

// --- Mock data (remove when backend is ready) ---

const MOCK_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Alex Johnson',
    email: 'alex@quantum-tech.io',
    role: 'Admin',
    status: 'Active',
    efficiency: 85,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ0jbd7M1shlf4BjKGrH0gsgCwxpLKJBtqnQWbNld6eXFykstsRJHUpRFggUV1ACpSY3ahOvEfoRswG1v99TF5FnRVsIRh621s0nhbrDZtR7B_RlQtd4Cw3X_Tofx17lzApi1wmC5FUr_roBO4-1a6Zw2EYtdTA3le8Ux8HLXTvijVGRGdcclNjbRL8Y4Sd2KS85wy9GRlXIcCQkr_Dhxw92zN21ORRAawzEUNwRUaEx7s630udmyDnVNFsPXObaNSO7gdU7hlfh1S',
  },
  {
    id: 'usr-2',
    name: 'Maria Garcia',
    email: 'maria.g@global.net',
    role: 'Manager',
    status: 'Active',
    efficiency: 12,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3vpmkxarpB0SV14Zfz2Awz17xzM2i1PmP41oBTau5jzTecGJKl8C90bzRlS7SYiRT-yxW6R5QUdl0SJ46G9chewMrSepfTYj61WiSKgL-PGj9sB-7yr5NYAi30sD8l2GunGeYT-X7WPiXTL4qZpO35o7asIyxvEYreIhvJWJnL70MFIcsZeOtoW5jS-SPnpTgetncxKB1lmwkxwLY_Q5KNWYoV5v89Bpn8X_-ALusTBUrnQmjDpZGcoAQServcjMJ0uOPqwwduHxU',
  },
]

// --- Service methods ---

export const userService = {
  async getAll(): Promise<User[]> {
    // TODO: return apiFetch<User[]>('/users')
    return apiFetch('/users', undefined, MOCK_USERS)
  },

  async getById(id: string): Promise<User | undefined> {
    // TODO: return apiFetch<User>(`/users/${id}`)
    return apiFetch(
      `/users/${id}`,
      undefined,
      MOCK_USERS.find((u) => u.id === id),
    )
  },

  async create(dto: CreateUserDTO): Promise<User> {
    // TODO: return apiFetch<User>('/users', { method: 'POST', body: JSON.stringify(dto) })
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: dto.name,
      email: dto.email,
      role: dto.role,
      status: 'Active',
      efficiency: 0,
      avatar: '',
    }
    MOCK_USERS.push(newUser)
    return Promise.resolve(newUser)
  },

  async update(dto: UpdateUserDTO): Promise<User | undefined> {
    // TODO: return apiFetch<User>(`/users/${dto.id}`, { method: 'PATCH', body: JSON.stringify(dto) })
    const user = MOCK_USERS.find((u) => u.id === dto.id)
    if (user) {
      if (dto.name) user.name = dto.name
      if (dto.email) user.email = dto.email
      if (dto.role) user.role = dto.role
      if (dto.status) user.status = dto.status
    }
    return Promise.resolve(user)
  },

  async remove(id: string): Promise<void> {
    // TODO: return apiFetch<void>(`/users/${id}`, { method: 'DELETE' })
    const idx = MOCK_USERS.findIndex((u) => u.id === id)
    if (idx !== -1) MOCK_USERS.splice(idx, 1)
    return Promise.resolve()
  },

  // --- Auth ---

  // Logs in a user and returns a token + profile.
  async login(dto: LoginDTO): Promise<AuthResponse> {
    // TODO: return apiFetch<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(dto) })
    const user = MOCK_USERS.find((u) => u.email === dto.email)
    if (!user) throw { status: 401, message: 'Invalid credentials' }
    return Promise.resolve({ token: 'mock-jwt-token', user })
  },

  // Clears the stored auth token.
  async logout(): Promise<void> {
    // TODO: return apiFetch<void>('/auth/logout', { method: 'POST' })
    localStorage.removeItem('auth_token')
    return Promise.resolve()
  },
}
