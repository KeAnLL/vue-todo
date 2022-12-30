<template>
  <div
    class="grid h-screen w-screen grid-cols-2 place-content-center bg-gray-100 pl-[25vh] pr-[25vh]"
  >
    <div
      id="decoration"
      class="flex h-[80vh] flex-col justify-center rounded-l-xl bg-secondary pl-5 pr-5 pt-10"
    >
      <span class="text-center text-[40px] font-black text-white">
        Join us!<br />Make your life easier ;)
      </span>
      <AppSvgIcon
        componentDirName="homepage"
        iconName="creation_process"
        class="h-auto w-full p-10 pt-5"
      />
    </div>
    <div
      id="form-container"
      class="flex h-full flex-col items-center justify-center rounded-r-xl bg-white"
    >
      <div id="new" class="flex w-4/6 justify-end pr-3">
        <button
          class="justify-right mb-5 h-fit w-fit rounded-lg bg-secondary pt-3 pb-3 pl-6 pr-4 text-base font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-2 hover:border-secondary hover:bg-white"
        >
          <div class="inline-flex items-center justify-center">
            <span class="mr-1">I'm new</span>
            <AppSvgIcon
              componentDirName="account"
              iconName="information-circle"
              class="h-[25px] w-auto"
            />
          </div>
        </button>
      </div>
      <div class="w-4/6 pb-8">
        <TheLogo />
        <span class="text-3xl font-bold text-primary"
          >Welcome to the family!</span
        ><br />
        <span class="text-xl font-semibold italic text-secondary"
          >Meet the greatest todo app of all time</span
        >
      </div>
      <div class="w-4/6 pb-6">
        <InputFieldWithIcon
          from="account"
          labelName="Email"
          iconName="envelope"
          inputType="email"
          placeholder="youremail@example.com"
          v-model="email"
        />
      </div>
      <div class="w-4/6 pb-6">
        <InputFieldWithIcon
          from="account"
          labelName="Password"
          iconName="lock"
          inputType="password"
          placeholder="************"
          v-model="password"
        />
      </div>
      <div class="w-4/6 pb-6">
        <InputFieldWithIcon
          from="account"
          labelName="Confirm password"
          iconName="lock"
          inputType="password"
          placeholder="************"
          v-if="data.signup === true"
          v-model="confirmPassword"
        />
      </div>
      <button
        class="mt-5 mb-5 h-fit w-fit rounded-lg bg-primary pt-3 pb-3 pl-7 pr-5 text-lg font-bold text-white"
      >
        <div class="inline-flex items-center justify-center">
          <TheLoadingSpinner
            role="status"
            class="mr-2 h-8 w-8"
            :class="{ hidden: !data.loading }"
          />
          <span class="mr-1" v-if="data.signup === true">Sign up</span>
          <span class="mr-1" v-else>Sign in</span>
          <AppSvgIcon
            componentDirName="account"
            iconName="cursor-arrow-ray"
            class="h-[30px] w-auto"
            :class="{ hidden: data.loading }"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import AppSvgIcon from "@/components/AppSvgIcon.vue";
import InputFieldWithIcon from "./InputFieldWithIcon.vue";
import TheLoadingSpinner from "./TheLoadingSpinner.vue";
import TheLogo from "./TheLogo.vue";

const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");

const data = {
  signup: true,
  loading: false,
};

const updateSignUp = () => {
  data.signup = !data.signup;
};
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap");

.decoration-title {
  font-family: "Source Sans Pro", sans-serif;
}
</style>
