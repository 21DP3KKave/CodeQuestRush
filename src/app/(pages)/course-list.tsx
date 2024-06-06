import { Course } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <ul className="flex flex-wrap gap-8 mt-8 justify-center">
      {courses.map(({ id, title, description, image }) => (
        <li
          key={id}
          className="max-w-sm rounded-md overflow-hidden object-fit border bg-background"
        >
          <Link href="/" className="group">
            <div className="max-w-sm max-h-48 overflow-hidden">
              <Image
                src={image}
                width={384}
                height={192}
                alt={title}
                className="group-hover:scale-105 transition-all"
              />
            </div>

            <div className="p-4 flex flex-col">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
