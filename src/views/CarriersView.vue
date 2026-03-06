<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'

const carriers = [
  {
    name: 'FedEx',
    gradient: 'linear-gradient(135deg, #4D148C, #FF6600)',
    packages: '1,240',
    avgDays: '2.4',
  },
  {
    name: 'DHL',
    gradient: 'linear-gradient(135deg, #FFCC00, #D40511)',
    packages: '890',
    avgDays: '3.1',
  },
  {
    name: 'UPS',
    gradient: 'linear-gradient(135deg, #351C15, #FFB500)',
    packages: '1,560',
    avgDays: '2.8',
  },
  {
    name: 'Amazon',
    gradient: 'linear-gradient(135deg, #232F3E, #FF9900)',
    packages: '2,100',
    avgDays: '1.9',
  },
]
</script>

<template>
  <div class="pageLayout">
    <AppSidebar activePage="/carriers" />

    <main class="pageMain">
      <DashboardHeader title="Carrier Directory" />

      <div class="pageContent">
        <div class="contentInner">
          <!-- Carrier Cards -->
          <div class="carrierGrid">
            <div v-for="carrier in carriers" :key="carrier.name" class="carrierCard">
              <div class="carrierBanner" :style="{ background: carrier.gradient }">
                <span class="carrierBannerName">{{ carrier.name }}</span>
              </div>
              <div class="carrierBody">
                <h3 class="carrierTitle">{{ carrier.name }} Express</h3>
                <div class="carrierStats">
                  <div class="carrierStat">
                    <span class="material-symbols-outlined statIcon">package</span>
                    <span>{{ carrier.packages }} active</span>
                  </div>
                  <div class="carrierStat">
                    <span class="material-symbols-outlined statIcon">schedule</span>
                    <span>{{ carrier.avgDays }} days avg.</span>
                  </div>
                </div>
                <button class="manageBtn">Manage</button>
              </div>
            </div>
          </div>

          <!-- Live Network Coverage -->
          <div class="networkSection">
            <h3 class="networkTitle">Live Network Coverage</h3>
            <div class="mapContainer">
              <img
                src="https://placeholder.pics/svg/800x450/0d1117/2dd4bf?text=GLOBAL%20LOGISTICS%20MAP"
                alt="Global logistics map"
                class="mapImage"
              />
              <div class="mapOverlay"></div>
              <div class="mapDot mapDot1">
                <span class="dotPing"></span>
                <span class="dotSolid"></span>
              </div>
              <div class="mapDot mapDot2">
                <span class="dotPing"></span>
                <span class="dotSolid"></span>
              </div>
              <div class="mapDot mapDot3">
                <span class="dotPing"></span>
                <span class="dotSolid"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.pageLayout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-base);
}

.pageMain {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.pageContent {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-xl);
}

.contentInner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ---- Carrier Grid ---- */
.carrierGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 640px) {
  .carrierGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .carrierGrid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.carrierCard {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition:
    border-color 0.2s,
    transform 0.2s;
}

.carrierCard:hover {
  border-color: rgba(45, 212, 191, 0.25);
  transform: translateY(-2px);
}

.carrierBanner {
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carrierBannerName {
  color: #fff;
  font-size: var(--text-xl);
  font-weight: 900;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.carrierBody {
  padding: 20px;
}

.carrierTitle {
  font-weight: 700;
  font-size: var(--text-base);
  margin-bottom: var(--spacing-sm);
}

.carrierStats {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.carrierStat {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.statIcon {
  font-size: 16px;
}

.manageBtn {
  width: 100%;
  margin-top: var(--spacing-md);
  padding: 10px;
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-size: var(--text-xs);
  font-weight: 700;
  transition:
    background 0.2s,
    color 0.2s;
}

.manageBtn:hover {
  background: var(--color-primary);
  color: var(--bg-base);
}

/* ---- Network Section ---- */
.networkSection {
  padding: var(--spacing-lg);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
}

.networkTitle {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.mapContainer {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-elevated);
}

.mapImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.mapOverlay {
  position: absolute;
  inset: 0;
  background: rgba(45, 212, 191, 0.04);
  pointer-events: none;
}

.mapDot {
  position: absolute;
  width: 12px;
  height: 12px;
}

.mapDot1 {
  top: 25%;
  left: 33%;
}
.mapDot2 {
  top: 50%;
  left: 55%;
}
.mapDot3 {
  top: 35%;
  left: 72%;
}

.dotPing {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: var(--color-primary);
  opacity: 0.6;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.dotSolid {
  position: absolute;
  inset: 2px;
  border-radius: 9999px;
  background: var(--color-primary);
  box-shadow: 0 0 10px var(--color-primary);
}

@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  75%,
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
