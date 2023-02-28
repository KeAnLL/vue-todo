import { supabase } from "@/lib/supabase";
import {
  UndefinedUserEmailError,
  UndefinedUserPasswordError,
} from "@/utils/error";

import type { AuthData, AuthErrorMessage, Credentials } from "@/types/global";
import type { AuthResponse, Session } from "@supabase/gotrue-js";

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
      return {
        msg: error.message,
      };
    }

    if (!error && !data.user) {
      return {
        msg: "Check your email for the login link",
      };
    }

    return data;
  } catch (error: any) {
    console.error("Error thrown: ", error.message);
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
      console.error("Error:", error.message);
      return {
        msg: error.message,
      };
    }

    return data;
    /* Signup successfully, confirmation email should be sent */
  } catch (error: any) {
    console.error("signup error: ", error);
    return {
      fatal: true,
      msg: error.message,
    };
  }
};

const handleSignOut = async (): Promise<AuthErrorMessage | null> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("signout error: ", error);
      return {
        msg: error.message,
      }
    }
  } catch (error: any) {
    console.error("error: ", error);
    return {
      fatal: true,
      msg: error.message,
    };
  }

  return null;
};

const retrieveSession = async (): Promise<Session | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error when retrieving user session:", error);
  }
  return data.session;
};

const refreshSession = async () => {
  const { data, error } = await supabase.auth.refreshSession();
  if (error) {
    console.error("Error when refreshing user session:", error);
  }
  return data.session;
};

export {
  handleSignIn,
  handleSignUp,
  handleSignOut,
  retrieveSession,
  refreshSession,
};
