import { signIn } from "@/auth";
import { GoogleSignInButton } from "./google-sign-in-button";
import { redirect } from "next/navigation";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
        redirect("/");
      }}
      className="mx-auto w-full max-w-sm"
    >
      <GoogleSignInButton />
    </form>
  );
}
