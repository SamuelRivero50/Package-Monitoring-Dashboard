<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="signup-page">
    <!-- Header -->
    <header class="signup-header">
      <RouterLink to="/" class="signup-logo">
        <div class="logo-icon-compact">
          <span class="material-symbols-outlined">package_2</span>
        </div>
        <h1 class="logo-name">PackTrack</h1>
      </RouterLink>
      <div class="signup-header-right">
        <span class="header-hint">Already have an account?</span>
        <RouterLink to="/dashboard" class="btn-signin">Sign in</RouterLink>
      </div>
    </header>

    <!-- Main content -->
    <main class="signup-main">
      <!-- Left panel — decorative -->
      <div class="signup-left">
        <div class="signup-left-inner">
          <h2 class="signup-hero-title">Start Your <span class="hero-highlight">Journey</span></h2>
          <p class="signup-hero-desc">
            The next generation of logistics management. Join thousands of companies streamlining
            their supply chain today.
          </p>

          <div class="feature-list">
            <div class="feature-row">
              <span class="material-symbols-outlined feature-check">check_circle</span>
              <div>
                <h4 class="feature-row-title">Real-time tracking updates</h4>
                <p class="feature-row-desc">
                  Monitor every movement of your fleet in real-time with GPS integration.
                </p>
              </div>
            </div>
            <div class="feature-row">
              <span class="material-symbols-outlined feature-check">check_circle</span>
              <div>
                <h4 class="feature-row-title">Multiple carrier support</h4>
                <p class="feature-row-desc">
                  Connect with DHL, FedEx, UPS and 50+ regional carriers seamlessly.
                </p>
              </div>
            </div>
            <div class="feature-row">
              <span class="material-symbols-outlined feature-check">check_circle</span>
              <div>
                <h4 class="feature-row-title">Warehouse management</h4>
                <p class="feature-row-desc">
                  Advanced inventory control and space optimization tools.
                </p>
              </div>
            </div>
          </div>

          <div class="promo-card">
            <div class="promo-gradient"></div>
            <div class="promo-label">
              <p class="promo-title">Global Distribution Dashboard</p>
              <p class="promo-sub">Live Data View</p>
            </div>
            <img
              class="promo-img"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRRU9lT5CC1ffZB-dmlHA7Epo11N92ey4eINyLW2jaW_Tp2FBsKlX0ZVBEAycGa7CBKB3MUY_PAz9OUvX8-_Lak7EgTrYfmn-aKjXEPc2ODyNKF4JxrPfRtm4yGnANV1eWfRD8xBtrJc5IIvHIR_rYLjGU9rxhCAQ_5oDCmBevizaPDTMprURHSnwl7CIGq-e4qL63ec0PtGbHs6RiOS8SnwkQCjzhkusaBSRwbHO0Qtis1rI3zIeufOybOeHwF98m_Bt9ZsvIFhTg"
              alt="Dashboard preview"
            />
          </div>
        </div>
      </div>

      <!-- Right panel — form -->
      <div class="signup-right">
        <div class="signup-form-wrapper">
          <div class="form-header">
            <h2 class="form-title">Create an account</h2>
            <p class="form-subtitle">Join the PackTrack network and start optimizing.</p>
          </div>

          <form class="signup-form">
            <div class="form-field">
              <label class="field-label">Full Name</label>
              <div class="input-wrap">
                <span class="material-symbols-outlined input-icon">person</span>
                <input type="text" placeholder="John Doe" class="field-input" />
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">Email Address</label>
              <div class="input-wrap">
                <span class="material-symbols-outlined input-icon">mail</span>
                <input type="email" placeholder="john@company.com" class="field-input" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-field">
                <label class="field-label">Password</label>
                <div class="input-wrap">
                  <span class="material-symbols-outlined input-icon">lock</span>
                  <input type="password" placeholder="••••••••" class="field-input" />
                </div>
              </div>
              <div class="form-field">
                <label class="field-label">Confirm Password</label>
                <div class="input-wrap">
                  <span class="material-symbols-outlined input-icon">verified_user</span>
                  <input type="password" placeholder="••••••••" class="field-input" />
                </div>
              </div>
            </div>

            <div class="terms-row">
              <input type="checkbox" id="terms" class="terms-checkbox" />
              <label for="terms" class="terms-label">
                I agree to the
                <a href="#" class="terms-link">Terms of Service</a> and
                <a href="#" class="terms-link">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" class="btn-create">
              <span>Create Account</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div class="social-divider">
            <p class="divider-text">Or sign up with</p>
            <div class="social-buttons">
              <button class="social-btn">
                <img
                  alt="Google"
                  class="social-icon"
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                />
                <span>Google</span>
              </button>
              <button class="social-btn">
                <img
                  alt="LinkedIn"
                  class="social-icon"
                  src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000"
                />
                <span>LinkedIn</span>
              </button>
            </div>
            <div class="mobile-signin">
              <span>Already have an account?</span>
              <RouterLink to="/dashboard" class="mobile-signin-link">Sign in</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
}

