import { z } from "zod";

export const searchLocationSchema = z.object({
  keyword: z.string().min(2),
});
