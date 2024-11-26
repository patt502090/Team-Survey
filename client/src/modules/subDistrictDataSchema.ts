import { z } from "zod";

export const subDistrictDataSchema = z.object({
  s_districts: z.array(
    z.object({
      id: z.number(),
      s_Districts: z.string(),
      greenCount: z.number(),
      yellowCount: z.number(),
      redCount: z.number(),
      total_customer: z.number(),
    })
  ),
});

export type SubDistrictData = z.infer<typeof subDistrictDataSchema>;
