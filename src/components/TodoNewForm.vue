<template>
  <div class="divide-y rounded-lg border bg-white">
    <div id="key-in" class="px-4 py-3">
      <div class="flex flex-col">
        <input
          type="text"
          placeholder="Title"
          class="border-none p-0 pb-1.5 text-xl font-semibold outline-none focus:ring-0"
        />
        <textarea
          placeholder="Write a description"
          class="h-[15vh] border-none p-0 outline-none focus:ring-0"
        ></textarea>
        <div id="pills" class="flex flex-row justify-end gap-2 pt-2">
          <AppPill />
          <AppPill />
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end gap-3 py-2 pr-4">
      <button
        class="text-medium h-fit w-fit rounded-lg py-2 px-5 font-semibold text-gray-400 hover:bg-gray-100"
        @click="() => emit('insert', false)"
      >
        Cancel
      </button>
      <button
        class="text-medium h-fit w-fit rounded-lg bg-secondary py-2 px-5 font-semibold text-white"
        @click="addNewTodoItem"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppPill from "./AppPill.vue";

const emit = defineEmits<{
  (e: "insert", value: boolean): void;
}>();

const addNewTodoItem = () => {
  emit("insert", false);
};
</script>
