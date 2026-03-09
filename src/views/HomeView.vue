<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="landing-page">
    <AppHeader />

    <main class="landing-main">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-grid">
            <div class="hero-content">
              <div class="hero-badge">
                <span class="badge-dot">
                  <span class="dot-ping"></span>
                  <span class="dot-solid"></span>
                </span>
                Next-Gen Logistics Platform
              </div>

              <h2 class="hero-title">
                Track Your Packages <span class="hero-highlight">Anywhere</span>, Anytime
              </h2>

              <p class="hero-description">
                A comprehensive logistics and warehouse management system designed for modern
                businesses. Streamline your supply chain with real-time insights and AI-powered
                automation.
              </p>

              <div class="hero-buttons">
                <RouterLink to="/signup" class="btn-cta">Get Started Free</RouterLink>
                <RouterLink to="/login" class="btn-secondary">Sign in</RouterLink>
              </div>
            </div>

            <div class="hero-visual">
              <div class="hero-image-wrapper">
                <div class="hero-image-overlay"></div>
                <img
                  alt="Logistics Warehouse"
                  class="hero-image"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARpb78izFGAo72ZtI8BC-B6g5wjhtjSSJ1YTdNZf3UN42GBPmDf-8urYObtpI1nDZWlauhK0lgN7xo44Eai0esD5IEBmmblOtEV5S7w9zYqZnQ7Izqq6QjK-SvjpPVPamF1Ku-c0xa18rk7dh6p9iB4YbRuEl9pmYW9-RgxVsLgORS95XRjGjpH-xWvW0eWLvTTdNB5PTVRW9-6POTZkxjP39VipVUNMuJNz93BQgF7k-2WtzNi02b8bgfZmLAt0-gSVrntbNPTQ8v"
                />
                <div class="hero-card-overlay">
                  <div class="hero-card-header">
                    <span class="hero-card-title">Real-time Fleet Status</span>
                    <span class="hero-card-badge">Active</span>
                  </div>
                  <div class="hero-progress-track">
                    <div class="hero-progress-bar" style="width: 75%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">10K+</span>
              <span class="stat-label">Packages Tracked</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">50+</span>
              <span class="stat-label">Warehouses</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">200+</span>
              <span class="stat-label">Global Partners</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">99.9%</span>
              <span class="stat-label">Uptime Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="features-header">
          <span class="features-label">Core Features</span>
          <h2 class="features-title">Why Choose PackTrack?</h2>
          <p class="features-subtitle">
            Our system offers unparalleled control over your inventory and shipments with features
            designed for scale.
          </p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <span class="material-symbols-outlined">location_on</span>
            </div>
            <h4 class="feature-name">Real-time Tracking</h4>
            <p class="feature-desc">
              Monitor every movement from dispatch to delivery with granular GPS data and status
              updates.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <span class="material-symbols-outlined">inventory_2</span>
            </div>
            <h4 class="feature-name">Inventory Management</h4>
            <p class="feature-desc">
              Optimize stock levels with AI-driven analytics and automated replenishment workflows.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <span class="material-symbols-outlined">cloud_sync</span>
            </div>
            <h4 class="feature-name">Cloud Integration</h4>
            <p class="feature-desc">
              Access your data securely from any device. Seamlessly integrate with your existing ERP
              tools.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-container">
          <div class="cta-card">
            <div class="cta-glow"></div>
            <div class="cta-content">
              <h2 class="cta-title">Ready to Transform Your Supply Chain?</h2>
              <p class="cta-desc">
                Join 500+ companies already optimizing their logistics with PackTrack. Scale faster
                and smarter today.
              </p>
              <div class="cta-buttons">
                <RouterLink to="/signup" class="btn-cta-lg">Start Free Trial</RouterLink>
                <button class="btn-outline-lg">Contact Sales</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

.landing-main {
  flex: 1;
}

/* ---- Hero ---- */
.hero-section {
  padding: 80px 0 100px;
  background: var(--bg-hero-gradient);
  position: relative;
  overflow: hidden;
}

.hero-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  max-width: 600px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 4px 14px;
  border-radius: 9999px;
  background: rgba(45, 212, 191, 0.1);
  border: 1px solid rgba(45, 212, 191, 0.2);
  color: var(--color-primary);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: fit-content;
}

.badge-dot {
  position: relative;
  display: flex;
  width: 8px;
  height: 8px;
}

