export const clerkPublishableKey = (
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ??
  import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  ""
).trim();

// Do not mount Clerk with a placeholder or malformed key: Clerk throws during
// provider initialization, which otherwise leaves the whole SPA blank.
export const hasClerk =
  /^pk_(test|live)_[A-Za-z0-9_]+$/.test(clerkPublishableKey) &&
  !clerkPublishableKey.includes("replace_with") &&
  !clerkPublishableKey.includes("your_publishable_key");
