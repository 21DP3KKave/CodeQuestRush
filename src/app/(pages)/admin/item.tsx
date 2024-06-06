"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Course } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { deleteCourse, updateCourse } from "./_actions";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  price: z.string().regex(/^\d+\.\d{2}$/),
});

export function Item({ course }: { course: Course }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      price: course.price.toString(),
      description: course.description,
      image: course.image,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateCourse(course.id, values);

    toast.success("Course updated!");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border rounded-md pt-4"
      >
        <div className="space-y-4 px-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="px-6 py-4 flex gap-4">
          <Button
            type="button"
            className="w-full"
            variant="ghost"
            onClick={async () => {
              await deleteCourse(course.id);
              toast.success("Course deleted!");
            }}
          >
            Delete
          </Button>

          <Button className="w-full">Save</Button>
        </div>
      </form>
    </Form>
  );
}
