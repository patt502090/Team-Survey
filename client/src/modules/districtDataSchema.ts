import { z } from "zod";

export const districtDataSchema = z.object({
  districts: z.array(
    z.object({
      id: z.number(),
      district: z.string(),
      greenCount: z.number(),
      yellowCount: z.number(),
      redCount: z.number(),
      total_customer: z.number(),
    })
  ),
});
export type DistrictData = z.infer<typeof districtDataSchema>;
