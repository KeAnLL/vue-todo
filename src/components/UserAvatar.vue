<template>
  <div class="inline-flex items-center">
    <Avatar class="mr-1.5 h-9 w-9" />
    <div class="text-sm">
      <div><slot name="name">Not signed in</slot></div>
      <div><slot name="description"></slot></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "@/assets/svg/account/user-circle.svg?component";
</script>
