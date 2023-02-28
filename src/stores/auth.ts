import { defineStore } from "pinia";
import { ref } from "vue";

import {
  handleSignIn,
  handleSignOut,
  handleSignUp,
  refreshSession,
  retrieveSession,
} from "@/vueutils/useAuth";

import type { AuthErrorMessage, Credentials } from "@/types/global";
import type { Session, User } from "@supabase/gotrue-js";

const isAuthErrorMessage = (data: any): data is AuthErrorMessage => {
  return "msg" in data;
};

const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const session = ref<Session | null>(null);
  const authError = ref<AuthErrorMessage | null>(null);

  const storeSignIn = async (credentials: Credentials) => {
    user.value = null;
    session.value = null;

    const res = await handleSignIn(credentials);
    if (isAuthErrorMessage(res)) {
      authError.value = res;
      console.error(res);
    } else {
      user.value = res.user;
      session.value = res.session;
    }
  };

  const storeSignUp = async (credentials: Credentials) => {
    user.value = null;
    session.value = null;

    const res = await handleSignUp(credentials);
    if (isAuthErrorMessage(res)) {
      authError.value = res;
      console.error(res);
    } else {
      user.value = res.user;
      session.value = res.session;
    }
  };

  const storeSignOut = async () => {
    const res = await handleSignOut();
    if (res === null) {
      console.log("Logged out");
    } else {
      authError.value = res;
      console.error(res);
    }
    user.value = null;
    session.value = null;
  };

  const storeRetrieveSession = async () => {
    session.value = null;
    session.value = await retrieveSession();
    if (!session.value) {
      session.value = await refreshSession();
      if (!session.value) {
        console.log("Fail to refresh new session. Login required");
      } else {
        console.log("User session refreshed");
      }
    } else {
      console.log("User session retrieved");
    }
  };

  return {
    user,
    session,
    authError,
    storeSignIn,
    storeSignUp,
    storeSignOut,
    storeRetrieveSession,
  };
});

export { useAuthStore };
