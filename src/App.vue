<template>
  <div id="app" class="... flex h-full w-full flex-row justify-center">
    <div id="menu-bar" class="... w-1/6 bg-white">
      <MenuBar />
    </div>
    <div class="... grow bg-slate-100">Test</div>
  </div>
</template>

<script lang="ts">
import MenuBar from "@/components/MenuBar.vue";

export default {
  components: {
    MenuBar,
  },
  setup() {},
};
</script>
