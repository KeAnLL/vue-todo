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
            <AppListbox
              :section="props.section"
              class="w-40"
              @select="(selectedSection) => (section = selectedSection)"
            />
          </div>
          <div class="inline-flex items-center gap-2 font-medium">
            Is completed?
            <AppToggleSwitch
              :section="props.section"
              :completed="completed"
              @change="(isCompleted) => (completed = isCompleted)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end gap-3 py-2 pr-4">
      <button
        v-if="props.id"
        class="text-medium h-fit w-fit rounded-lg bg-red-400 py-2 px-5 font-semibold text-white hover:bg-red-100"
        @click="deleteTodo"
      >
        Delete
      </button>
      <button
        class="text-medium h-fit w-fit rounded-lg py-2 px-5 font-semibold text-gray-400 hover:bg-gray-100"
        @click="() => emit('insert')"
      >
        Cancel
      </button>
      <button
        class="text-medium h-fit w-fit rounded-lg bg-secondary py-2 px-5 font-semibold text-white"
        @click="submitTodo"
      >
        {{ props.id ? "Update" : "Create" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ref } from "vue";

import { useTodosStore } from "@/stores/todo";
import { retrieveSession } from "@/vueutils/useAuth";

import AppListbox from "./AppListbox.vue";
import AppToggleSwitch from "./AppToggleSwitch.vue";

const props = defineProps({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  section: {
    type: null as unknown as PropType<number | null>,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const title = ref<string>(props.title ? props.title : "");
const description = ref<string>(props.description ? props.description : "");
const completed = ref<boolean>(props.completed);
const section = ref<number | null>(props.section);

const emit = defineEmits<{
  (e: "insert"): void;
}>();

const { storeInsertTodo, storeUpdateTodo, storeDeleteTodo } = useTodosStore();

const submitTodo = async () => {
  const session = await retrieveSession();

  if (session) {
    if (props.id) {
      const data = await storeUpdateTodo({
        id: props.id,
        title: title.value,
        description: description.value,
        user_id: session.user.id,
        completed: completed.value,
        todo_section_id: section.value,
      });
      console.log(data);
    } else {
      const data = await storeInsertTodo({
        title: title.value,
        description: description.value,
        user_id: session.user.id,
        completed: completed.value,
        todo_section_id: section.value,
      });
      console.log(data);
    }
    emit("insert");
  } else {
    console.log("Session ended");
  }
};

const deleteTodo = async () => {
  const session = await retrieveSession();

  if (session) {
    if (props.id) {
      await storeDeleteTodo(props.id);
    } else {
      console.error("Deletion fail. Undefined id");
    }
  } else {
    console.log("Session ended");
  }
};
</script>
