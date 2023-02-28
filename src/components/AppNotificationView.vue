<template>
		<div class="relative z-10 bg-transparent">
			<div class="fixed bottom-2 right-3 z-10 overflow-y-auto">
				<div id="notification-container"
          v-for="todo in todoNotification" :key="todo.id"
					class="flex min-h-full min-w-[20vw] items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<AppNotification :id="todo.id">
            <template #title>{{ todo.title }} removed</template>
          </AppNotification>
				</div>
			</div>
		</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useTodosStore } from "@/stores/todo";

import AppNotification from "./AppNotification.vue";

const { todoNotification } = storeToRefs(useTodosStore());
</script>