import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session }) {
      const role = await prisma.user.findUniqueOrThrow({
        where: { id: session.user.id },
        select: { role: true },
      });

      session.user.role = role.role;

      return session;
    },
  },
});
