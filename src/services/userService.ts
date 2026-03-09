/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description CRUD operations and authentication for the User entity.
 */

import { apiFetch } from './api'
import type { UserInterface } from '@/interfaces'
import type { CreateUserDTO, UpdateUserDTO, LoginDTO, AuthResponseDTO } from '@/dtos'

const MOCK_USERS: UserInterface[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@quantum-tech.io',
    password: 'admin123',
    role: 'Admin',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ0jbd7M1shlf4BjKGrH0gsgCwxpLKJBtqnQWbNld6eXFykstsRJHUpRFggUV1ACpSY3ahOvEfoRswG1v99TF5FnRVsIRh621s0nhbrDZtR7B_RlQtd4Cw3X_Tofx17lzApi1wmC5FUr_roBO4-1a6Zw2EYtdTA3le8Ux8HLXTvijVGRGdcclNjbRL8Y4Sd2KS85wy9GRlXIcCQkr_Dhxw92zN21ORRAawzEUNwRUaEx7s630udmyDnVNFsPXObaNSO7gdU7hlfh1S',
  },
  {
    id: 'user-2',
    name: 'Maria Garcia',
    email: 'maria.g@global.net',
    password: 'manager123',
    role: 'Manager',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3vpmkxarpB0SV14Zfz2Awz17xzM2i1PmP41oBTau5jzTecGJKl8C90bzRlS7SYiRT-yxW6R5QUdl0SJ46G9chewMrSepfTYj61WiSKgL-PGj9sB-7yr5NYAi30sD8l2GunGeYT-X7WPiXTL4qZpO35o7asIyxvEYreIhvJWJnL70MFIcsZeOtoW5jS-SPnpTgetncxKB1lmwkxwLY_Q5KNWYoV5v89Bpn8X_-ALusTBUrnQmjDpZGcoAQServcjMJ0uOPqwwduHxU',
  },
]

export class UserService {
  static async getAll(): Promise<UserInterface[]> {
    return apiFetch('/users', undefined, MOCK_USERS)
  }

  static async getById(id: string): Promise<UserInterface | undefined> {
    return apiFetch(
      `/users/${id}`,
      undefined,
      MOCK_USERS.find((u) => u.id === id),
    )
  }

  static async create(dto: CreateUserDTO): Promise<UserInterface> {
    const newUser: UserInterface = {
      id: `user-${Date.now()}`,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
      avatarUrl: '',
    }
    MOCK_USERS.push(newUser)
    return Promise.resolve(newUser)
  }

  static async update(dto: UpdateUserDTO): Promise<UserInterface | undefined> {
    const user = MOCK_USERS.find((u) => u.id === dto.id)
    if (user) {
      if (dto.name !== undefined) user.name = dto.name
      if (dto.email !== undefined) user.email = dto.email
      if (dto.password !== undefined) user.password = dto.password
      if (dto.role !== undefined) user.role = dto.role
      if (dto.avatarUrl !== undefined) user.avatarUrl = dto.avatarUrl
    }
    return Promise.resolve(user)
  }

  static async remove(id: string): Promise<void> {
    const idx = MOCK_USERS.findIndex((u) => u.id === id)
    if (idx !== -1) MOCK_USERS.splice(idx, 1)
    return Promise.resolve()
  }

  static async login(dto: LoginDTO): Promise<AuthResponseDTO> {
    const user = MOCK_USERS.find((u) => u.email === dto.email && u.password === dto.password)
    if (!user) throw { status: 401, message: 'Invalid credentials' }
    return Promise.resolve({ token: 'mock-jwt-token', user })
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('auth_token')
    return Promise.resolve()
  }
}
