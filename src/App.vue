<template>
  <div id="app" class="h-full w-full flex flex-row justify-center ...">
    <div id="menu-bar" class="bg-white w-1/6 ...">
      <MenuBar />
    </div>
    <div class="grow bg-slate-100 ...">Test</div>
  </div>
</template>

<script>
  import MenuBar from '@/components/MenuBar.vue'

  export default {
    components: {
      MenuBar,
    },
    setup() {
      
    },
  }
</script>
