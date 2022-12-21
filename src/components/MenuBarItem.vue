<template>
  <div class="inline-flex">
    <SvgIcon :iconName="menuItemName" />
    <span>{{ menuItemName }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SvgIcon from "@/utils/SvgIcon.vue";

export default defineComponent({
  props: {
    menuItemName: {
      type: String,
      required: true,
    },
  },
  components: {
    SvgIcon,
  },
  setup() {},
});
</script>
