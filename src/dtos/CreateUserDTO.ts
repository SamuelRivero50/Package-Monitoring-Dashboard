/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description DTO for creating a User.
 */

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  role: string
}
