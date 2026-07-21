import { getEnv } from "./env";
import { getUserByOpenId, upsertUser } from "./db";

export type AuthenticatedUser = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  role: "user" | "admin";
};

export async function authenticateRequest(request: Request): Promise<AuthenticatedUser | null> {
  const hostname = new URL(request.url).hostname.toLowerCase();
  const isAccessProtectedAdminHost = hostname === "admin.unscaled.me";
  const accessEmail = isAccessProtectedAdminHost
    ? request.headers.get("cf-access-authenticated-user-email")?.trim()
    : undefined;
  const email = accessEmail;
  if (!email) return null;

  const name = email;
  const adminEmail = getEnv().ADMIN_EMAIL?.trim().toLowerCase();
  const role = adminEmail && email.toLowerCase() === adminEmail ? "admin" : "user";

  const existing = await getUserByOpenId(email);
  if (existing) {
    return (await upsertUser({
      openId: email,
      name,
      email,
      loginMethod: "cloudflare-access",
      role,
      lastSignedIn: new Date(),
    })) ?? existing;
  }

  return (await upsertUser({
    openId: email,
    name,
    email,
    loginMethod: "cloudflare-access",
    role,
    lastSignedIn: new Date(),
  })) ?? null;
}
