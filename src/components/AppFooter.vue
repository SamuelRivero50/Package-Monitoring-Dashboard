<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-logo">
        <div class="logo-icon-sm">
          <span class="material-symbols-outlined">package_2</span>
        </div>
        <span class="logo-text-sm">PackTrack</span>
      </div>
      <p class="footer-copy">&copy; 2026 PackTrack. All rights reserved.</p>
      <div class="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Support</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--border-default);
  padding: 48px 0;
  background: var(--bg-base);
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo-icon-sm {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: rgba(45, 212, 191, 0.15);
  color: var(--color-primary);
}

.logo-icon-sm .material-symbols-outlined {
  font-size: 20px;
}

.logo-text-sm {
  font-size: 20px;
  font-weight: 900;
  color: var(--text-primary);
}

.footer-copy {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.footer-links {
  display: flex;
  gap: var(--spacing-lg);
}

.footer-links a {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--color-primary);
}
</style>
