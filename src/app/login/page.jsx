import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./loginForm";

export const dynamic = "force-dynamic"; // 🔥 penting

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/auth/dashboard");
  }

  return <LoginForm />;
}