<script setup lang="ts">
const props = defineProps({
  componentDirName: {
    type: String,
  },
  iconName: {
    type: String,
    required: true,
  },
});

const subDirectory = (dir: string | undefined) => {
  if (dir === undefined) {
    return "";
  }
  return `${dir}/`;
};

const svgUrl = `/src/assets/svg/${subDirectory(props.componentDirName)}${
  props.iconName
}.svg`;

/* reference from https://vitejs.dev/guide/assets.html */
const imageUrl = new URL(svgUrl, import.meta.url).href;
</script>

<template>
  <!-- <component :is="theSvg" /> -->
  <img :src="imageUrl" :alt="iconName" />
</template>
