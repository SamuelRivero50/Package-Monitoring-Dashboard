/**
 * @author Samuel Rivero
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
