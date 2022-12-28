<template>
  <div
    class="grid grid-cols-2 place-content-center pt-[10vh] pb-[10vh] pl-[10vw] pr-[10vw]"
  >
    <div id="decoration" class="flex flex-col justify-center">
      <AppSvgIcon
        componentDirName="homepage"
        iconName="creation_process"
        class="h-auto w-auto"
      />
    </div>
    <div id="form-container" class="w-[50vw]">
      <div v-if="data.signup === true">
        <InputFieldWithIcon
          from="account"
          labelName="Email"
          iconName="envelope"
          inputType="email"
          placeholder="youremail@example.com"
        />
        <InputFieldWithIcon
          from="account"
          labelName="Password"
          iconName="lock"
          inputType="password"
          placeholder="************"
        />
        <InputFieldWithIcon
          from="account"
          labelName="Confirm password"
          iconName="lock"
          inputType="password"
          placeholder="************"
        />
        <InputToggleSwitch toggleMessage="Test" @change="updateSignUp" />
        <button
          class="mt-5 h-fit w-fit rounded-lg bg-primary pt-4 pb-4 pl-7 pr-5 text-lg font-bold text-white"
        >
          <div class="inline-flex items-center justify-center">
            <span class="mr-1">Sign up</span>
            <AppSvgIcon
              componentDirName="account"
              iconName="cursor-arrow-ray"
              class="h-[30px] w-auto"
            />
          </div>
        </button>
        <button class="bg-primary">  <!-- for loading to indicate submitting -->
          <svg class="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
            <!-- loading indicator -->
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSvgIcon from "@/components/AppSvgIcon.vue";
import InputFieldWithIcon from "./InputFieldWithIcon.vue";
import InputToggleSwitch from "./InputToggleSwitch.vue";

const data = {
  signup: true,
};

const updateSignUp = () => {
  data.signup = !data.signup;
};
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap");

.decoration-title {
  font-family: "Source Sans Pro", sans-serif;
}
</style>
