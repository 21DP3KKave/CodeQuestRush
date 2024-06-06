import { auth } from "@/auth";
import { SignIn } from "@/features/sign-in/sign-in";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="mt-16 container">
      <h1 className="text-4xl text-center font-extrabold tracking-tight mb-8">
        Sign in to your account
      </h1>

      <SignIn />
    </main>
  );
}
