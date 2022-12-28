import type { Credentials } from "@/types/global";
import type { AuthResponse, Session } from "@supabase/gotrue-js";

import { ref } from "vue";

import { supabase } from "@/lib/supabase";
import {
  UndefinedUserEmailError,
  UndefinedUserPasswordError,
} from "@/utils/error";

const userSession = ref<Session | null>(null);

const handleSignIn = async (credentials: Credentials) => {
  try {
    if (!credentials.email) throw new UndefinedUserEmailError();
    if (!credentials.password) throw new UndefinedUserPasswordError();

    const { data, error }: AuthResponse =
      await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

    if (error) {
      alert(`Error logging in: ${error.message}`);
    }

    if (!error && !data.user) {
      alert("Check your email for the login link");
    }
  } catch (error: any) {
    console.error("Error thrown: ", error.message);
    alert(error);
  }
};

const handleSignUp = async (credentials: Credentials) => {
  try {
    if (!credentials.email) throw new UndefinedUserEmailError();
    if (!credentials.password) throw new UndefinedUserPasswordError();

    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {},
      },
    });

    if (error) {
      alert(error.message);
      console.error(error, error.message);
      return /* Something here */;
    } else {
      /* TODO */
      console.debug(data);
    }

    /* Signup successfully, confirmation email should be sent */
  } catch (error) {
    if (
      error instanceof UndefinedUserEmailError ||
      error instanceof UndefinedUserPasswordError
    ) {
      return /* Something here */;
    } else {
      alert("Fatal error signing up");
      console.error("signup error: ", error);
    }
  }
};

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error signing out");
      console.error("signout error: ", error);
    }
  } catch (error) {
    alert("Unknown error when signing out");
    console.error("error: ", error);
  }
};

export { userSession, handleSignIn, handleSignUp, handleSignOut };
