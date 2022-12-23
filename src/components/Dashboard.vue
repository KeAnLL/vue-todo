<template>
    <div id="menu-bar" class="h-fit w-1/9 bg-primary ...">
        <MenuBar />
    </div>
    <div class="container">
        <div id="todo" class="grow bg-slate-100">
        </div>
    </div>
</template>

<script setup lang="ts">
import MenuBar from "@/components/MenuBar.vue";
</script>