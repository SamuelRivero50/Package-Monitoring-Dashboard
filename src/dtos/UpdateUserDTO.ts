/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description DTO for updating a User.
 */

export interface UpdateUserDTO {
  id: string
  name?: string
  email?: string
  password?: string
  role?: string
  avatarUrl?: string
}
