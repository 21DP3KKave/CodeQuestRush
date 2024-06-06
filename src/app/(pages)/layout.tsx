import { Header } from "@/components/header";
import Link from "next/link";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="grow">{children}</div>

      <footer className="py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 CodeQuestRush. All rights reserved.</p>

          <p>
            {"Follow us on "}
            <Link
              href="/"
              className="font-medium underline-offset-4 hover:underline"
            >
              Twitter
            </Link>
            {", "}
            <Link
              href="/"
              className="font-medium underline-offset-4 hover:underline"
            >
              Facebook
            </Link>
            {", and "}
            <a
              href="/"
              className="font-medium underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
