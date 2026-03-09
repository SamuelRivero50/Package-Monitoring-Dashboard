/**
 * @author Samuel Rivero, Juan Andrés Young Hoyos
 * @description Seed fictional data on first application load.
 */

import { setToStorage, isSeeded, markSeeded, STORAGE_KEYS } from '@/infrastructure/storage'
import type { PackageInterface, UserInterface, WarehouseInterface } from '@/interfaces'

const SEED_WAREHOUSES: WarehouseInterface[] = [
  {
    id: 'wh-1',
    name: 'Central Hub',
    location: 'Chicago, IL',
    capacity: 85,
    managerName: 'John Smith',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6TjsdYrQy5fAdTDahTr_KTwPOFOV7_z_D6iqLQADxDWZLcxo4SA9sCbQFz2Qnb9JOSmK1JkaIlIn6vRtGIeArN0UOkmIGp1UcqM7hCbCRbhBRMG5tR-TO_gHad47Pb7zphs06e6obbykT6P51hIeiVsYw2imyE4hcklXBtaC8JkDqFX4tD_ZszdYwPPtWlG0OGm2Qe9hXRmk8Hu1vYRNmqR75ZbMmDX2iag-M22531tuzJz26dc__zhFBea-8WW41qu1QcLA14xVY',
  },
  {
    id: 'wh-2',
    name: 'West Coast',
    location: 'Los Angeles, CA',
    capacity: 62,
    managerName: 'Maria Garcia',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFz3OWV5ZyLRCxoDTq_x0J21fK30VPlrAAUwz6nLsP2Pi5Pqi0oOgBSAei2lWa-6-tHm_P3Rksz0wKPenjW28XDMbcbrd4E3V2syshQC0OyHX04KsdBGX-00IBKBLD3F3WYbBa9iPs2x5toqi4VfB3HLN-hHc9ASCQK2i066eiEa9tyjn5-FSkGVDKnfQ49qPjOuaZv8-4wj6jKWBtgPHbc1j_ZtUNiVkRkGdKHPhfFyyjvSS_C0IkNe6HX1zDoOWfIUkPXcsCZy5M',
  },
  {
    id: 'wh-3',
    name: 'East Distro',
    location: 'Newark, NJ',
    capacity: 94,
    managerName: 'Robert Lee',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEPGtwjC4607S8-Lc5LcaeIJCvgWa9NSW6yF5qMDQgTbFAzgMYCqj_ZunalRUG5bZO15ZR-rsrIVgCQQirt1MHeTepdrB4u9nWb6XdtqewUWR_upbA4jGnIOClLAB5uNyjl8SepsWY0RBYGqTH2RXm9gqM4i38MbE4XqeZ1Ry0YYiAUptH_2xmNpgQ2kd8dGQ5v6DCYdCAT7Em7WPlNZs6H36kaxbyFmkMR7Rvw45B4GEXvJsB5GnGI8EHT77hgbOBko3O097hOCl_',
  },
  {
    id: 'wh-4',
    name: 'South Regional',
    location: 'Atlanta, GA',
    capacity: 42,
    managerName: 'Anna Wilson',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiJELYiAbjTpeotsJauBeCzuSbwo4WUMI21jj7K1M9T78YTdIop-rFwEZBxHsGB_IH_rszYruQRzAlDKsrcY9bhv2azIjK975aiaAZReQwikaACtsARKdWOj8hQLFqOt7lfB_6cFJd7Xp_pTs1olIw418-WPW-GL8DdHpTVJEZBr8tx5dvhgWFY-0Hg0vDxWv1q3Blx_0-sHBmLgdrVpUHa7XDtqFXOG48BXU-8MQXONbGhmMP5hvA4Es4aM-NuaBzBC1iTOeIzmPz',
  },
]

const SEED_PACKAGES: PackageInterface[] = [
  {
    id: 'pkg-1',
    userId: 'user-1',
    warehouseId: 'wh-1',
    status: 'In Transit',
    description: 'Electronics Kit',
    price: 299.99,
    createdAt: '2026-03-06T09:00:00Z',
    updatedAt: '2026-03-06T14:20:00Z',
    logHistory: [
      {
        id: 'log-1',
        packageId: 'pkg-1',
        fromWarehouseId: 'wh-1',
        toWarehouseId: 'wh-2',
        previousStatus: 'Pending',
        newStatus: 'In Transit',
        description: 'Picked up from warehouse',
        timestamp: '2026-03-06T09:12:00Z',
      },
    ],
  },
  {
    id: 'pkg-2',
    userId: 'user-2',
    warehouseId: 'wh-2',
    status: 'Delivered',
    description: 'Spare Parts',
    price: 89.5,
    createdAt: '2026-03-04T08:00:00Z',
    updatedAt: '2026-03-05T14:42:00Z',
    logHistory: [
      {
        id: 'log-2',
        packageId: 'pkg-2',
        fromWarehouseId: 'wh-2',
        toWarehouseId: 'wh-2',
        previousStatus: 'In Transit',
        newStatus: 'Delivered',
        description: 'Delivered',
        timestamp: '2026-03-05T14:42:00Z',
      },
    ],
  },
  {
    id: 'pkg-3',
    userId: 'user-3',
    warehouseId: null,
    status: 'Pending',
    description: 'Medical Box',
    price: 150,
    createdAt: '2026-03-06T07:00:00Z',
    updatedAt: '2026-03-06T07:00:00Z',
    logHistory: [
      {
        id: 'log-3',
        packageId: 'pkg-3',
        fromWarehouseId: '',
        toWarehouseId: '',
        previousStatus: '',
        newStatus: 'Pending',
        description: 'Label created',
        timestamp: '2026-03-06T07:00:00Z',
      },
    ],
  },
]

const SEED_USERS: UserInterface[] = [
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
  {
    id: 'user-3',
    name: 'Robert Lee',
    email: 'robert@eastdistro.com',
    password: 'user123',
    role: 'User',
    avatarUrl: '',
  },
]

export function seedIfEmpty(): void {
  if (isSeeded()) return

  setToStorage(STORAGE_KEYS.WAREHOUSES, SEED_WAREHOUSES)
  setToStorage(STORAGE_KEYS.PACKAGES, SEED_PACKAGES)
  setToStorage(STORAGE_KEYS.USERS, SEED_USERS)
  markSeeded()
}
