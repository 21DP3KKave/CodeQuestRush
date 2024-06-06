import prisma from "@/lib/prisma";
import { Item } from "./item";
import { NewItem } from "./new-item";

export default async function AdminPage() {
  const courses = await prisma.course.findMany();

  return (
    <div className="my-16 container max-w-screen-sm space-y-8">
      <NewItem />

      {courses.map((course) => (
        <Item key={course.id} course={course} />
      ))}
    </div>
  );
}
