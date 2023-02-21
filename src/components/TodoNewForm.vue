<template>
  <div class="divide-y rounded-lg border bg-white">
    <div id="key-in" class="px-4 py-3">
      <div class="flex flex-col">
        <input
          type="text"
          placeholder="Title"
          v-model.lazy="title"
          class="border-none p-0 pb-1.5 text-xl font-semibold outline-none focus:ring-0"
        />
        <textarea
          placeholder="Write a description"
          v-model.lazy="description"
          class="h-[15vh] border-none p-0 outline-none focus:ring-0"
        ></textarea>
        <div id="pills" class="flex w-full items-center pt-2">
          <div class="mr-auto flex flex-row gap-2">
            <AppListbox class="w-40" @select="(selectedSection) => (section = selectedSection)" />
            <!-- <AppPill />
            <AppPill /> -->
          </div>
          <div class="inline-flex items-center gap-2 font-medium">
            Is completed?
            <AppToggleSwitch
              @change="(isCompleted) => (completed = isCompleted)"
            />
          </div>
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
        @click="addNewTodoItem()"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { retrieveSession } from "@/vueutils/useAuth";
import { insertTodo } from "@/vueutils/useToDo";

import AppPill from "./AppPill.vue";
import AppToggleSwitch from "./AppToggleSwitch.vue";
import AppListbox from "./AppListbox.vue";

const title = ref<string>("");
const description = ref<string>("");
const completed = ref<boolean>(false);
const section = ref<number | null>(null);

const emit = defineEmits<{
  (e: "insert", value: boolean): void;
}>();

const addNewTodoItem = async () => {
  const session = await retrieveSession();

  if (session) {
    const data = await insertTodo({
      title: title.value,
      description: description.value,
      user_id: session.user.id,
      completed: completed.value,
      todo_section_id: section.value,
    });
    console.log(data);
    emit("insert", false);
  } else {
    console.log("Session ended");
  }
};
</script>
