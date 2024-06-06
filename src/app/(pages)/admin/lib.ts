import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  price: z.string().regex(/^\d+\.\d{2}$/),
});

export type FormSchema = z.infer<typeof formSchema>;
