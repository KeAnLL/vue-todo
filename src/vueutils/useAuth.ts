import type { AuthData, AuthErrorMessage, Credentials } from "@/types/global";
import type { AuthResponse, Session } from "@supabase/gotrue-js";

import { ref } from "vue";

import { supabase } from "@/lib/supabase";
import {
  UndefinedUserEmailError,
  UndefinedUserPasswordError,
} from "@/utils/error";

const userSession = ref<Session | null>(null);

const handleSignIn = async (
  credentials: Credentials
): Promise<AuthData | AuthErrorMessage> => {
  try {
    if (!credentials.email) throw new UndefinedUserEmailError();
    if (!credentials.password) throw new UndefinedUserPasswordError();

    const { data, error }: AuthResponse =
      await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

    if (error) {
      // alert(`Error logging in: ${error.message}`);
      return {
        msg: error.message,
      };
    }

    if (!error && !data.user) {
      // alert("Check your email for the login link");
      return {
        msg: "Check your email for the login link",
      };
    }

    return data;
  } catch (error: any) {
    console.error("Error thrown: ", error.message);
    // alert(error);
    return {
      fatal: true,
      msg: error.message,
    };
  }
};

const handleSignUp = async (
  credentials: Credentials
): Promise<AuthData | AuthErrorMessage> => {
  try {
    if (!credentials.email) throw new UndefinedUserEmailError();
    if (!credentials.password) throw new UndefinedUserPasswordError();

    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      // alert(error.message);
      console.error("Error:", error.message);
      return {
        msg: error.message,
      };
    }

    return data;
    /* Signup successfully, confirmation email should be sent */
  } catch (error: any) {
    // alert("Fatal error signing up");
    console.error("signup error: ", error);
    return {
      fatal: true,
      msg: error.message,
    };
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

const retrieveSession = async (): Promise<Session | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error when retrieving user session:", error);
  }
  return data.session;
};

export {
  userSession,
  handleSignIn,
  handleSignUp,
  handleSignOut,
  retrieveSession,
};
