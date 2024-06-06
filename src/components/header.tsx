import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Nav } from "./nav";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function Header() {
  const courses = await prisma.course.findMany();

  const session = await auth();

  return (
    <header>
      <div className="container grid grid-cols-[1fr,_max-content,_1fr] py-4">
        <div className="flex items-center">
          <Link href="/" className="font-medium">
            CodeQuestRush
          </Link>
        </div>
        <Nav courses={courses} />

        <div className="flex justify-end">
          {session?.user.role === "admin" && (
            <Link
              href="/admin"
              className={buttonVariants({ variant: "outline" })}
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
