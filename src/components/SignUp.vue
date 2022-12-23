<template>
    <form @submit="">
        <div>
            <input type="fullname" placeholder="Your full name" v-model="fullname" />
        </div>
        <div>
            <input type="email" placeholder="Your email" v-model="email" />
        </div>
        <div>
            <input type="password" placeholder="Your password" v-model="password" />
        </div>
        <div>
            <input type="submit" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { handleSignUp } from '@/vueutils/useAuth';

const fullname = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

</script>