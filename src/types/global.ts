import type { Session, User } from "@supabase/gotrue-js";

export interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
}

export interface AuthErrorMessage {
  fatal?: boolean | undefined;
  msg: string;
}

export interface AuthData {
  user: User | null;
  session: Session | null;
}
