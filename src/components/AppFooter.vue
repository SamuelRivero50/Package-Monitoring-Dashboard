<!--
  @author Samuel Enrique Rivero Urribarrí, David Hernández Herrera, Juan Andrés Young Hoyos
  @description Site-wide footer with brand, copyright, and quick links.
-->
<template>
  <footer class="border-t border-wire py-12 bg-canvas">
    <div
      class="max-w-[1280px] mx-auto px-6 flex flex-col items-center gap-8 md:flex-row md:justify-between"
    >
      <div class="flex items-center gap-2">
        <div class="flex items-center justify-center w-8 h-8 rounded-md bg-primary/15 text-primary">
          <span class="material-symbols-outlined" style="font-size: 20px">package_2</span>
        </div>
        <span class="text-[20px] font-black text-body">PackTrack</span>
      </div>
      <p class="text-soft text-sm">&copy; 2026 PackTrack. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="text-soft text-sm transition-colors duration-200 hover:text-primary"
          >Privacy</a
        >
        <a href="#" class="text-soft text-sm transition-colors duration-200 hover:text-primary"
          >Terms</a
        >
        <a href="#" class="text-soft text-sm transition-colors duration-200 hover:text-primary"
          >Support</a
        >
      </div>
    </div>
  </footer>
</template>
