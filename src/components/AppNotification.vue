<template>
  <TransitionRoot as="template" appear :show="!isClosed">
    <TransitionChild
      as="template"
      enter="ease-in-out duration-500"
      enter-from="translate-x-full"
      enter-to="translate-x-0"
      leave="duration-300 ease-in-out"
      leave-from="translate-x-0"
      leave-to="translate-x-full"
    >
      <div
        id="notification-body"
        class="relative my-1.5 flex w-full transform flex-row items-center overflow-hidden rounded-lg bg-green-200 py-2 px-5 text-left shadow-xl transition-all sm:max-w-lg"
      >
        <div id="modal-content" class="w-fit grow pr-3 text-left">
          <span
            id="modal-title"
            class="text-normal font-semibold text-gray-900"
          >
            <slot name="title">Title</slot>
          </span>
        </div>
        <XCircle
          class="rounded-md text-center font-medium"
          @click="closeNotification()"
        />
      </div>
    </TransitionChild>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionChild, TransitionRoot } from "@headlessui/vue";
import { ref } from "vue";

import { useTodosStore } from "@/stores/todo";

import XCircle from "@/assets/svg/common/x-circle.svg?component";

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
});

const isClosed = ref<boolean>(false);

const { removeNotification } = useTodosStore();

const closeNotification = () => {
  isClosed.value = !isClosed.value;
  if (props.id) {
    removeNotification(props.id);
  }
};
</script>
