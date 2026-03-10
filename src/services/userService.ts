/**
 * @author Samuel Rivero
 * @description CRUD operations and authentication for the User entity. Persisted in LocalStorage.
 */

// data
import { getFromStorage, setToStorage, STORAGE_KEYS } from '@/infrastructure/storage'

// types
import type { UserInterface } from '@/interfaces'
import type { CreateUserDTO, UpdateUserDTO, LoginDTO, AuthResponseDTO } from '@/dtos'

function loadAll(): UserInterface[] {
  return getFromStorage<UserInterface[]>(STORAGE_KEYS.USERS) ?? []
}

export class UserService {
  static async getAll(): Promise<UserInterface[]> {
    return loadAll()
  }

  static async getById(id: string): Promise<UserInterface | undefined> {
    return loadAll().find((u) => u.id === id)
  }

  static async create(dto: CreateUserDTO): Promise<UserInterface> {
    const all = loadAll()
    const newUser: UserInterface = {
      id: `user-${Date.now()}`,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
      avatarUrl: dto.avatarUrl ?? '',
    }
    all.push(newUser)
    setToStorage(STORAGE_KEYS.USERS, all)
    return newUser
  }

  static async update(dto: UpdateUserDTO): Promise<UserInterface | undefined> {
    const all = loadAll()
    const idx = all.findIndex((u) => u.id === dto.id)
    const user = idx !== -1 ? all[idx] : undefined
    if (!user) return undefined
    if (dto.name !== undefined) user.name = dto.name
    if (dto.email !== undefined) user.email = dto.email
    if (dto.password !== undefined) user.password = dto.password
    if (dto.role !== undefined) user.role = dto.role
    if (dto.avatarUrl !== undefined) user.avatarUrl = dto.avatarUrl
    setToStorage(STORAGE_KEYS.USERS, all)
    return user
  }

  static async remove(id: string): Promise<void> {
    const all = loadAll().filter((u) => u.id !== id)
    setToStorage(STORAGE_KEYS.USERS, all)
  }

  static async login(dto: LoginDTO): Promise<AuthResponseDTO> {
    const user = loadAll().find((u) => u.email === dto.email && u.password === dto.password)
    if (!user) throw { status: 401, message: 'Invalid credentials' }
    return { token: 'mock-jwt-token', user }
  }

  static async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
  }
}
