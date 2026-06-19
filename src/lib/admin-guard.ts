import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "./admin-auth";

/** Returns true if the current request carries a valid admin session cookie. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}
