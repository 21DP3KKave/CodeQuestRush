"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function GoogleSignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      Sign in with Google
    </Button>
  );
}
