<template>
  <div class="h-screen w-screen bg-gray-100">
    <form
      ref="form"
      id="form-container"
      class="flex h-full flex-col items-center justify-center"
    >
      <div class="flex w-4/6 flex-col items-center pb-8">
        <TheLogo :height="40" class="pb-5 text-[40px]" />
        <div class="mb-2 text-5xl font-bold text-primary">
          <span v-if="!data.signin"> Welcome here! </span>
          <span v-else>Welcome back!</span>
        </div>
        <span class="text-2xl font-semibold italic text-secondary">
          <span v-if="!data.signin"
            >Meet the greatest todo app of all time</span
          >
          <span v-else>Carry on, mate!</span>
        </span>
      </div>
      <div
        id="form-card"
        class="flex w-[30vw] flex-col items-center rounded-xl bg-white pt-10 pb-8 pl-16 pr-16 drop-shadow-lg"
      >
        <div id="email-input" class="w-full pb-1.5">
          <InputFieldWithIcon
            from="account"
            labelName="Email address"
            iconName="at"
            inputType="email"
            placeholder="youremail@example.com"
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
        <div id="password-input" class="w-full pb-1.5">
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
        <div id="confirm-password-input" class="w-full pb-1.5">
          <InputFieldWithIcon
            from="account"
            labelName="Confirm password"
            iconName="lock-solid"
            :inputType="account.passwordField.type"
            placeholder="************"
            v-if="!data.signin"
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
        <div
          id="form-options"
          class="relative mt-2 mb-5 w-full text-sm"
          v-if="data.signin"
        >
          <div
            class="absolute inset-y-0 left-0 flex flex-row items-center pl-1"
          >
            <input
              type="checkbox"
              class="mr-1.5 rounded checked:text-secondary focus:ring-secondary"
            />
            <label name="remember" class="text-gray-700">Remember me</label>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center font-medium text-secondary"
          >
            Forgot password
          </div>
        </div>
        <button
          class="mt-3 mb-2 h-fit w-full rounded-lg bg-secondary pt-3 pb-3 pl-7 pr-5 text-lg font-bold text-white"
          @click="test()"
        >
          <div class="inline-flex items-center justify-center">
            <TheLoadingSpinner
              role="status"
              class="mr-2 h-8 w-8"
              :class="{ hidden: !data.loading }"
            />
            <span class="mr-1">{{ account.action }}</span>
            <AppSvgIcon
              componentDirName="account"
              iconName="cursor-arrow-ray"
              class="h-[30px] w-auto"
              :class="{ hidden: data.loading }"
            />
          </div>
        </button>
      </div>
      <div id="action-link" class="pt-3 font-medium">
        <div v-if="data.signin">
          Don't have an account yet?
          <span
            class="cursor-pointer text-secondary hover:underline"
            @click="changeAction()"
            >Sign up</span
          >
          now!
        </div>
        <div
          class="cursor-pointer text-secondary hover:underline"
          @click="changeAction()"
          v-else
        >
          Sign in instead
        </div>
      </div>
    </form>
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
  action: "Sign in",
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
  signin: true,
  loading: false,
};

const updateVisibility = () => {
  account.passwordField.visible = !account.passwordField.visible;
  account.passwordField.type = account.passwordField.visible
    ? "text"
    : "password";
};

const changeAction = () => {
  data.signin = !data.signin;
  account.action = data.signin ? "Sign in" : "Sign up";
  account.warnings.emailWarning = false;
  account.warnings.passwordWarning = false;
  account.warnings.confirmPasswordWarning = false;
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
