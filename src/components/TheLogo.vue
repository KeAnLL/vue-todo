<template>
  <div
    class="flex flex-col sm:flex-row items-center text:lg sm:text-3xl text-primary"
    :class="$style.icontext"
  >
    <AppSvgIcon
      dirName="common"
      iconName="logo"
      class="mr-0 sm:mr-2 stroke-secondary"
      :style="{
        height: props.height + 'px',
      }"
    />
    TODO
  </div>
</template>

<script setup lang="ts">
import AppSvgIcon from "./AppSvgIcon.vue";

interface LogoProps {
  height: number;
}

const props = withDefaults(defineProps<LogoProps>(), {
  height: 30,
});
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

.icontext {
  font-family: "Permanent Marker", cursive;
}
</style>
