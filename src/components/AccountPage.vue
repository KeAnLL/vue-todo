<template>
  <div class="h-screen w-screen bg-gray-100">
    <div id="form-container" class="flex h-full flex-col items-center justify-center text-sm sm:text-base">
      <div class="flex w-4/6 flex-col items-center pb-8 text-center">
        <TheLogo :height="40" class="pb-5 text-[40px]" />
        <div class="mb-2 text-3xl font-bold text-primary sm:text-5xl">
          <span v-if="!accountData.signin"> Welcome here! </span>
          <span v-else>Welcome back!</span>
        </div>
        <span class="text:lg font-semibold italic text-secondary sm:text-2xl">
          <span v-if="!accountData.signin">Meet the greatest todo app of all time</span>
          <span v-else>Carry on, mate!</span>
        </span>
      </div>
      <div id="form-card"
        class="flex w-[70vw] flex-col items-center rounded-xl bg-white px-6 pt-10 pb-8 drop-shadow-lg sm:px-16 lg:w-[50vw] xl:w-[35vw]">
        <div id="email-input" class="w-full pb-1.5">
          <InputFieldWithIcon from="account" labelName="Email address" iconName="at" inputType="email"
            placeholder="youremail@example.com" @change="(newEmail) => (email = newEmail)">
            <template #warning>
              <InputFieldWarning id="email-input-warning" :class="{ invisible: !account.warnings.emailWarning }">Invalid
                email</InputFieldWarning>
            </template>
          </InputFieldWithIcon>
        </div>
        <div id="password-input" class="w-full pb-1.5">
          <InputFieldWithIcon from="account" labelName="Password" iconName="lock" :inputType="account.passwordField.type"
            placeholder="************" @change="(newPassword) => (password = newPassword)">
            <template #warning>
              <InputFieldWarning id="password-input-warning" :class="{ invisible: !account.warnings.passwordWarning }">
                Invalid password</InputFieldWarning>
            </template>
            <template #tooltip>
              <AppSvgIcon dirName="account" iconName="eye-slash" class="h-full w-auto p-1.5"
                v-if="!account.passwordField.visible" @click="updateVisibility" />
              <AppSvgIcon dirName="account" iconName="eye" class="h-full w-auto p-1.5" v-else @click="updateVisibility" />
            </template>
          </InputFieldWithIcon>
        </div>
        <div id="confirm-password-input" class="w-full pb-1.5">
          <InputFieldWithIcon from="account" labelName="Confirm password" iconName="lock-solid"
            :inputType="account.passwordField.type" placeholder="************" v-if="!accountData.signin" @change="
              (newConfirmPassword) => (confirmPassword = newConfirmPassword)
            ">
            <template #warning>
              <InputFieldWarning id="confirm-password-input-warning"
                :class="{ invisible: !account.warnings.confirmPasswordWarning }">Wrong password</InputFieldWarning>
            </template>
            <template #tooltip>
              <AppSvgIcon dirName="account" iconName="eye-slash" class="h-full w-auto p-1.5"
                v-if="!account.passwordField.visible" @click="updateVisibility" />
              <AppSvgIcon dirName="account" iconName="eye" class="h-full w-auto p-1.5" v-else @click="updateVisibility" />
            </template>
          </InputFieldWithIcon>
        </div>
        <div id="form-options" class="text relative mt-2 mb-5 w-full text-xs sm:text-sm" v-if="accountData.signin">
          <div class="absolute inset-y-0 left-0 flex flex-row items-center pl-1">
            <input type="checkbox" class="mr-1.5 rounded checked:text-secondary focus:ring-secondary"
              v-model="rememberMe" />
            <label name="remember" class="text-gray-700">Remember me</label>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center font-medium text-secondary">
            Forgot password
          </div>
        </div>
        <button class="mt-3 mb-2 h-fit w-full rounded-lg bg-secondary pt-3 pb-3 pl-7 pr-5 text-lg font-bold text-white"
          @click="accountSubmitAction()">
          <div class="inline-flex items-center justify-center">
            <span class="mr-1">{{ account.action }}</span>
            <AppSvgIcon dirName="account" iconName="cursor-arrow-ray" class="h-[30px] w-auto"
              :class="{ hidden: accountData.loading }" />
          </div>
        </button>
      </div>
      <AppSvgIcon dirName="common" iconName="loading" role="status"
        class="mr-2 h-8 w-8 animate-spin fill-white text-gray-200" :class="{ hidden: !accountData.loading }" />
      <div id="action-link" class="pt-3 font-medium">
        <div v-if="accountData.signin">
          Don't have an account yet?
          <span class="cursor-pointer text-secondary hover:underline" @click="changeAction()">Sign up</span>
          now!
        </div>
        <div class="cursor-pointer text-secondary hover:underline" @click="changeAction()" v-else>
          Sign in instead
        </div>
      </div>
    </div>
    <AppModal @close="() => (account.fallbackError.flag = false)" :class="{
      hidden: !account.fallbackError.flag,
    }">
      <template #title>{{ account.fallbackError.fatal ? "Fatal " : "" }}Error</template>
      <template #description>{{ account.fallbackError.msg }}</template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { Credentials } from "@/types/global";

import {
  handleSignIn,
  handleSignUp,
  retrieveSession,
} from "@/vueutils/useAuth";
import { useAuthStore } from "@/stores/auth";

import AppSvgIcon from "@/components/AppSvgIcon.vue";
import InputFieldWarning from "@/components/InputFieldWarning.vue";
import InputFieldWithIcon from "@/components/InputFieldWithIcon.vue";
import AppModal from "./AppModal.vue";
import TheLogo from "./TheLogo.vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const { session, authError } = storeToRefs(useAuthStore());
const { storeSignIn, storeSignUp } = useAuthStore();

const accountData = {
  signin: route.params.type === "signin",
  loading: false,
};

const account = reactive({
  action: accountData.signin ? "Sign in" : "Sign up",
  warnings: {
    emailWarning: false,
    passwordWarning: false,
    confirmPasswordWarning: false,
  },
  passwordField: {
    visible: false,
    type: "password",
  },
  fallbackError: {
    flag: false,
    fatal: false,
    msg: "",
  },
});

const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const rememberMe = ref<boolean>(false);

const updateVisibility = () => {
  account.passwordField.visible = !account.passwordField.visible;
  account.passwordField.type = account.passwordField.visible
    ? "text"
    : "password";
};

const changeAction = () => {
  accountData.signin = !accountData.signin;
  account.action = accountData.signin ? "Sign in" : "Sign up";
  router.replace({
    name: "Account",
    params: { type: accountData.signin ? "signin" : "signup" },
  });
};

const test = () => {
  console.log(email.value);
  console.log(password.value);
  console.log(confirmPassword.value);
};

const accountSubmitAction = async () => {
  const credential: Credentials = {
    email: email.value,
    password: password.value,
  };

  await (route.params.type === "signin"
    ? storeSignIn(credential)
    : storeSignUp(credential));

  if (session.value) {
    if (accountData.signin) {
      router.push("/todo");
    } else {
      router.push(`/user/confirmation?mail=${email.value}`);
    }
  } else {
    if (authError.value) {
      account.fallbackError = {
        flag: true,
        fatal: authError.value.fatal === true,
        msg: authError.value.msg,
      };
    } else {
      console.error("Uncaught error");
    }
  }
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

  if (_pwd.size >= 6) {
    if (pwd_regex.test(newPassword)) {
      account.warnings.passwordWarning = false;
      console.log("Password ok");
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
