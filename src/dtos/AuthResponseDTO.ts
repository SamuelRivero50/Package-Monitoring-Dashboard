/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description DTO for auth response.
 */

import type { UserInterface } from '@/interfaces'

export interface AuthResponseDTO {
  token: string
  user: UserInterface
}
