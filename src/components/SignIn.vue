<template>
    <form @submit.prevent="handleSignIn({ email, password })">
        <h2>Sign in via magic link with your email below</h2>
        <div>
            <input type="email" placeholder="Your email" v-model="email" />
        </div>
        <input type="submit" />
    </form>
</template>

<script lang="ts">
export default {
    name: 'Sign In'
}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { handleSignIn } from '@/vueutils/useAuth'

const email = ref<string>('');
const password = ref<string>('');
</script>