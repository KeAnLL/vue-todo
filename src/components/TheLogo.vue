<template>
  <div
    class="m-4 flex items-center text-[30px] text-primary"
    :class="$style.icontext"
  >
    <AppSvgIcon
      iconName="pencil_square"
      class="mr-2 inline-block h-[30px] w-[30px]"
    />
    TODO
  </div>
</template>

<script setup lang="ts">
import AppSvgIcon from "@/components/AppSvgIcon.vue";
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

.icontext {
  font-family: "Permanent Marker", cursive;
}
</style>
