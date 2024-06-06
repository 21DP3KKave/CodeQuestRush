import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CourseList } from "./course-list";
import { Filters } from "./filters";

const faq = [
  {
    question: "What is CodeQuestRush?",
    answer:
      "CodeQuestRush is an interactive platform where you can complete tasks, learn programming, and have fun in a game format.",
  },
  {
    question: "How do I get started?",
    answer:
      "To get started, simply sign up for an account and begin exploring the tasks available on the platform.",
  },
  {
    question: "Is CodeQuestRush free to use?",
    answer:
      "Yes, CodeQuestRush offers a variety of free tasks and resources. We also offer premium features for advanced learning and additional benefits.",
  },
  {
    question: "What programming languages can I learn on CodeQuestRush?",
    answer:
      "CodeQuestRush supports multiple programming languages, including Python, JavaScript, Java, C++, and more. Check the tasks section for specific languages.",
  },
  {
    question: "How can I track my progress?",
    answer:
      "Your progress is automatically tracked as you complete tasks. You can view your progress in your user dashboard.",
  },
  {
    question: "Can I interact with other users?",
    answer:
      "Yes, CodeQuestRush has a community feature where you can join groups, participate in discussions, and get support from other learners.",
  },
  {
    question: "What are the benefits of earning certificates?",
    answer:
      "Earning certificates showcases your skills and achievements, which can be shared with potential employers or added to your resume.",
  },
  {
    question: "How do leaderboards work?",
    answer:
      "Leaderboards rank users based on their task completions and performance. Compete with others to see who can achieve the highest rank!",
  },
  {
    question: "What if I need help with a task?",
    answer:
      "If you need help with a task, you can ask for assistance in the community forums or refer to the detailed task instructions and hints provided.",
  },
  {
    question: "How can I unlock career opportunities through CodeQuestRush?",
    answer:
      "By completing advanced tasks and earning certificates, you can unlock career opportunities. We also partner with companies looking for skilled programmers.",
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const courses = await prisma.course.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchParams.title ? searchParams.title.toString() : "",
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchParams.title ? searchParams.title.toString() : "",
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      title: searchParams.sort === "desc" ? "desc" : "asc",
    },
  });

  return (
    <main className="py-16 container">
      <section className="my-32 text-center tracking-tight">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to <span className="text-primary">CodeQuestRush</span>!
        </h2>

        <p className="mt-2 text-xl text-muted-foreground">
          Complete tasks, learn programming, and have fun in a game format.
        </p>

        <Link
          href="/signin"
          className={cn(buttonVariants({ size: "lg" }), "mt-6")}
        >
          Get Started
        </Link>
      </section>

      <section>
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Courses
        </h2>

        <Filters />

        <CourseList courses={courses} />
      </section>

      <section className="mx-auto my-12 w-full max-w-screen-sm">
        <h3 className="text-center text-3xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h3>

        <Accordion type="single" collapsible className="mt-6">
          {faq.map(({ answer, question }) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>{question}</AccordionTrigger>

              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto w-full max-w-screen-sm rounded-md bg-primary p-12 text-center text-primary-foreground">
        <h3 className="text-3xl font-bold">
          Ready to start your coding adventure?
        </h3>

        <p className="mt-2">
          Join CodeQuestRush today and begin your journey to becoming a coding
          master.
        </p>

        <a
          href="/signin"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "mt-6",
          )}
        >
          Sign Up Now
        </a>
      </section>
    </main>
  );
}
