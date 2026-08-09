import { z } from "zod";

export const searchLocationSchema = z.object({
  keyword: z.string().min(2),
});

export type SearchLocationDTO = z.infer<typeof searchLocationSchema>;
