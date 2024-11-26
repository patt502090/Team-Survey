import { z } from "zod";

export const provinceDataSchema = z.object({
  provinces: z.array(
    z.object({
      id: z.number(),
      province: z.string(),
      greenCount: z.number(),
      yellowCount: z.number(),
      redCount: z.number(),
      total_customer: z.number(),
    })
  ),
});
export type ProvinceData = z.infer<typeof provinceDataSchema>;
