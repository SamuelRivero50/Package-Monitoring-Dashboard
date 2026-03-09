/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description User domain interface from class diagram.
 * Diagram: id, name, email, password, role, avatarUrl, login(): boolean
 */

export interface UserInterface {
  id: string
  name: string
  email: string
  password: string
  role: string
  avatarUrl: string
}
