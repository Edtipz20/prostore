import { auth } from "@/auth";
import { redirect } from "next/navigation";

// For Server Components (pages/layouts) — redirects on failure
export async function requireAdmin() {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/unauthorized");
  }
  return session;
}

// For Server Actions — throws instead of redirecting.
export async function requireAdminAction() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized: admin access required");
  }
  return session;
}

// For Server Actions where either the resource owner OR an admin may act
export async function requireOwnerOrAdminAction(resourceUserId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized: sign in required");
  }
  const isOwner = session.user.id === resourceUserId;
  const isAdmin = session.user.id === "admin";
  if (!isOwner && !isAdmin) {
    throw new Error("Unauthorized: not your resource");
  }
  return session;
}
