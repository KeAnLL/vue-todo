<template>
  <TransitionRoot as="template" appear :show="!isClosed">
    <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="translate-x-full" enter-to="translate-x-0"
      leave="duration-300 ease-in-out" leave-from="translate-x-0" leave-to="translate-x-full">
      <div id="notification-body"
        class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all w-full sm:max-w-lg bg-green-200 py-2 my-1.5 px-5 flex items-center flex-row">
        <div id="modal-content" class="text-left w-fit pr-3 grow">
          <span id="modal-title" class="text-normal font-semibold text-gray-900">
            <slot name="title">Title</slot>
          </span>
        </div>
        <XCircle class="rounded-md text-center font-medium" @click="closeNotification()" />
      </div>
    </TransitionChild>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TransitionRoot, TransitionChild } from "@headlessui/vue";

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
}
</script>