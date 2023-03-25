import { supabase } from "@/lib/supabase";
import {
  UndefinedUserEmailError,
  UndefinedUserPasswordError,
} from "@/utils/error";

import { dbLogger } from "@/utils/logger";

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
      dbLogger("error", "insert", "signin", error.message);
      return {
        msg: error.message,
      };
    }

    if (!error && !data.user) {
      dbLogger("warn", "insert", "post-signin");
      return {
        msg: "Check your email for the login link",
      };
    }

    return data;
  } catch (error: any) {
    dbLogger("error", "insert", "signin", "UncaughtError:", error.message);
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
      dbLogger("error", "insert", "signup", error.message);
      return {
        msg: error.message,
      };
    }

    return data;
    /* Signup successfully, confirmation email should be sent */
  } catch (error: any) {
    dbLogger("error", "insert", "signup", "UncaughtError:", error.message);
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
      dbLogger("error", "insert", "signout", error.message);
      return {
        msg: error.message,
      };
    }
  } catch (error: any) {
    dbLogger("error", "insert", "signout", "UncaughtError:", error.message);
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
    dbLogger("error", "select", "retrieve_session", error.message);
  }
  return data.session;
};

const refreshSession = async () => {
  const { data, error } = await supabase.auth.refreshSession();
  if (error) {
    dbLogger("error", "select", "refresh_session", error.message);
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
