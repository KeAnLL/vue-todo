<template>
  <div class="... flex flex-col">
    <template class="... inline-flex">
      <SvgIcon iconName="cursor-arrow-ripple" />
      <div>TODO List</div>
    </template>
    <MenuBarItem
      v-for="menuItem in items"
      :key="menuItem.id"
      :menuItemName="menuItem.name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SvgIcon from "@/utils/SvgIcon.vue";
import MenuBarItem from "@/components/MenuBarItem.vue";

export default defineComponent({
  components: {
    SvgIcon,
    MenuBarItem,
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: "bookmark",
          title: "Bookmark",
        },
        {
          id: 2,
          name: "sign-in",
          title: "Sign In",
        },
      ],
    };
  },
  setup() {},
});
</script>