/* ---- Header ---- */
.signup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg) var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
}

@media (min-width: 1024px) {
  .signup-header {
    padding: var(--spacing-lg) 80px;
  }
}

.signup-logo {
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

.signup-header-right {
  display: none;
}

@media (min-width: 768px) {
  .signup-header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
}

.header-hint {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.btn-signin {
  padding: 8px 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  font-weight: 600;
  font-size: var(--text-sm);
  transition:
    background 0.2s,
    color 0.2s;
}

.btn-signin:hover {
  background: rgba(45, 212, 191, 0.1);
}

/* ---- Main layout ---- */
.signup-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .signup-main {
    flex-direction: row;
  }
}

/* ---- Left panel ---- */
.signup-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
  background: linear-gradient(135deg, var(--bg-hero) 0%, #0a1628 100%);
  border-right: 1px solid var(--border-subtle);
}

@media (min-width: 1024px) {
  .signup-left {
    width: 50%;
    padding: 64px 96px;
  }
}

.signup-left-inner {
  max-width: 480px;
}

.signup-hero-title {
  font-size: clamp(32px, 4vw, 60px);
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
}

.hero-highlight {
  color: var(--color-primary);
}

.signup-hero-desc {
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

/* Promo card */
.promo-card {
  margin-top: 64px;
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(45, 212, 191, 0.2);
}

.promo-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 17, 23, 0.85), transparent);
  z-index: 1;
}

.promo-label {
  position: absolute;
  bottom: var(--spacing-md);
  left: var(--spacing-md);
  z-index: 2;
}

.promo-title {
  font-weight: 600;
  color: #fff;
}

.promo-sub {
  font-size: var(--text-xs);
  color: var(--color-primary);
}

.promo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---- Right panel ---- */
.signup-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
  background: var(--bg-base);
}

@media (min-width: 1024px) {
  .signup-right {
    width: 50%;
    padding: 64px 96px;
  }
}

.signup-form-wrapper {
  max-width: 480px;
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

/* ---- Form ---- */
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  background: var(--bg-base);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: var(--text-base);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.field-input::placeholder {
  color: var(--text-muted);
}

.field-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.12);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

/* Terms */
.terms-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
}

.terms-checkbox {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-default);
  background: transparent;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.terms-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.terms-link {
  color: var(--color-primary);
  transition: text-decoration 0.15s;
}

.terms-link:hover {
  text-decoration: underline;
}

/* Create button */
.btn-create {
  width: 100%;
  background: #21262d;
  color: var(--text-primary);
  font-weight: 600;
  padding: 16px 24px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: var(--text-base);
  transition:
    transform 0.1s,
    background 0.2s;
}

.btn-create:active {
  transform: scale(0.98);
}

.btn-create:hover {
  background: #2d333b;
}

/* ---- Social section ---- */
.social-divider {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border-default);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.divider-text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.social-buttons {
  display: flex;
  gap: var(--spacing-md);
  width: 100%;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: 10px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
  font-weight: 500;
  transition:
    background 0.15s,
    border-color 0.15s;
}

.social-btn:hover {
  background: var(--bg-surface);
  border-color: var(--color-primary);
}

.social-icon {
  width: 20px;
  height: 20px;
}

.mobile-signin {
  display: flex;
  gap: var(--spacing-xs);
  font-size: var(--text-sm);
  margin-top: var(--spacing-md);
  color: var(--text-secondary);
}

.mobile-signin-link {
  font-weight: 700;
  color: var(--color-primary);
}

@media (min-width: 1024px) {
  .mobile-signin {
    display: none;
  }
}
</style>
