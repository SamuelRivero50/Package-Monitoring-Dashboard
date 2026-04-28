/** @author David Hdez, Juan Andrés Young */
// Internal imports
import { ACCESS_TOKEN_KEY, httpClient } from '@/services/httpClient';
import type { RegisterDTO } from '@/dtos/users/RegisterDTO';
import type { UserInterface } from '@/interfaces/UserInterface';

interface AccessTokenResponse {
  access_token: string;
}

export class AuthService {
  static async login(email: string, password: string): Promise<void> {
    const { data } = await httpClient.post<AccessTokenResponse>('auth/login', {
      email,
      password,
    });
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  }

  static async register(payload: RegisterDTO): Promise<void> {
    const { data } = await httpClient.post<AccessTokenResponse>(
      'auth/register',
      payload,
    );
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  }

  static async getCurrentUser(): Promise<UserInterface | null> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return null;

    try {
      const { data } = await httpClient.get<UserInterface>('auth/profile');
      return data;
    } catch {
      return null;
    }
  }

  static logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
