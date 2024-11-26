import { z } from "zod";

export const geoFeatureSchema = z.object({
  type: z.literal("Feature"),
  properties: z.object({
    reg_royin: z.string().optional(),
    pro_th: z.string().optional(),
    amp_th: z.string().optional(),
    tam_th: z.string().optional(),
    fillColor: z.string().optional(),
    pro_id: z.number().optional(),
    amp_id: z.number().optional(),
    tam_id: z.number().optional(),
  }),
  geometry: z.object({
    type: z.literal("MultiPolygon"),
    coordinates: z.array(z.array(z.array(z.tuple([z.number(), z.number()])))),
  }),
});

export type GeoFeature = z.infer<typeof geoFeatureSchema>;

export const geoDataSchema = z.object({
  type: z.literal("FeatureCollection"),
  features: z.array(geoFeatureSchema),
});

export type GeoData = z.infer<typeof geoDataSchema>;
