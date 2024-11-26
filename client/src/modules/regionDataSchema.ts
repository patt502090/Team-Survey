import { z } from "zod";

export const regionDataSchema = z.object({
  regions: z.array(
    z.object({
      Region: z.string(),
      greenCount: z.number(),
      yellowCount: z.number(),
      redCount: z.number(),
      total_customer: z.number(),
    })
  ),
});
export type RegionData = z.infer<typeof regionDataSchema>;
