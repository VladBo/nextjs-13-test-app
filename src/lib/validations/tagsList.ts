import * as z from "zod";

export const tagsListSchema = z.object({
  title: z.string().min(1).max(32),
  tags: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});
