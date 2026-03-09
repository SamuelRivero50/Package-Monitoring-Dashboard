/**
 * @author Samuel Rivero
 * @description DTO for creating a User.
 */

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  role: string
  avatarUrl?: string
}
