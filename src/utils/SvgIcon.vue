<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const icon = defineAsyncComponent(() =>
      import(`@/assets/svg/${props.iconName}.svg`)
    );

    return { icon };
  },
});
</script>

<template>
  <component :is="icon" />
</template>
