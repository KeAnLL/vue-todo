<template>
  <!-- <div class="fixed"> -->
  <div>
    <Listbox :modelValue="selectedSection" @update:modelValue="
      (section) => {
        selectedSection = section;
        emit('select', section.section_id);
      }
    ">
      <div class="relative font-semibold">
        <ListboxButton class="relative flex w-full rounded-lg bg-white py-0.5 pl-2 text-left shadow-md">
          <span v-if="todoSections" class="block grow truncate">
            {{ selectedSection.section_name }}
          </span>
          <span id="icon">
            <ArrowDown class="p-0.5" />
          </span>
        </ListboxButton>
        <TransitionRoot as="template" appear>
          <TransitionChild as="template" enter="ease-in duration-100" enter-from="opacity-0" enter-to="opacity-100"
            leave="ease-out duration-100" leave-from="opacity-100" leave-to="opacity-0">
            <ListboxOptions class="max-h-50 absolute mt-1 w-full overflow-auto rounded-md bg-white text-base shadow-lg">
              <ListboxOption v-slot="{ active, selected }" v-for="section in todoSections" :key="section.section_id"
                :value="section">
                <div class="relative m-0.5 flex px-1" :class="[
                  active ? 'bg-secondary text-white' : 'bg-white text-black',
                  selected ? 'opacity-90' : '',
                ]">
                  <span class="grow">{{ section.section_name }}</span>
                  <span v-show="selected">
                    <FolderOpen class="p-0.5" />
                  </span>
                </div>
              </ListboxOption>
            </ListboxOptions>
          </TransitionChild>
        </TransitionRoot>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";

import { useTodoSectionStore } from "@/stores/todoSection";

import type { TodoSection } from "@/types/todo";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import ArrowDown from "@/assets/svg/todo/chevron-down.svg?component";
import FolderOpen from "@/assets/svg/todo/folder-open.svg?component";
import { storeToRefs } from "pinia";

const props = defineProps({
  section: {
    type: null as unknown as PropType<number | null>,
    required: true,
  },
});

const { todoSections } = storeToRefs(useTodoSectionStore());
const { retrieveSection } = useTodoSectionStore();
const selectedSection = ref<TodoSection>(retrieveSection(props.section));

const emit = defineEmits<{
  (e: "select", section: number): void;
}>();
</script>
