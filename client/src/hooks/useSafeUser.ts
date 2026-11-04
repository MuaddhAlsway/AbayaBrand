import { useUser } from "@clerk/clerk-react";

export type SafeUser = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: ReturnType<typeof useUser>["user"];
};

export function useSafeUser(): SafeUser {
  const { isLoaded, isSignedIn, user } = useUser();
  return { isLoaded, isSignedIn: !!isSignedIn, user };
}