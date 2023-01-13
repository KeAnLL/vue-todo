<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"
    ></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        id="modal-container"
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          id="modal"
          class="relative w-[70vw] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div
            id="modal-content"
            class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
          >
            <div class="flex flex-col items-center sm:flex-row">
              <div
                id="modal-icon"
                class="m-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-200"
              >
                <FaceFrown class="h-7 w-7 stroke-2 text-red-500" />
              </div>
              <div id="modal-content" class="text-center sm:ml-4 sm:text-left">
                <div
                  id="modal-title"
                  class="text-lg font-semibold leading-6 text-gray-900"
                >
                  <slot name="title"></slot>
                </div>
                <div class="mt-1">
                  <slot name="description"></slot>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex w-full flex-col-reverse items-center px-3 pb-2 sm:flex-row"
          >
            <div
              class="inline-flex grow items-center py-2 text-sm text-gray-400"
            >
              <QuestionMarkCircle class="mr-0.5 mt-1 h-4 w-4" />
              Need any help?
            </div>
            <button
              class="inline-flex w-fit items-center rounded-md bg-secondary px-4 py-2 text-center font-medium text-white"
              @click="() => emit('close')"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FaceFrown from "@/assets/svg/todo/face-frown.svg?component";
import QuestionMarkCircle from "@/assets/svg/todo/question-mark-circle.svg?component";

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>
