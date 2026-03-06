// =============================================================
// User Model
// Domain types, DTOs, and auth interfaces for the User entity.
// =============================================================

// --- Status / role enums ---

export type UserRole = 'Admin' | 'Manager' | 'Operator' | 'Viewer'

export type UserStatus = 'Active' | 'Inactive' | 'Suspended'

// --- Core entity ---

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  efficiency: number // 0-100 performance score
  avatar: string
}

// --- DTOs ---

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface UpdateUserDTO {
  id: string
  name?: string
  email?: string
  role?: UserRole
  status?: UserStatus
}

// --- Auth ---

export interface LoginDTO {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}
