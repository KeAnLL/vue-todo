<template>
  <div
    class="text:lg flex flex-col items-center text-primary md:flex-row md:text-3xl"
    :class="$style.icontext"
  >
    <AppSvgIcon
      dirName="common"
      iconName="logo"
      class="mr-0 stroke-secondary md:mr-2"
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
