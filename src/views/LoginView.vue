<script setup lang="ts">
/**
 * @author Samuel Rivero
 * @description Login page - email/password authentication. Redirects to dashboard on success.
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

async function submitLogin() {
  error.value = ''
  if (!email.value.trim() || !password.value) {
    error.value = 'Email and password are required.'
    return
  }
  isLoading.value = true
  try {
    await auth.login({ email: email.value.trim(), password: password.value })
    const redirect = (router.currentRoute.value.query.redirect as string) || '/dashboard'
    router.push(redirect)
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string }
    error.value = err?.message ?? 'Invalid credentials. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <header class="login-header">
      <RouterLink to="/" class="login-logo">
        <div class="logo-icon-compact">
          <span class="material-symbols-outlined">package_2</span>
        </div>
        <h1 class="logo-name">PackTrack</h1>
      </RouterLink>
      <div class="login-header-right">
        <span class="header-hint">Don't have an account?</span>
        <RouterLink to="/signup" class="btn-signup">Sign up</RouterLink>
      </div>
    </header>

    <main class="login-main">
      <div class="login-left">
        <div class="login-left-inner">
          <h2 class="login-hero-title">Welcome <span class="hero-highlight">Back</span></h2>
          <p class="login-hero-desc">
            Sign in to access your logistics dashboard. Track packages, manage warehouses, and
            streamline your supply chain.
          </p>
          <div class="feature-list">
            <div class="feature-row">
              <span class="material-symbols-outlined feature-check">check_circle</span>
              <div>
                <h4 class="feature-row-title">Real-time tracking</h4>
                <p class="feature-row-desc">Monitor every movement of your packages.</p>
              </div>
            </div>
            <div class="feature-row">
              <span class="material-symbols-outlined feature-check">check_circle</span>
              <div>
                <h4 class="feature-row-title">Multi-warehouse support</h4>
                <p class="feature-row-desc">Manage inventory across locations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="login-right">
        <div class="login-form-wrapper">
          <div class="form-header">
            <h2 class="form-title">Sign in</h2>
            <p class="form-subtitle">Enter your credentials to access your account.</p>
          </div>

          <form class="login-form" @submit.prevent="submitLogin">
            <p v-if="error" class="form-error">{{ error }}</p>
            <div class="form-field">
              <label class="field-label" for="login-email">Email</label>
              <div class="input-wrap">
                <span class="material-symbols-outlined input-icon">mail</span>
                <input
                  id="login-email"
                  v-model="email"
                  type="email"
                  placeholder="alex@quantum-tech.io"
                  class="field-input"
                  autocomplete="email"
                />
              </div>
            </div>
            <div class="form-field">
              <label class="field-label" for="login-password">Password</label>
              <div class="input-wrap">
                <span class="material-symbols-outlined input-icon">lock</span>
                <input
                  id="login-password"
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  class="field-input"
                  autocomplete="current-password"
                />
              </div>
            </div>
            <button type="submit" class="btn-submit" :disabled="isLoading">
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign in</span>
              <span v-if="!isLoading" class="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div class="login-footer">
            <span>Don't have an account?</span>
            <RouterLink to="/signup" class="login-footer-link">Sign up</RouterLink>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg) var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
}

@media (min-width: 1024px) {
  .login-header {
    padding: var(--spacing-lg) 80px;
  }
}

.login-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo-icon-compact {
  padding: 8px;
  background: rgba(45, 212, 191, 0.15);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon-compact .material-symbols-outlined {
  font-size: 24px;
}

.logo-name {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.login-header-right {
  display: none;
}

@media (min-width: 768px) {
  .login-header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
}

.header-hint {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.btn-signup {
  padding: 8px 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  font-weight: 600;
  font-size: var(--text-sm);
  transition: background 0.2s, color 0.2s;
}

.btn-signup:hover {
  background: rgba(45, 212, 191, 0.1);
}

.login-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .login-main {
    flex-direction: row;
  }
}

.login-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
  background: linear-gradient(135deg, var(--bg-hero) 0%, #0a1628 100%);
  border-right: 1px solid var(--border-subtle);
}

@media (min-width: 1024px) {
  .login-left {
    width: 50%;
    padding: 64px 96px;
  }
}

.login-left-inner {
  max-width: 480px;
}

.login-hero-title {
  font-size: clamp(32px, 4vw, 60px);
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
}

.hero-highlight {
  color: var(--color-primary);
}

.login-hero-desc {
  color: var(--text-secondary);
  font-size: var(--text-lg);
  margin-bottom: 40px;
  line-height: 1.6;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.feature-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.feature-check {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-row-title {
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.feature-row-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.login-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
  background: var(--bg-base);
}

@media (min-width: 1024px) {
  .login-right {
    width: 50%;
    padding: 64px 96px;
  }
}

.login-form-wrapper {
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.form-header {
  margin-bottom: var(--spacing-xl);
}

.form-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.form-subtitle {
  color: var(--text-secondary);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-error {
  padding: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-md);
  color: #ef4444;
  font-size: var(--text-sm);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.field-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.input-wrap {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 20px;
}

.field-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: var(--text-base);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field-input::placeholder {
  color: var(--text-muted);
}

.field-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.12);
}

.btn-submit {
  width: 100%;
  background: var(--color-primary);
  color: var(--bg-base);
  font-weight: 600;
  padding: 16px 24px;
  border-radius: var(--radius-lg);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: var(--text-base);
  cursor: pointer;
  transition: filter 0.2s;
}

.btn-submit:hover:not(:disabled) {
  filter: brightness(1.1);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border-default);
  display: flex;
  gap: var(--spacing-xs);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.login-footer-link {
  font-weight: 700;
  color: var(--color-primary);
}
</style>
