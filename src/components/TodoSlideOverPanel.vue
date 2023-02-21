<template>
  <TransitionRoot as="template" :show="!isClosed">
    <Dialog as="div" class="relative z-10" @close="isClosed = true">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          id="mask"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>
      </TransitionChild>
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto relative flex h-screen w-screen max-w-md flex-col"
              >
                <!-- <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div class="flex absolute top-0 right-0">
                    <button >
                        Close
                    </button>
                  </div>
                </TransitionChild> -->
                <div class="h-fit w-full bg-secondary p-5">
                  <div class="relative">
                    <button
                      @click="() => (isClosed = true)"
                      class="absolute right-0 top-0"
                    >
                      <XCircle class="text-white" />
                    </button>
                    <DialogTitle as="div" class="text-xl font-bold text-white">
                      <slot name="dialog-title">Dialog</slot>
                    </DialogTitle>
                    <p class="text-md pt-2 leading-tight text-gray-300">
                      <slot name="dialog-description"></slot>
                    </p>
                  </div>
                </div>
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
                >
                  <slot name="dialog-body">
                    <div class="relative mt-6 flex-1 px-4">
                      <div class="absolute inset-0 px-4">
                        <div
                          class="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        ></div>
                      </div>
                    </div>
                  </slot>
                </div>
                <div class="flex flex-row-reverse border-t-2 bg-white">
                  <button
                    class="btn-secondary mx-2 my-2 py-2 px-4"
                    @click="() => emit('submit')"
                  >
                    <slot name="dialog-button">Button</slot>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ref } from "vue";

import "@/assets/css/scrollbar.css";

import XCircle from "@/assets/svg/common/x-circle.svg?component";

const isClosed = ref<boolean>(true);

const open = () => {
  isClosed.value = false;
};

const emit = defineEmits<{
  (e: "submit"): void;
}>();

defineExpose({ open });
</script>
