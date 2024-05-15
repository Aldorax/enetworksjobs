// src/zodSchema.ts
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
  // Add other fields as needed
});

export default formSchema;
