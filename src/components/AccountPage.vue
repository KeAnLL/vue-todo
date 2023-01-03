<template>
  <div class="h-screen w-screen bg-gray-100">
    <div
      id="form-container"
      class="flex h-full flex-col items-center justify-center"
    >
      <div class="flex w-4/6 flex-col items-center pb-8">
        <TheLogo :height="40" class="pb-5 text-[40px]" />
        <div class="mb-2 text-5xl font-bold text-primary">Welcome here!</div>
        <span class="text-2xl font-semibold italic text-secondary"
          >Meet the greatest todo app of all time</span
        >
      </div>
      <div
        id="form-card"
        class="flex w-[30vw] flex-col items-center rounded-xl bg-white pt-10 pb-8 pl-16 pr-16 drop-shadow-lg"
      >
        <div class="w-full">
          <InputFieldWithIcon
            from="account"
            labelName="Email address"
            iconName="envelope"
            inputType="email"
            placeholder="youremail@example.com"
            class="pb-1.5"
            @change="(newEmail) => (email = newEmail)"
          >
            <template #warning>
              <InputFieldWarning
                id="email-input-warning"
                :class="{ invisible: !account.warnings.emailWarning }"
                >Invalid email</InputFieldWarning
              >
            </template>
          </InputFieldWithIcon>
        </div>
        <div class="w-full">
          <InputFieldWithIcon
            from="account"
            labelName="Password"
            iconName="lock"
            :inputType="account.passwordField.type"
            placeholder="************"
            @change="(newPassword) => (password = newPassword)"
          >
            <template #warning>
              <InputFieldWarning
                id="password-input-warning"
                :class="{ invisible: !account.warnings.passwordWarning }"
                >Invalid password</InputFieldWarning
              >
            </template>
            <template #tooltip>
              <AppSvgIcon
                componentDirName="account"
                iconName="eye-slash"
                class="h-full w-auto p-1.5"
                v-if="!account.passwordField.visible"
                @click="updateVisibility"
              />
              <AppSvgIcon
                componentDirName="account"
                iconName="eye"
                class="h-full w-auto p-1.5"
                v-else
                @click="updateVisibility"
              />
            </template>
          </InputFieldWithIcon>
        </div>
        <div class="w-full">
          <InputFieldWithIcon
            from="account"
            labelName="Confirm password"
            iconName="lock"
            :inputType="account.passwordField.type"
            placeholder="************"
            v-if="data.signup === true"
            @change="
              (newConfirmPassword) => (confirmPassword = newConfirmPassword)
            "
          >
            <template #warning>
              <InputFieldWarning
                id="confirm-password-input-warning"
                :class="{ invisible: !account.warnings.confirmPasswordWarning }"
                >Wrong password</InputFieldWarning
              >
            </template>
            <template #tooltip>
              <AppSvgIcon
                componentDirName="account"
                iconName="eye-slash"
                class="h-full w-auto p-1.5"
                v-if="!account.passwordField.visible"
                @click="updateVisibility"
              />
              <AppSvgIcon
                componentDirName="account"
                iconName="eye"
                class="h-full w-auto p-1.5"
                v-else
                @click="updateVisibility"
              />
            </template>
          </InputFieldWithIcon>
        </div>
        <button
          class="mt-5 mb-5 h-fit w-full rounded-lg bg-secondary pt-3 pb-3 pl-7 pr-5 text-lg font-bold text-white"
          @click="test"
        >
          <div class="inline-flex items-center justify-center">
            <TheLoadingSpinner
              role="status"
              class="mr-2 h-8 w-8"
              :class="{ hidden: !data.loading }"
            />
            <span class="mr-1">Sign up</span>
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";

import AppSvgIcon from "@/components/AppSvgIcon.vue";
import InputFieldWarning from "@/components/InputFieldWarning.vue";
import InputFieldWithIcon from "@/components/InputFieldWithIcon.vue";
import TheLoadingSpinner from "@/components/TheLoadingSpinner.vue";
import TheLogo from "./TheLogo.vue";

const account = reactive({
  warnings: {
    emailWarning: false,
    passwordWarning: false,
    confirmPasswordWarning: false,
  },
  passwordField: {
    visible: false,
    type: "password",
  },
});


const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");

const data = {
  signup: true,
  loading: false,
};

const updateVisibility = () => {
  account.passwordField.visible = !account.passwordField.visible;
  account.passwordField.type = account.passwordField.visible
  ? "text"
  : "password";
};

const test = () => {
  console.log(email.value);
  console.log(password.value);
  console.log(confirmPassword.value);
};

watch(email, (newEmail, oldEmail) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  // const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  account.warnings.emailWarning = false;
  if (newEmail.length == 0) {
    account.warnings.emailWarning = true;
  } else if (newEmail === oldEmail) {
    account.warnings.emailWarning = true;
  } else {
    if (regex.test(newEmail)) {
      console.log("Email ok");
    } else {
      account.warnings.emailWarning = true;
    }
  }
});

watch(password, (newPassword) => {
  const _pwd = new Set(newPassword.split(""));
  const pwd_regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

  if (_pwd.size >= 8) {
    if (pwd_regex.test(newPassword)) {
      account.warnings.passwordWarning = false;
      if (confirmPassword.value.length > 0) {
        account.warnings.confirmPasswordWarning = true;
      }
    } else {
      account.warnings.passwordWarning = true;
    }
  } else {
    account.warnings.passwordWarning = true;
  }
});

watch(confirmPassword, (newConfirmPassword) => {
  account.warnings.confirmPasswordWarning =
    newConfirmPassword !== password.value;
});
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap");

.decoration-title {
  font-family: "Source Sans Pro", sans-serif;
}
</style>