.dot-ping {
  position: absolute;
  display: inline-flex;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background: var(--color-primary);
  opacity: 0.75;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.dot-solid {
  position: relative;
  display: inline-flex;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: var(--color-primary);
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.hero-title {
  font-size: var(--text-hero);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -1px;
  color: var(--text-primary);
}

.hero-highlight {
  color: var(--color-primary);
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.btn-cta {
  padding: 16px 32px;
  border-radius: var(--radius-lg);
  background: var(--color-cta);
  color: #fff;
  font-size: var(--text-lg);
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(224, 123, 57, 0.25);
  transition:
    background 0.2s,
    transform 0.15s;
}

.btn-cta:hover {
  background: var(--color-cta-hover);
  transform: translateY(-2px);
}

.btn-secondary {
  padding: 16px 32px;
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  color: var(--text-primary);
  font-size: var(--text-lg);
  font-weight: 700;
  border: 1px solid var(--border-default);
  transition:
    background 0.2s,
    border-color 0.2s;
}

.btn-secondary:hover {
  background: var(--bg-elevated);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Hero Visual */
.hero-visual {
  display: none;
}

@media (min-width: 1024px) {
  .hero-visual {
    display: block;
  }
}

.hero-image-wrapper {
  aspect-ratio: 1;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--border-default);
  background: var(--bg-surface);
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.hero-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba(45, 212, 191, 0.15), transparent);
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-card-overlay {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  padding: 20px;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  z-index: 2;
}

.hero-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.hero-card-title {
  color: #fff;
  font-weight: 700;
  font-size: var(--text-sm);
}

.hero-card-badge {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary);
  background: rgba(45, 212, 191, 0.2);
  padding: 2px 10px;
  border-radius: var(--radius-sm);
}

.hero-progress-track {
  height: 8px;
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  overflow: hidden;
}

.hero-progress-bar {
  height: 100%;
  background: var(--color-primary);
  border-radius: 9999px;
}

/* ---- Stats ---- */
.stats-section {
  padding: 48px 0;
  border-top: 1px solid var(--border-default);
  border-bottom: 1px solid var(--border-default);
  background: var(--bg-surface);
}

.stats-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-xs);
}

.stat-value {
  font-size: 36px;
  font-weight: 900;
  color: var(--text-primary);
}

.stat-label {
  color: var(--text-secondary);
  font-weight: 500;
}

/* ---- Features ---- */
.features-section {
  padding: 96px var(--spacing-lg);
  max-width: 1280px;
  margin: 0 auto;
}

.features-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 64px;
}

.features-label {
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: var(--text-sm);
  display: block;
  margin-bottom: var(--spacing-md);
}

.features-title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.features-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  transition: border-color 0.25s;
}

.feature-card:hover {
  border-color: rgba(45, 212, 191, 0.35);
}

.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  background: rgba(45, 212, 191, 0.1);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  transition: transform 0.2s;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-icon .material-symbols-outlined {
  font-size: 28px;
}

.feature-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.feature-desc {
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ---- CTA ---- */
.cta-section {
  padding: 96px 0;
  background: rgba(22, 27, 34, 0.4);
}

.cta-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.cta-card {
  border-radius: var(--radius-xl);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  padding: 64px;
  position: relative;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .cta-card {
    padding: 80px;
  }
}

.cta-glow {
  position: absolute;
  top: -120px;
  right: -120px;
  width: 384px;
  height: 384px;
  background: rgba(45, 212, 191, 0.15);
  filter: blur(100px);
  border-radius: 50%;
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-xl);
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: clamp(28px, 4vw, 56px);
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1.15;
}

.cta-desc {
  font-size: 20px;
  color: var(--text-secondary);
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-md);
}

.btn-cta-lg {
  padding: 20px 40px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: var(--bg-base);
  font-size: 20px;
  font-weight: 900;
  transition: transform 0.15s;
  box-shadow: 0 8px 24px rgba(45, 212, 191, 0.2);
}

.btn-cta-lg:hover {
  transform: scale(1.05);
}

.btn-outline-lg {
  padding: 20px 40px;
  border-radius: var(--radius-lg);
  background: transparent;
  border: 2px solid var(--text-primary);
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 900;
  transition: background 0.2s;
}

.btn-outline-lg:hover {
  background: rgba(255, 255, 255, 0.08);
}
</style>
