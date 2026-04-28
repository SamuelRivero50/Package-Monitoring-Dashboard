// External imports
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const ACCESS_TOKEN_KEY = 'access_token';

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);

      const onLoginRoute =
        typeof window !== 'undefined' &&
        window.location.pathname.startsWith('/login');

      if (!onLoginRoute) {
        const { useAuthStore } = await import('@/stores/authstore');
        const { default: router } = await import('@/router');
        useAuthStore().clearSession();
        await router.push('/login');
      }
    }
    return Promise.reject(error);
  },
);

export { ACCESS_TOKEN_KEY, httpClient };
