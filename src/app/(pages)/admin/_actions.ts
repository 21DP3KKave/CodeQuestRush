"use server";

import { revalidatePath } from "next/cache";
import { FormSchema, formSchema } from "./lib";

export async function updateCourse(id: string, data: FormSchema) {
  const parsedData = formSchema.parse(data);

  await prisma.course.update({
    where: { id },
    data: { ...parsedData, price: parseFloat(parsedData.price) },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createCourse(data: FormSchema) {
  const parsedData = formSchema.parse(data);

  const course = await prisma.course.create({
    data: { ...parsedData, price: parseFloat(parsedData.price) },
  });

  revalidatePath(`/admin`);
  revalidatePath("/");
}
